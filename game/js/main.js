// ===== CULTIVATION — boot, game loop, time =====
import * as THREE from 'three';
import { S, newGame, rollStats, addQuest } from './state.js';
import { SECTS } from './config.js';
import { FX } from './effects.js';
import { World } from './world.js';
import { Player, Input } from './player.js';
import { NPCs } from './npcs.js';
import { Cultivation } from './cultivation.js';
import { UI } from './ui.js';
import { AudioSys } from './audio.js';

const $=id=>document.getElementById(id);
const DAY_LEN=360; // seconds per game day

class Game {
  constructor(){ this.time=0; this.autosaveT=30; }
  async boot(){
    $('btn-continue').disabled=!S.has();
    $('btn-new').onclick=()=>{ AudioSys.unlock(); AudioSys.click(); this.create(); };
    $('btn-continue').onclick=()=>{ AudioSys.unlock(); AudioSys.click(); if(S.load()) this.start(false); };
    $('btn-help').onclick=()=>{ AudioSys.unlock(); this.quickHelp(); };
    $('modal-close').onclick=()=>{ this.ctx?.ui.closeModal(); };
    $('dialogue').onclick=()=>{ this.ctx?.ui.advanceDlg(); };
    $('btn-revive').onclick=()=>this.revive();
  }
  quickHelp(){
    document.body.insertAdjacentHTML('beforeend','<div id="qh"></div>');
    $('qh').innerHTML=`<div style="position:fixed;inset:0;z-index:99;background:rgba(3,6,12,.85);display:flex;align-items:center;justify-content:center">
      <div class="panel narrow"><h2 style="font-family:'Ma Shan Zheng';color:var(--gold2)">❖ How to Play</h2>
      <p style="font-size:14px;line-height:1.7"><b>WASD</b> move · <b>Mouse</b> — LMB attack (hold=heavy), RMB block · <b>Space</b> dodge · <b>1/2</b> skills · <b>F</b> interact · <b>Z</b> meditate · <b>C</b> cultivation · <b>Tab</b> ring · <b>M</b> map · <b>J</b> journal · <b>V</b> lock-on · <b>Q/E</b> rotate · <b>Wheel</b> zoom</p>
      <p style="font-size:14px">Speak to <b>Elder Yun</b>, meditate to 100%, and <b>break through</b>. The mountain is yours.</p>
      <button class="brush-btn" id="qh-ok">Return</button></div></div>`;
    $('qh-ok').onclick=()=>$('qh').remove();
  }
  create(){
    // temp UI shell for creation (needs ctx later; creation is self-contained except rollStats)
    const shell={ _rollHack:{ rollStats } };
    const ui=new UI(shell); ui._rollHack={ rollStats };
    ui.startCreation(c=>{
      S.d=newGame({ name:c.name, origin:c.origin, sect:c.sect, root:c.root, physique:c.physique, stats:c.stats });
      addQuest('meet');
      this.start(true);
    });
  }
  start(fresh){
    $('loading').classList.remove('hidden');
    setTimeout(()=>{ // let loader paint
      const canvas=$('scene');
      const fx=new FX(null); // scene injected below
      const world=new World(canvas,fx); fx.scene=world.scene;
      const ctx=this.ctx={ game:this, fx, world, time:0 };
      ctx.sect=SECTS.find(s=>s.id===S.d.sectId)||SECTS[0];
      ctx.ui=new UI(ctx); ctx.ui._rollHack={ rollStats };
      ctx.player=new Player(ctx);
      ctx.npcs=new NPCs(ctx);
      ctx.cultivation=new Cultivation(ctx);
      ctx.input=new Input(canvas);
      ctx.ui.refreshHUD();
      if(S.d.rankIdx>=1) ctx.player.setOutfit(S.d.rankIdx>=2?'inner':'outer');
      $('title-screen').classList.add('hidden');
      $('hud').classList.remove('hidden');
      $('loading').classList.add('hidden');
      world.setTime(S.d.tod);
      this.loop();
      if(fresh){
        ctx.ui.dialogue({ name:'???', text:'<i>Rain. Mud. The mountain gate towers above you, lanterns swaying like patient stars. An old man in white waits on the steps…</i><br><br><b>Elder Yun:</b> “So. Another mortal child kneels at my gate…” <span style="color:var(--jade)">(Walk north to the Elder Hall and press F to speak.)</span>' });
        ctx.ui.toast('⛰ Welcome to the sect! Find Elder Yun (north).','jade');
        S.save();
      } else ctx.ui.toast(`📜 Welcome back, ${S.d.name}. Day ${S.d.day}.`,'jade');
    },60);
  }
  revive(){
    const { ui, player, world }=this.ctx;
    ui.hideDeath(); ui.hideBoss();
    if(this.ctx.npcs.rivalDuel.active){ this.ctx.npcs.rivalDuel.active=false; this.ctx.npcs.endDuel(false); }
    S.d.hp=S.d.maxhp; S.d.qi=Math.floor(S.d.maxqi/2);
    S.d.progress=Math.max(0,S.d.progress-20);
    player.pos.set(0,0,26); player.lockTarget=null; player.iframes=2;
    ui.refreshHUD(); ui.toast('An elder drags you from death\'s door. (-20% progress)','jade');
  }
  checkAge(){
    if(S.d.age>=S.d.lifespan){
      this.ctx.ui.showDeath(`Your ${S.d.lifespan}-year lifespan is exhausted. Without a breakthrough, even cultivators turn to dust.`);
      $('btn-revive').textContent='Reincarnate (restart as a new child)';
      $('btn-revive').onclick=()=>{ S.wipe(); location.reload(); };
    } else if(S.d.age>=S.d.lifespan-10) this.ctx.ui.toast(`⚠ Only ${S.d.lifespan-S.d.age} years of lifespan remain! Break through!`,'bad');
  }
  loop(){
    const ctx=this.ctx;
    const clock=new THREE.Clock();
    const step=()=>{
      requestAnimationFrame(step);
      let dt=Math.min(0.05,clock.getDelta());
      this.time+=dt; ctx.time=this.time;
      const d=S.d;
      // ---- time flow ----
      const med=ctx.player.meditating;
      d.tod+=dt*(med?25:1)/DAY_LEN;
      if(d.tod>=1){ d.tod-=1; d.day++; if(d.day%8===0){ d.age++; this.checkAge(); } if(d.day%32===0) d.seasonIdx=(d.seasonIdx+1)%4; }
      ctx.world.setTime(d.tod);
      // ---- global key edges ----
      const inp=ctx.input;
      if(inp.pressed.has('KeyF')||(inp.pad.int&&!inp.pad.wasInt)){
        if(ctx.ui.dlg) ctx.ui.advanceDlg(); else ctx.ui.tryInteract();
      }
      // ---- updates ----
      ctx.cultivation.tick(dt);
      ctx.player.update(dt,inp);
      ctx.npcs.update(dt);
      ctx.world.update(dt,this.time);
      ctx.fx.update(dt,this.time);
      // projectiles vs foes + ground
      for(let i=ctx.fx.projs.length-1;i>=0;i--){
        const p=ctx.fx.projs[i], pp=p.g.position;
        let hit=false;
        for(const f of ctx.npcs.attackables()){
          if(f.dead) continue;
          if(Math.hypot(f.x-pp.x,f.z-pp.z)<1.1&&pp.y<3){ ctx.npcs.damageFoe(f,p.dmg,null,{x:pp.x,z:pp.z}); hit=true; break; }
        }
        if(hit||pp.y<0.2){ ctx.fx.sparkle(pp,p.color,18,1.2,3); ctx.fx.ring(new THREE.Vector3(pp.x,0,pp.z),p.color,4);
          AudioSys.boom(); ctx.fx.scene.remove(p.g); ctx.fx.projs.splice(i,1); }
      }
      // rival touch separation vs player
      ctx.ui.updateHUD(dt);
      ctx.world.renderer.render(ctx.world.scene,ctx.world.camera);
      inp.endFrame(dt);
      // autosave
      this.autosaveT-=dt;
      if(this.autosaveT<=0){ this.autosaveT=30; d.playtime+=30; S.save(); }
    };
    step();
  }
}
new Game().boot();
