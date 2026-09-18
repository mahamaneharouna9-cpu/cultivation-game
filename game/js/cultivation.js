// ===== Cultivation: meditate, progress, bottlenecks, breakthrough =====
import * as THREE from 'three';
import { S, doneQuest, isQuestDone, SEASONS } from './state.js';
import { REALMS, PART1_MAX_REALM, RANKS } from './config.js';
import { AudioSys } from './audio.js';

export class Cultivation {
  constructor(ctx){ this.ctx=ctx; this.insightT=12; }
  inCave(){
    const p=this.ctx.player.pos;
    return Math.hypot(p.x+38,p.z+34)<7||Math.hypot(p.x+30,p.z+38)<7;
  }
  rate(){
    const d=S.d;
    let r=1.0;
    r*=d.root.mult;
    r*=d.manuals.breathing?1.0:0.2;
    if(d.manuals.fireball) r*=1.05;
    if(d.manuals.swordqi) r*=1.1;
    if(this.inCave()) r*=1.6;
    if(d.tod<0.06||d.tod>0.9) r*=1.2;      // midnight qi
    if(d.realm===0) r*=2.4;                 // sensing is swift
    r*=1+d.stats.talent*0.03;
    return r;
  }
  startMeditate(){
    const { player, ui }=this.ctx;
    if(player.meditating||ui.isBusy()||ui.dead) return;
    if(this.ctx.npcs.rivalDuel.active){ ui.toast('Cannot meditate mid-duel!','bad'); return; }
    player.setMeditate(true); this.insightT=10+Math.random()*8;
    ui.toast(`🧘 Meditating… ${this.rate().toFixed(1)}%/s${this.inCave()?' · ☯ Cave resonance ×1.6':''}`,'jade');
    AudioSys.insight();
  }
  stopMeditate(force){
    const { player, ui }=this.ctx;
    if(!player.meditating) return;
    player.setMeditate(false);
    if(!force) ui.toast('You rise, qi settling into your meridians.');
  }
  tick(dt){
    const { player, ui, fx }=this.ctx;
    if(!player.meditating) return;
    const r=this.rate();
    S.d.progress=Math.min(100,S.d.progress+r*dt);
    ui.updateMeditate(r);
    this.insightT-=dt;
    if(this.insightT<=0){
      this.insightT=14+Math.random()*12;
      const gain=3+S.d.stats.comp*0.4+S.d.stats.luk*0.3;
      S.d.progress=Math.min(100,S.d.progress+gain);
      fx.sparkle(player.pos,0xffd76a,20,1.2,4); AudioSys.insight();
      ui.insight(['💡 Insight! The meridians hum with new clarity.', '💡 Enlightenment! A bottleneck in your mind shatters.',
        '💡 Sudden comprehension! Your manual\'s next verse unlocks.', '💡 Heart stirs — your Dao seed drinks deep.'][Math.floor(Math.random()*4)]);
    }
    if(S.d.progress>=100){ this.stopMeditate(); ui.toast('⚡ Qi brims over! Open Cultivation (C) to BREAK THROUGH!','jade'); AudioSys.quest(); }
  }
  // ---- breakthrough ----
  reqs(){
    const d=S.d, reqs=[];
    const bottleneck=(d.realm===1&&(d.stage===3||d.stage===6||d.stage===8));
    reqs.push({ id:'qi', label:`Qi reserves above 50% (${Math.round(d.qi)}/${d.maxqi})`, ok:d.qi>=d.maxqi*0.5 });
    if(d.realm===1&&d.stage===3) reqs.push({ id:'herbs', label:`3 Spirit Herbs to temper meridians (${d.inv.herb||0}/3)`, ok:(d.inv.herb||0)>=3, consume:()=>{d.inv.herb-=3;} });
    if(d.realm===1&&d.stage===6) reqs.push({ id:'spar', label:'Victory over Chen Hao (prove your heart)', ok:isQuestDone('spar') });
    if(d.realm===1&&d.stage===8) reqs.push({ id:'pill', label:`Foundation Pill — steady the final step (${d.inv.pill_found||0}/1)`, ok:(d.inv.pill_found||0)>=1, consume:()=>{d.inv.pill_found--;} });
    const chance=Math.min(95,58+d.stats.comp*2+d.stats.luk*1.5+(bottleneck?-12:0)+(d.realm===0?20:0));
    return { reqs, bottleneck, chance };
  }
  attempt(){
    const { ui, fx, player }=this.ctx, d=S.d;
    if(d.progress<100){ ui.toast('Qi is not yet brimming (100%). Meditate more.','bad'); return; }
    if(d.realm>=PART1_MAX_REALM&&d.stage>=9){ ui.openHeavenTeaser(); return; }
    const { reqs, bottleneck, chance }=this.reqs();
    if(!reqs.every(r=>r.ok)){ ui.toast('Requirements unmet. The heavens reject the attempt.','bad'); AudioSys.fail(); return; }
    reqs.forEach(r=>r.consume&&r.consume());
    const roll=Math.random()*100;
    if(roll<chance){
      // SUCCESS
      d.stage++;
      if(d.stage>9){ d.stage=1; d.realm++; this.onRealmUp(); }
      d.progress=0;
      d.maxhp+=10+d.realm*6; d.maxqi+=8+d.realm*4; d.hp=d.maxhp; d.qi=d.maxqi;
      d.stats.talent+=0; // realms temper slowly elsewhere
      player.setAuraForRealm(); player.playCine();
      fx.pillar(player.pos,d.realm===0?0x9fe8ff:0xffd76a); AudioSys.breakthrough(); AudioSys.thunder();
      setTimeout(()=>fx.ring(player.pos,0xffffff,14),300);
      ui.insight(`⚡ BREAKTHROUGH! ${REALMS[d.realm].name} · Stage ${d.stage} ⚡`);
      ui.toast(`Breakthrough! HP ${d.maxhp} · Qi ${d.maxqi}`,'jade');
      if(d.realm===1&&d.stage===4&&!isQuestDone('stage4')){ doneQuest('stage4'); S.d.contrib+=30; ui.toast('📜 Quest done: Break the Shackles! (+30 Contribution)','jade'); }
      if(d.realm===1&&d.stage>=5&&S.d.rankIdx<2){ S.d.rankIdx=2; ui.toast('🎖 Promoted to Inner Disciple! Allowance raised.','jade'); player.setOutfit('inner'); }
      ui.refreshHUD(); ui.refreshCultivation();
    } else {
      // FAILURE
      d.progress=55; const dmg=Math.round(d.maxhp*0.35);
      d.hp=Math.max(1,d.hp-dmg);
      AudioSys.fail(); player.shake=0.8;
      fx.sparkle(player.pos,0xff5d5d,24,1.2,3);
      ui.toast(`💔 Breakthrough FAILED! Qi deviation wounds you (-${dmg} HP). Progress falls to 55%.`,'bad');
      ui.refreshHUD(); ui.refreshCultivation();
    }
  }
  onRealmUp(){
    const { ui, player }=this.ctx, d=S.d;
    if(d.realm===1){ // Qi Condensation ceremony
      d.lifespan=150; S.d.rankIdx=1; player.setOutfit('outer');
      ui.toast('🎖 Elder Yun names you OUTER DISCIPLE! Lifespan 150y. Daily allowance: 15 stones.','jade');
      ui.dialogue({ name:'Elder Yun', text:`CONDENSATION! Your qi no longer drifts — it pools, it obeys! From today you are an OUTER DISCIPLE of this sect. The arena, the caves, the deeper manuals… all open to you. Do not waste this old man's face!` });
      AudioSys.quest();
    }
  }
}
