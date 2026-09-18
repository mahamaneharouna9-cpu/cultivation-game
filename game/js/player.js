// ===== Input + Player: movement, iso camera, action combat =====
import * as THREE from 'three';
import { S } from './state.js';
import { SKILLS } from './config.js';
import { makeFigure, poseFigure } from './character.js';
import { AudioSys } from './audio.js';

export class Input {
  constructor(canvas){
    this.keys=new Set(); this.mb={l:false,r:false}; this.lDown=0; this.lFired=false; this.charging=false;
    this.pressed=new Set(); // edge triggers (cleared each frame by consumer)
    addEventListener('keydown',e=>{ if(['SPACE','TAB'].includes(e.code)) e.preventDefault();
      if(!e.repeat){ this.keys.add(e.code); this.pressed.add(e.code); } });
    addEventListener('keyup',e=>{ this.keys.delete(e.code); });
    canvas.addEventListener('mousedown',e=>{ AudioSys.unlock();
      if(e.button===0){ this.mb.l=true; this.lDown=performance.now(); this.lFired=false; this.charging=false; this.pressed.add('ML'); }
      if(e.button===2){ this.mb.r=true; this.pressed.add('MR'); } });
    addEventListener('mouseup',e=>{ if(e.button===0){ this.mb.l=false; this.pressed.add('MLU'); } if(e.button===2) this.mb.r=false; });
    addEventListener('contextmenu',e=>e.preventDefault());
    addEventListener('wheel',e=>{ this.wheel=(this.wheel||0)+Math.sign(e.deltaY); },{passive:true});
    this.pad={ atk:false,wasAtk:false, dodge:false,wasDodge:false, heavy:false,wasHeavy:false, int:false,wasInt:false, s1:false,wasS1:false, s2:false,wasS2:false, block:false, lx:0, ly:0 };
  }
  pollPad(){
    const p=this.pad; p.wasAtk=p.atk; p.wasDodge=p.dodge; p.wasHeavy=p.heavy; p.wasInt=p.int; p.wasS1=p.s1; p.wasS2=p.s2;
    const gps=navigator.getGamepads?navigator.getGamepads():[];
    const gp=[...gps].find(g=>g&&g.connected);
    if(!gp){ p.atk=p.dodge=p.heavy=p.int=p.s1=p.s2=p.block=false; p.lx=p.ly=0; return p; }
    const b=i=>gp.buttons[i]?.pressed;
    p.atk=b(2); p.heavy=b(1); p.dodge=b(0); p.int=b(3); p.s1=b(4); p.s2=b(5); p.block=b(6);
    p.lx=gp.axes[0]||0; p.ly=gp.axes[1]||0;
    if(Math.abs(gp.axes[2])>0.6&&!this._rzT){ this.pressed.add(gp.axes[2]>0?'CAMR':'CAML'); this._rzT=0.35; }
    if(b(9)&&!this._stT){ this.pressed.add('ESC'); this._stT=0.4; }
    if(b(8)&&!this._bkT){ this.pressed.add('CULT'); this._bkT=0.4; }
    if(b(15)&&!this._dT){ this.pressed.add('PILL'); this._dT=0.4; }
    return p;
  }
  endFrame(dt){ this.pressed.clear(); this.wheel=0;
    for(const k of ['_rzT','_stT','_bkT','_dT']) if(this[k]>0) this[k]-=dt; }
}

const DIRS={ KeyW:[0,-1],KeyS:[0,1],KeyA:[-1,0],KeyD:[1,0] };
export class Player {
  constructor(ctx){
    this.ctx=ctx; const { world, fx }=ctx; this.world=world; this.fx=fx;
    const sect=ctx.sect;
    this.fig=makeFigure({ robe:0x5a6472, trim:0xcfd6e0, sword:true, scale:0.92 }); // mortal rags
    this.fig.baseY=0; world.scene.add(this.fig.g);
    this.pos=this.fig.g.position; this.pos.set(S.d.pos.x,0,S.d.pos.z);
    this.vel=new THREE.Vector3(); this.face=0;
    this.camAz=Math.PI*0.25; this.camAzT=this.camAz; this.camDist=27; this.camDistT=27;
    this.dodgeCD=0; this.dodgeT=0; this.iframes=0; this.combo=0; this.comboT=0; this.heavyCD=0;
    this.blocking=false; this.lockTarget=null; this.lastDmg=-99; this.stepT=0;
    this.meditating=false; this.aura=null; this.medAura=null; this.cine=null; this.shake=0;
    this.cds={ fireball:0, swordqi:0 };
    this.holdTimer=0; this.chargeFxT=0;
    this.setAuraForRealm();
  }
  setOutfit(kind){
    const sect=this.ctx.sect;
    const robeM=this.fig.robe.material, chestM=this.fig.g.children[1].material;
    const sleeveM=[this.fig.armL.children[0].material,this.fig.armR.children[0].material];
    let robe=0x5a6472;
    if(kind==='outer') robe=sect.robe; if(kind==='inner') robe=sect.robe;
    robeM.color.setHex(robe); chestM.color.setHex(robe); sleeveM.forEach(m=>m.color.setHex(robe));
    if(kind!=='mortal'){ this.fig.sash?.material; this.fig.g.children[2].material.color.setHex(sect.trim); }
  }
  setAuraForRealm(){
    if(this.aura) this.fx.removeAura(this.aura);
    const colors=[0x66d9ff,0x46e0a8,0xffd76a,0xff9a3c,0xc77dff];
    const c=colors[Math.min(S.d.realm,4)];
    const n=20+S.d.realm*14+S.d.stage*3;
    this.aura=this.fx.addAura(this.fig.g,c,n,0.9,2.2+S.d.realm*0.5,0.7+S.d.realm*0.3);
  }
  setMeditate(on){
    this.meditating=on; this.fig.sit=on;
    if(on){ this.medAura=this.fx.addAura(this.fig.g,0xbfffe0,60,1.3,2.8,1.6); }
    else if(this.medAura){ this.fx.removeAura(this.medAura); this.medAura=null; }
  }
  playCine(){ // breakthrough cinematic sweep
    this.cine={ t:0, dur:2.6, az0:this.camAz, d0:this.camDist };
    document.body.classList.add('cine'); this.shake=1.2;
  }
  attackables(){ return this.ctx.npcs.attackables(); }
  nearestFoe(maxD=26){
    let best=null,bd=maxD;
    for(const f of this.attackables()){ if(f.dead) continue;
      const d=Math.hypot(f.x-this.pos.x,f.z-this.pos.z); if(d<bd){ bd=d; best=f; } }
    return best;
  }
  tryLock(){
    if(this.lockTarget){ this.lockTarget=null; AudioSys.click(); return; }
    this.lockTarget=this.nearestFoe(); AudioSys.click();
  }
  faceDir(x,z){ this.face=Math.atan2(x,z); }
  // ---- combat actions ----
  doLight(){
    if(this.comboT<=0) this.combo=0;
    this.combo=(this.combo%3)+1; this.comboT=1.1;
    this.fig.atkT=0.38; this.fig.atkVar=this.combo-1; this.fig.mode='combat'; this.combatT=4;
    AudioSys.sword();
    const fwd=new THREE.Vector3(Math.sin(this.face),0,Math.cos(this.face));
    this.pos.addScaledVector(fwd,0.55); this.world.collide(this.pos);
    this.fx.slash(this.pos,fwd,0xd6ecff,2.2+this.combo*0.4);
    const dmg=[8,9,15][this.combo-1]+S.d.realm*4+S.d.stage;
    this.hitArc(fwd,dmg,2.8,this.combo===3?{knock:5}:null);
  }
  doHeavy(){
    this.heavyCD=1.2; this.fig.atkT=0.5; this.fig.atkVar=2; this.fig.mode='combat'; this.combatT=4;
    AudioSys.heavy();
    const fwd=new THREE.Vector3(Math.sin(this.face),0,Math.cos(this.face));
    this.fx.slash(this.pos,fwd,0xffd76a,4.2); this.fx.ring(this.pos,0xffd76a,4);
    this.hitArc(fwd,30+S.d.realm*8+S.d.stage*2,3.4,{knock:9,breakGuard:true});
    this.shake=Math.max(this.shake,0.35);
  }
  hitArc(fwd,dmg,range,extra){
    for(const f of this.attackables()){
      if(f.dead) continue;
      const dx=f.x-this.pos.x, dz=f.z-this.pos.z, d=Math.hypot(dx,dz);
      if(d>range+f.rad) continue;
      const dot=(dx*fwd.x+dz*fwd.z)/(d||1);
      if(dot<0.25&&d>1.2) continue;
      this.ctx.npcs.damageFoe(f,dmg,extra,{x:this.pos.x,z:this.pos.z});
    }
  }
  cast(id){
    const sk=SKILLS[id]; if(!sk||!S.d.skills.includes(id)) return;
    if(this.cds[id]>0){ this.ctx.ui.toast(`${sk.name} — ${this.cds[id].toFixed(1)}s`,''); return; }
    if(S.d.qi<sk.qi){ this.ctx.ui.toast('Not enough Qi! Meditate to recover.','bad'); AudioSys.fail(); return; }
    S.d.qi-=sk.qi; this.cds[id]=sk.cd;
    let dir=new THREE.Vector3(Math.sin(this.face),0,Math.cos(this.face));
    if(this.lockTarget&&!this.lockTarget.dead){
      const dx=this.lockTarget.x-this.pos.x, dz=this.lockTarget.z-this.pos.z;
      dir=new THREE.Vector3(dx,0,dz).normalize(); this.faceDir(dx,dz);
    }
    this.fig.atkT=0.3; this.fig.atkVar=1; this.fig.mode='combat'; this.combatT=4;
    if(id==='fireball'){ AudioSys.fireball(); this.fx.fireball(this.pos,dir,{ color:sk.color, dmg:sk.dmg+S.d.realm*10 }); }
    else { AudioSys.sword(); const p=this.fx.fireball(this.pos,dir,{ color:sk.color, dmg:sk.dmg+S.d.realm*12, speed:30, life:1.1 }); p.halo.scale.set(3.4,1.2,1); }
    this.fx.sparkle(this.pos,sk.color,10,1,2);
  }
  takeDamage(amount,from){
    const now=this.ctx.time;
    if(this.iframes>0) return;
    const dx=from.x-this.pos.x, dz=from.z-this.pos.z;
    const dot=(dx*Math.sin(this.face)+dz*Math.cos(this.face))/(Math.hypot(dx,dz)||1);
    if(this.blocking&&dot>0.25){
      const cost=amount*1.2;
      if(S.d.stam>cost){ S.d.stam-=cost; amount=Math.round(amount*0.2); AudioSys.block();
        this.fx.sparkle(this.pos,0xbfeaff,8,0.8,2); }
      else { this.blocking=false; AudioSys.fail(); } // guard break
    } else AudioSys.hit();
    if(this.meditating) this.ctx.cultivation.stopMeditate(true);
    S.d.hp=Math.max(0,S.d.hp-amount); this.lastDmg=now; this.shake=Math.max(this.shake,0.3);
    this.ctx.ui.float(this.pos,`-${amount}`,'dmg');
    if(S.d.hp<=0) this.ctx.ui.showDeath('Your meridians rupture. Darkness takes you…');
  }
  heal(n){ S.d.hp=Math.min(S.d.maxhp,S.d.hp+n); this.ctx.ui.float(this.pos,`+${n}`,'heal'); this.fx.sparkle(this.pos,0x7dffb0,16,1,3); }
  // ---- per-frame ----
  update(dt,input){
    const ui=this.ctx.ui, busy=ui.isBusy();
    input.pollPad(); const pad=input.pad;
    for(const k of ['KeyC','Tab','KeyM','KeyJ','KeyG','KeyH','KeyR','KeyZ','KeyX','KeyV','KeyQ','KeyE','KeyF','ESC','CULT','PILL'])
      if(input.pressed.has(k==='ESC'?'Escape':k)) ui.hotkey(k,this);
    if(!busy&&input.pressed.has('MLU')){ /* resolved below */ }
    // camera rotate/zoom (allowed unless cine/dead)
    if(!this.cine&&!ui.dead){
      if(input.pressed.has('KeyQ')||input.pressed.has('CAML')) this.camAzT+=Math.PI/4;
      if(input.pressed.has('KeyE')||input.pressed.has('CAMR')) this.camAzT-=Math.PI/4;
      if(input.wheel) this.camDistT=Math.max(13,Math.min(44,this.camDistT+input.wheel*2.2));
    }
    // lock-on upkeep
    if(this.lockTarget&&(this.lockTarget.dead||Math.hypot(this.lockTarget.x-this.pos.x,this.lockTarget.z-this.pos.z)>30)) this.lockTarget=null;
    const locked=!!this.lockTarget;
    const combatTight=(locked||this.ctx.time-this.lastDmg<4)?0.86:1;
    this.camDist+=(this.camDistT*combatTight-this.camDist)*Math.min(1,dt*4);
    // movement input
    let mx=0,mz=0;
    if(!busy&&!this.cine&&!ui.dead){
      for(const code in DIRS) if(input.keys.has(code)){ mx+=DIRS[code][0]; mz+=DIRS[code][1]; }
      mx+=pad.lx; mz+=pad.ly;
      const l=Math.hypot(mx,mz); if(l>1){ mx/=l; mz/=l; }
    }
    const sprint=(input.keys.has('ShiftLeft')||input.keys.has('ShiftRight'))&&S.d.stam>1&&!this.meditating;
    // camera-relative
    const ca=this.camAz, sin=Math.sin(ca), cos=Math.cos(ca);
    const wx=(mx*cos-mz*sin), wz=(mx*sin+mz*cos);
    const moving=Math.hypot(wx,wz)>0.12;
    if(moving&&!this.meditating){
      if(!locked||this.blocking) this.faceDir(wx,wz);
      const sp=(sprint?7.4:4.4)*(this.blocking?0.45:1)*(this.dodgeT>0?2.2:1);
      this.pos.x+=wx*sp*dt; this.pos.z+=wz*sp*dt;
      if(sprint) S.d.stam=Math.max(0,S.d.stam-14*dt);
      this.stepT-=dt; if(this.stepT<=0){ AudioSys.step(); this.stepT=sprint?0.24:0.36; }
      if(this.meditating) this.ctx.cultivation.stopMeditate();
    }
    if(locked&&!this.lockTarget.dead){ const dx=this.lockTarget.x-this.pos.x, dz=this.lockTarget.z-this.pos.z; this.faceDir(dx,dz); }
    this.world.collide(this.pos);
    // dodge
    this.dodgeCD-=dt; this.iframes-=dt;
    if(!busy&&!this.cine&&!ui.dead&&(input.pressed.has('SPACE')||(pad.dodge&&!pad.wasDodge))){
      if(this.meditating) this.ctx.cultivation.stopMeditate();
      if(this.dodgeCD<=0&&S.d.stam>=15){
        S.d.stam-=15; this.dodgeCD=0.7; this.dodgeT=0.28; this.iframes=0.34; AudioSys.dodge();
        let dx=wx,dz=wz; if(!moving){ dx=Math.sin(this.face); dz=Math.cos(this.face); } else this.faceDir(wx,wz);
        const dl=Math.hypot(dx,dz)||1; this.dodgeDir={x:dx/dl,z:dz/dl};
        this.fx.sparkle(this.pos,0xbfeaff,10,0.8,1.5);
      }
    }
    if(this.dodgeT>0){ this.dodgeT-=dt; this.pos.x+=this.dodgeDir.x*16*dt; this.pos.z+=this.dodgeDir.z*16*dt; this.world.collide(this.pos); }
    // block
    this.blocking=!!((input.mb.r||pad.block)&&!busy&&!this.meditating&&!ui.dead);
    this.fig.block=this.blocking;
    // attacks (LMB state machine)
    this.comboT-=dt; this.heavyCD-=dt;
    if(!busy&&!this.cine&&!ui.dead&&!this.meditating){
      if(input.mb.l){
        this.holdTimer+=dt;
        if(!this.lFiredRef&&this.holdTimer>0.12){ this.lFiredRef=true; this.doLight(); }
        if(this.holdTimer>0.5){
          this.chargeFxT-=dt;
          if(this.chargeFxT<=0){ this.chargeFxT=0.12; this.fx.sparkle(this.pos,0xffd76a,3,0.7,2); }
        }
      }
      if(input.pressed.has('MLU')){
        if(this.holdTimer>0.5&&this.heavyCD<=0) this.doHeavy();
        else if(!this.lFiredRef) this.doLight();
        this.holdTimer=0; this.lFiredRef=false;
      }
      if(pad.atk&&!pad.wasAtk) this.doLight();
      if(pad.heavy&&!pad.wasHeavy&&this.heavyCD<=0) this.doHeavy();
      if(input.pressed.has('Digit1')||(pad.s1&&!pad.wasS1)) this.cast('fireball');
      if(input.pressed.has('Digit2')||(pad.s2&&!pad.wasS2)) this.cast('swordqi');
    } else { if(!input.mb.l){ this.holdTimer=0; this.lFiredRef=false; } }
    this.fig.mode=(this.combatT>0||locked||this.blocking)?'combat':'idle'; this.combatT-=dt;
    // regen
    if(this.ctx.time-this.lastDmg>5) S.d.hp=Math.min(S.d.maxhp,S.d.hp+(2+S.d.realm*2)*dt);
    S.d.qi=Math.min(S.d.maxqi,S.d.qi+(2.5+S.d.realm*1.5+(this.meditating?14:0))*dt);
    if(!sprint) S.d.stam=Math.min(S.d.maxstam,S.d.stam+26*dt);
    for(const k in this.cds) this.cds[k]=Math.max(0,this.cds[k]-dt);
    // pose + camera
    poseFigure(this.fig,dt,moving?(sprint?1.4:1):0);
    this.fig.g.rotation.y=this.face;
    // camera
    this.camAz+=(this.camAzT-this.camAz)*Math.min(1,dt*5);
    let dist=this.camDist, az=this.camAz, lookY=1.6, lookAhead=0;
    if(this.cine){
      const c=this.cine; c.t+=dt; const k=Math.min(1,c.t/c.dur);
      dist=c.d0+Math.sin(k*Math.PI)*14; az=c.az0+k*Math.PI*0.75; lookY=1.6+Math.sin(k*Math.PI)*3;
      if(k>=1){ this.cine=null; document.body.classList.remove('cine'); }
    }
    if(locked){ lookAhead=1.5; }
    const ox=Math.cos(az)*dist*0.72, oz=Math.sin(az)*dist*0.72, oy=dist*0.86;
    const tx=this.pos.x+Math.sin(this.face)*lookAhead, tz=this.pos.z+Math.cos(this.face)*lookAhead;
    const cam=this.world.camera;
    cam.position.set(tx+ox,oy,tz+oz);
    if(this.shake>0){ this.shake-=dt*2.4; cam.position.x+=(Math.random()-0.5)*this.shake; cam.position.y+=(Math.random()-0.5)*this.shake; }
    cam.lookAt(tx,lookY,tz);
    // aura follows (fx reads target position)
    S.d.pos.x=this.pos.x; S.d.pos.z=this.pos.z;
  }
}
