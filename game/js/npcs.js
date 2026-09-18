// ===== NPCs, dialogue trees, rival duel AI, missions =====
import * as THREE from 'three';
import { S, addQuest, doneQuest, isQuestDone } from './state.js';
import { MANUALS } from './config.js';
import { makeFigure, makeNameplate, poseFigure } from './character.js';
import { AudioSys } from './audio.js';

export class NPCs {
  constructor(ctx){
    this.ctx=ctx; this.list=[]; this.time=0;
    const W=ctx.world;
    // --- Elder Yun (hall steps) ---
    this.elder=this.spawn({ name:'Elder Yun', title:'Outer Sect Elder · Nascent Soul', x:2.5, z:-22.5, face:Math.PI,
      robe:0xe8e2d2, trim:0xc9a227, beard:true, scale:1.02, color:'#ffd76a' });
    // --- Rival Chen Hao (arena) ---
    this.rival=this.spawn({ name:'Chen Hao', title:'Rival · Qi Condensation 3', x:36, z:10.5, face:Math.PI,
      robe:0x8e2432, trim:0xffc46b, scale:0.98, color:'#ff8a7a' });
    this.rival.hp=220; this.rival.maxhp=220; this.rival.rad=0.7; this.rival.dead=false;
    this.rivalDuel={ active:false, aiT:0, state:'idle', strafe:1, cd:0 };
    // --- Aunt Lin (alchemy pavilion) ---
    this.aunt=this.spawn({ name:'Aunt Lin', title:'Alchemy Pavilion · Pill Master', x:-20, z:-18.5, face:Math.PI,
      robe:0x1f6e52, trim:0xe8f5e9, hat:true, scale:0.94, color:'#7dffb0' });
    // --- wandering disciples ---
    this.wanderers=[];
    const wdefs=[['Liu Feng','Outer Disciple',-6,4],['Su Mei','Outer Disciple',14,-4],['Wang Tie','Servant Disciple',-2,20]];
    for(const [n,t,x,z] of wdefs){
      const w=this.spawn({ name:n, title:t, x, z, face:Math.random()*6, robe:0x2b5fa6, trim:0xdfe9f5, scale:0.92, color:'#9fe8ff' });
      w.wp=[{x:x+8,z:z+6},{x:x-8,z:z-4},{x:x+4,z:z-9}]; w.wpi=0; w.pauseT=Math.random()*3;
      this.wanderers.push(w);
    }
    // --- interactions ---
    W.addInteract({ x:2.5, z:-22.5, r:3, prompt:()=>'Talk to Elder Yun', act:()=>this.talkElder() });
    W.addInteract({ x:36, z:10.5, r:3, prompt:()=>this.rivalDuel.active?'Duel in progress!':(this.rival.dead?'Chen Hao yields…':'Face Chen Hao (spar)'), act:()=>this.talkRival() });
    W.addInteract({ x:-20, z:-18.5, r:3, prompt:()=>'Trade with Aunt Lin', act:()=>this.ctx.ui.openShop() });
    W.addInteract({ x:9, z:14, r:2.8, prompt:()=>'Read the Mission Board', act:()=>this.ctx.ui.openBoard() });
    W.addInteract({ x:-9, z:12, r:2.6, prompt:()=>S.d.manuals.swordqi?'Jade Slip Stand (learned)':'Study the glowing Jade Slip', act:()=>this.studySlip() });
    for(const h of W.herbs)
      W.addInteract({ x:h.x, z:h.z, r:2.4, prompt:()=>h.taken?'Picked clean… (regrowing)':'Harvest Spirit Herb', when:()=>!h.taken, act:()=>this.harvest(h) });
  }
  spawn(o){
    const fig=makeFigure({ robe:o.robe, trim:o.trim, beard:o.beard, hat:o.hat, sword:true, scale:o.scale||1 });
    fig.g.position.set(o.x,0,o.z); fig.g.rotation.y=o.face||0; fig.baseY=0;
    const plate=makeNameplate(o.name,o.color||'#ffd76a'); fig.g.add(plate);
    this.ctx.world.scene.add(fig.g);
    const n={ ...o, fig, plate, x:o.x, z:o.z };
    this.list.push(n); return n;
  }
  // ============ attackable foes (dummies + rival) ============
  attackables(){
    const out=[];
    for(const d of this.ctx.world.dummies) if(!d.dead) out.push({ kind:'dummy', ref:d, x:d.x, z:d.z, rad:0.8, dead:!!d.dead, name:'Training Dummy', hp:d.hp, maxhp:d.maxhp });
    if(this.rivalDuel.active&&!this.rival.dead) out.push({ kind:'rival', ref:this.rival, x:this.rival.x, z:this.rival.z, rad:0.7, dead:false, name:'Chen Hao', hp:this.rival.hp, maxhp:this.rival.maxhp });
    return out;
  }
  damageFoe(f,dmg,extra,from){
    const ui=this.ctx.ui, fx=this.ctx.fx;
    if(f.kind==='dummy'){
      const d=f.ref; d.hp-=dmg; d.wob=0.6; AudioSys.hit();
      fx.sparkle(new THREE.Vector3(d.x,1.5,d.z),0xffd76a,8,0.8,2);
      ui.float(new THREE.Vector3(d.x,2.2,d.z),`-${Math.round(dmg)}`,'dmg');
      if(d.hp<=0){ d.dead=true; d.mesh.visible=false; ui.toast('Training dummy destroyed! (+10 contribution)','jade');
        S.d.contrib+=10; AudioSys.quest();
        setTimeout(()=>{ d.dead=false; d.hp=d.maxhp; d.mesh.visible=true; },20000);
      }
    } else if(f.kind==='rival'){
      const R=this.rival; R.hp-=dmg; AudioSys.hit();
      R.fig.atkT=0; fx.sparkle(new THREE.Vector3(R.x,1.5,R.z),0xff8a7a,10,0.9,2.5);
      ui.float(new THREE.Vector3(R.x,2.3,R.z),`-${Math.round(dmg)}`,'dmg');
      ui.updateBoss('Chen Hao — Spar Duel',R.hp,R.maxhp);
      if(R.hp<=R.maxhp*0.25&&!R.dead){ this.endDuel(true); }
    }
  }
  // ============ rival duel ============
  async talkRival(){
    const ui=this.ctx.ui, D=this.rivalDuel;
    if(D.active) return;
    if(this.rival.dead){ await ui.dialogue({ name:'Chen Hao', text:'*panting* …Fine! You win this time! Come dawn tomorrow and I\'ll take back my face!' }); return; }
    if(isQuestDone('spar')){
      const c=await ui.dialogue({ name:'Chen Hao', text:'You again? My fists still itch. Rematch — 50 stones wager, winner takes all. Dare?',
        choices:[{t:'Fight! (wager 50 stones)',v:'y'},{t:'Not now.',v:'n'}] });
      if(c==='y') this.startDuel(true); return;
    }
    const c=await ui.dialogue({ name:'Chen Hao', text:'So you\'re the new servant rat everyone whispers about? This arena will show your true worth. SPAR WITH ME — unless you fear losing face before the whole sect!',
      choices:[{t:'“You dare?!” — Accept the spar!',v:'y'},{t:'Walk away. (The wise endure.)',v:'n'}] });
    if(c==='y') this.startDuel(false);
    else { S.d.face=Math.max(0,S.d.face-2); ui.toast('Chen Hao sneers behind you. (-2 Face)','bad'); }
  }
  startDuel(wager){
    if(wager){ if(S.d.stones<50){ this.ctx.ui.toast('Not enough stones for the wager.','bad'); return; } S.d.stones-=50; }
    const ui=this.ctx.ui;
    this.rivalDuel={ active:true, wager, aiT:0, state:'circle', strafe:Math.random()<0.5?1:-1, cd:1.2 };
    this.rival.hp=this.rival.maxhp; this.rival.dead=false;
    ui.toast('⚔ SPAR DUEL! Bring Chen Hao below 25% HP!','jade');
    ui.showBoss('Chen Hao — Spar Duel',1,1); AudioSys.thunder();
    ui.dialogue({ name:'Chen Hao', text:'HA! Come! Let me show you the gap between us!' });
  }
  endDuel(won){
    const ui=this.ctx.ui, D=this.rivalDuel;
    D.active=false; ui.hideBoss();
    const R=this.rival;
    if(won){
      R.dead=true; R.fig.dead=false; // yields, not dies
      S.d.face+=15; S.d.contrib+=30; doneQuest('spar');
      let reward='Face +15, Contribution +30';
      if(D.wager){ S.d.stones+=100; reward+=', +100 💎'; }
      ui.toast(`🏆 You defeated Chen Hao! ${reward}`,'jade'); AudioSys.quest(); AudioSys.breakthrough();
      ui.dialogue({ name:'Chen Hao', text:'*cough* …Impossible! A servant… beat ME? …Hmph. You have my respect, junior. Until our rematch!' });
      setTimeout(()=>{ R.hp=R.maxhp; R.dead=false; },60000);
    } else {
      S.d.face=Math.max(0,S.d.face-5);
      ui.toast('Defeated… Chen Hao shows mercy. (-5 Face)','bad');
      ui.dialogue({ name:'Chen Hao', text:'Hahaha! Know your place, junior! Cultivate another decade, then kneel for pointers!' });
    }
  }
  updateRival(dt){
    const D=this.rivalDuel, R=this.rival, P=this.ctx.player;
    if(!D.active||this.ctx.ui.isBusy()) return;
    if(P.pos.y<-5) return;
    const dx=P.pos.x-R.x, dz=P.pos.z-R.z, dist=Math.hypot(dx,dz)||0.01;
    R.fig.g.rotation.y=Math.atan2(dx,dz);
    D.cd-=dt;
    const step=(tx,tz,s)=>{ R.x+=tx*s*dt; R.z+=tz*s*dt; this.ctx.world.collide(R); R.fig.g.position.set(R.x,0,R.z); };
    if(D.state==='circle'){
      const px=-dz/dist*D.strafe, pz=dx/dist*D.strafe;
      step(px,pz,2.2);
      if(dist>5) step(dx/dist,dz/dist,3.2);
      if(D.cd<=0){ D.state = dist<2.6?'telegraph':(Math.random()<0.6?'rush':'circle'); D.cd=0.5; if(D.state==='circle')D.cd=0.8; }
    } else if(D.state==='rush'){ step(dx/dist,dz/dist,6.5); if(dist<2.2){ D.state='telegraph'; D.cd=0.45; } }
    else if(D.state==='telegraph'){
      R.fig.armR.rotation.x=-2.4; R.fig.handSword.visible=true;
      if(D.cd<=0){ D.state='strike'; D.cd=0.3;
        R.fig.atkT=0.35; R.fig.atkVar=2; AudioSys.sword();
        const fwd=new THREE.Vector3(dx/dist,0,dz/dist);
        this.ctx.fx.slash(new THREE.Vector3(R.x,0,R.z),fwd,0xff8a7a,2.6);
        if(dist<3.2) P.takeDamage(7+Math.floor(Math.random()*5),{x:R.x,z:R.z});
      }
    } else if(D.state==='strike'){ if(D.cd<=0){ D.state='circle'; D.cd=0.9+Math.random()*0.8; D.strafe*=-1; } }
    poseFigure(R.fig,dt,D.state==='circle'||D.state==='rush'?1:0);
  }
  // ============ elder / herbs / slip ============
  async talkElder(){
    const ui=this.ctx.ui;
    if(!S.d.flags.metElder){
      S.d.flags.metElder=true; addQuest('herbs'); addQuest('spar'); addQuest('stage4');
      await ui.dialogue({ name:'Elder Yun', text:'So. Another mortal child kneels at my mountain gate, eyes full of heaven. Tell me, child — why do you seek immortality?' });
      const why=await ui.dialogue({ name:'Elder Yun', text:'(The old man\'s gaze pierces straight through you.)',
        choices:[{t:'“For power! None shall bully me again!”',v:'power'},{t:'“To protect those I love.”',v:'love'},{t:'“To unravel the Dao itself.”',v:'dao'}] });
      S.d.flags.motive=why;
      S.d.stats.wil+= why==='power'?1:0; S.d.stats.cha+= why==='love'?1:0; S.d.stats.comp+= why==='dao'?1:0;
      S.d.manuals.breathing={ mastery:0, prog:0 }; doneQuest('meet');
      await ui.dialogue({ name:'Elder Yun', text:'Hm. A decent answer. Take this Cloud Breathing Method — without it your qi will scatter like mist. Meditate (Z), gather your breath, and BREAK THROUGH. The Mission Board and old Lin can fund your path. Begone — cultivate!' });
      ui.toast('📜 Learned: Cloud Breathing Method! Press Z to meditate.','jade'); AudioSys.quest();
      await ui.dialogue({ name:'Elder Yun', text:'One more thing — this Ember Fireball Art. Even outer disciples must defend the herb gardens. Do not burn down my mountain. (Skill 1 unlocked)' });
      S.d.manuals.fireball={ mastery:0, prog:0 }; S.d.skills.push('fireball');
      ui.toast('🔥 Learned: Ember Fireball Art! (press 1)','jade'); AudioSys.breakthrough();
      ui.refreshHotbar();
    } else if(!isQuestDone('stage4')){
      await ui.dialogue({ name:'Elder Yun', text:`Your breath steadies, ${S.d.name}. Remember: harvest ${3-S.d.inv.herb>0?(3-S.d.inv.herb)+' more':''} spirit herbs, face Chen Hao in the arena, and push to Stage 4. Bottlenecks break the careless — prepare, then strike.` });
    } else {
      await ui.dialogue({ name:'Elder Yun', text:'The Condensation realm deepens within you. Aunt Lin\'s Foundation Pill will steady your final steps. Heaven watches, child — do not disappoint it.' });
    }
  }
  harvest(h){
    const ui=this.ctx.ui;
    h.taken=true; h.timer=150; h.mesh.visible=false;
    S.d.inv.herb=(S.d.inv.herb||0)+1;
    AudioSys.harvest(); this.ctx.fx.sparkle(new THREE.Vector3(h.x,1,h.z),0x46e0a8,16,1,3);
    ui.float(new THREE.Vector3(h.x,2,h.z),'+1 Spirit Herb','jade');
    if(S.d.inv.herb>=3&&!isQuestDone('herbs')){ doneQuest('herbs'); S.d.contrib+=20; ui.toast('🌿 Quest done: Roots of Power! (+20 Contribution)','jade'); AudioSys.quest(); }
    ui.refreshHUD();
  }
  async studySlip(){
    const ui=this.ctx.ui;
    if(S.d.manuals.swordqi) return;
    if(!S.d.flags.metElder){ await ui.dialogue({ name:'Jade Slip', text:'(The slip hums faintly, but your meridians are unopened. Elder Yun must first teach you to breathe.)' }); return; }
    S.d.manuals.swordqi={ mastery:0, prog:0 }; S.d.skills.push('swordqi');
    AudioSys.breakthrough(); this.ctx.fx.sparkle(new THREE.Vector3(-9,1.5,12),0x9fe8ff,26,1.5,4);
    ui.toast('🗡 Learned: Falling Leaf Sword Qi! (press 2)','jade'); ui.refreshHotbar();
    await ui.dialogue({ name:'Jade Slip', text:'(Knowledge floods your mind: a single falling leaf, cleaving a waterfall. You comprehend the Falling Leaf Sword Qi!)' });
  }
  update(dt){
    this.time+=dt;
    poseFigure(this.elder.fig,dt,0); poseFigure(this.aunt.fig,dt,0);
    if(!this.rivalDuel.active) poseFigure(this.rival.fig,dt,0);
    this.updateRival(dt);
    if(this.ctx.player.meditating) return;
    for(const w of this.wanderers){
      if(w.pauseT>0){ w.pauseT-=dt; poseFigure(w.fig,dt,0); continue; }
      const t=w.wp[w.wpi], dx=t.x-w.x, dz=t.z-w.z, d=Math.hypot(dx,dz);
      if(d<0.8){ w.wpi=(w.wpi+1)%w.wp.length; w.pauseT=2+Math.random()*3; continue; }
      w.x+=dx/d*1.6*dt; w.z+=dz/d*1.6*dt; this.ctx.world.collide(w);
      w.fig.g.position.set(w.x,0,w.z); w.fig.g.rotation.y=Math.atan2(dx,dz);
      poseFigure(w.fig,dt,1);
    }
  }
}
export const FLAVOR=[
  'Brother, the dawn qi by the pond is sweetest. Meditate there!',
  'Chen Hao broke three dummies yesterday. Three!',
  'Aunt Lin\'s pills are pricey, but they saved my breakthrough.',
  'They say a mutant root appears once a millennium…',
  'Don\'t pick fights above your realm. The suppression is real.',
];
