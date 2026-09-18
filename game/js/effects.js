// ===== VFX library: auras, slashes, projectiles, pillars, ambience =====
import * as THREE from 'three';
function glowTexture(){
  const c=document.createElement('canvas'); c.width=c.height=64;
  const g=c.getContext('2d'), gr=g.createRadialGradient(32,32,2,32,32,30);
  gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(0.4,'rgba(255,255,255,.5)'); gr.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle=gr; g.fillRect(0,0,64,64);
  return new THREE.CanvasTexture(c);
}
export class FX {
  constructor(scene){
    this.scene=scene; this.tex=glowTexture();
    this.auras=[]; this.projs=[]; this.flashes=[]; this.beams=[]; this.rings=[];
    this._tmp=new THREE.Vector3();
  }
  // --- rising qi aura around a target (persistent) ---
  addAura(target,color=0x66e0ff,count=42,spread=0.9,height=2.2,speed=1){
    const geo=new THREE.BufferGeometry(), pos=new Float32Array(count*3), seed=new Float32Array(count);
    for(let i=0;i<count;i++){ seed[i]=Math.random(); }
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const mat=new THREE.PointsMaterial({ size:0.22, map:this.tex, color, transparent:true, opacity:0.85,
      blending:THREE.AdditiveBlending, depthWrite:false });
    const pts=new THREE.Points(geo,mat); pts.frustumCulled=false; this.scene.add(pts);
    const a={ target, pts, seed, count, spread, height, speed, life:0 };
    this.auras.push(a); return a;
  }
  removeAura(a){ this.scene.remove(a.pts); a.pts.geometry.dispose(); a.pts.material.dispose(); this.auras.splice(this.auras.indexOf(a),1); }
  // --- crescent slash flash ---
  slash(pos,dir,color=0xbfeaff,size=3.2){
    const geo=new THREE.TorusGeometry(size*0.5,size*0.09,8,24,Math.PI*1.1);
    const mat=new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0.95, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide });
    const m=new THREE.Mesh(geo,mat); m.position.copy(pos); m.position.y+=1.2;
    m.rotation.y=Math.atan2(dir.x,dir.z); m.rotation.z=0.5;
    this.scene.add(m); this.flashes.push({m,life:0,max:0.28,grow:1.6});
  }
  // --- fireball / generic projectile ---
  fireball(from,dir,{color=0xff7a2a,dmg=25,speed=22,radius=0.5,life=1.6,aoe=0}={}){
    const g=new THREE.Group();
    const core=new THREE.Mesh(new THREE.SphereGeometry(0.32,12,12),
      new THREE.MeshBasicMaterial({ color:0xffe6b0 }));
    const halo=new THREE.Sprite(new THREE.SpriteMaterial({ map:this.tex, color, transparent:true, opacity:0.9, blending:THREE.AdditiveBlending, depthWrite:false }));
    halo.scale.set(2.4,2.4,1);
    const light=new THREE.PointLight(color,8,12); light.position.y=0.3;
    g.add(core,halo,light); g.position.copy(from); g.position.y+=1.3;
    this.scene.add(g);
    const p={ g, halo, vel:new THREE.Vector3(dir.x,0,dir.z).normalize().multiplyScalar(speed), dmg, life, max:life, aoe, color, trail:0 };
    this.projs.push(p); return p;
  }
  // --- breakthrough heaven pillar ---
  pillar(pos,color=0xffd76a){
    const beamMat=new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0.75, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide });
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(0.7,1.6,60,16,1,true),beamMat);
    beam.position.set(pos.x,30,pos.z); this.scene.add(beam);
    const core=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.5,60,12,1,true),
      new THREE.MeshBasicMaterial({ color:0xffffff, transparent:true, opacity:0.9, blending:THREE.AdditiveBlending, depthWrite:false }));
    core.position.copy(beam.position); this.scene.add(core);
    const light=new THREE.PointLight(color,60,40); light.position.set(pos.x,4,pos.z); this.scene.add(light);
    this.beams.push({ beam, core, light, life:0, max:3.2 });
    for(let i=0;i<3;i++) this.ring(pos,color,2+i*2.5,0.35*i);
  }
  ring(pos,color=0xffffff,maxR=8,delay=0){
    const mat=new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0.9, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide });
    const m=new THREE.Mesh(new THREE.RingGeometry(0.8,1.0,48),mat);
    m.rotation.x=-Math.PI/2; m.position.set(pos.x,0.15,pos.z); this.scene.add(m);
    this.rings.push({ m, life:-delay, max:0.9, maxR });
  }
  sparkle(pos,color=0x9fe8ff,n=14,spread=1.2,up=3){
    const geo=new THREE.BufferGeometry(), p=new Float32Array(n*3), v=[];
    for(let i=0;i<n;i++){ p[i*3]=pos.x+(Math.random()-0.5)*spread; p[i*3+1]=pos.y+Math.random()*1.2; p[i*3+2]=pos.z+(Math.random()-0.5)*spread;
      v.push(new THREE.Vector3((Math.random()-0.5)*2,up*(0.5+Math.random()),(Math.random()-0.5)*2)); }
    geo.setAttribute('position',new THREE.BufferAttribute(p,3));
    const mat=new THREE.PointsMaterial({ size:0.18, map:this.tex, color, transparent:true, opacity:1, blending:THREE.AdditiveBlending, depthWrite:false });
    const pts=new THREE.Points(geo,mat); pts.frustumCulled=false; this.scene.add(pts);
    this.flashes.push({ m:pts, life:0, max:0.9, vel:v, grav:-4, pts:true });
  }
  // --- drifting petals/leaves ambience ---
  ambience(count=120,area=70,color=0xffd9e8){
    const geo=new THREE.BufferGeometry(), p=new Float32Array(count*3), seed=new Float32Array(count);
    for(let i=0;i<count;i++){ p[i*3]=(Math.random()-0.5)*area; p[i*3+1]=Math.random()*14; p[i*3+2]=(Math.random()-0.5)*area; seed[i]=Math.random()*10; }
    geo.setAttribute('position',new THREE.BufferAttribute(p,3));
    const mat=new THREE.PointsMaterial({ size:0.16, map:this.tex, color, transparent:true, opacity:0.7, depthWrite:false });
    const pts=new THREE.Points(geo,mat); pts.frustumCulled=false; this.scene.add(pts);
    this._amb={ pts, seed, count, area };
  }
  update(dt,t){
    for(const a of this.auras){
      a.life+=dt; const p=a.pts.geometry.attributes.position.array;
      a.target.getWorldPosition?.(this._tmp) ?? this._tmp.set(0,0,0);
      const base=a.target.position||this._tmp;
      for(let i=0;i<a.count;i++){
        const s=(a.seed[i]+a.life*0.35*a.speed)%1;
        const ang=a.seed[i]*20+a.life*(0.8+a.seed[i]);
        const r=a.spread*(0.4+0.6*Math.sin(s*Math.PI));
        p[i*3]=base.x+Math.cos(ang)*r; p[i*3+1]=base.y+s*a.height; p[i*3+2]=base.z+Math.sin(ang)*r;
      }
      a.pts.geometry.attributes.position.needsUpdate=true;
      a.pts.material.opacity=0.55+0.3*Math.sin(t*3);
    }
    for(let i=this.projs.length-1;i>=0;i--){
      const p=this.projs[i]; p.life-=dt;
      p.g.position.addScaledVector(p.vel,dt);
      p.halo.material.rotation+=dt*6;
      p.trail-=dt;
      if(p.trail<=0){ p.trail=0.03; this.sparkle(p.g.position,p.color,1,0.3,0.5); }
      if(p.life<=0||p.g.position.y<0){ this.scene.remove(p.g); this.projs.splice(i,1); }
    }
    for(let i=this.flashes.length-1;i>=0;i--){
      const f=this.flashes[i]; f.life+=dt; const k=f.life/f.max;
      if(f.pts){
        const arr=f.m.geometry.attributes.position.array;
        for(let j=0;j<f.vel.length;j++){ const v=f.vel[j]; v.y+= (f.grav||0)*dt;
          arr[j*3]+=v.x*dt; arr[j*3+1]+=v.y*dt; arr[j*3+2]+=v.z*dt; }
        f.m.geometry.attributes.position.needsUpdate=true; f.m.material.opacity=1-k;
      } else { f.m.scale.multiplyScalar(1+f.grow*dt); f.m.material.opacity=0.95*(1-k); }
      if(k>=1){ this.scene.remove(f.m); this.flashes.splice(i,1); }
    }
    for(let i=this.beams.length-1;i>=0;i--){
      const b=this.beams[i]; b.life+=dt; const k=b.life/b.max;
      b.beam.material.opacity=0.75*(1-k); b.core.material.opacity=0.9*(1-k);
      b.beam.scale.x=b.beam.scale.z=1+k*2.2; b.light.intensity=60*(1-k);
      if(k>=1){ this.scene.remove(b.beam,b.core,b.light); this.beams.splice(i,1); }
    }
    for(let i=this.rings.length-1;i>=0;i--){
      const r=this.rings[i]; r.life+=dt; if(r.life<0) continue; const k=r.life/r.max;
      const s=1+k*r.maxR; r.m.scale.set(s,s,1); r.m.material.opacity=0.9*(1-k);
      if(k>=1){ this.scene.remove(r.m); this.rings.splice(i,1); }
    }
    if(this._amb){
      const { pts, seed, count, area }=this._amb, arr=pts.geometry.attributes.position.array;
      for(let i=0;i<count;i++){
        arr[i*3]+=Math.sin(t*0.7+seed[i])*dt*1.2+dt*0.8; arr[i*3+1]-=dt*0.55; arr[i*3+2]+=Math.cos(t*0.5+seed[i])*dt;
        if(arr[i*3+1]<0){ arr[i*3+1]=12+Math.random()*3; arr[i*3]=(Math.random()-0.5)*area; }
        if(arr[i*3]>area/2) arr[i*3]=-area/2;
      }
      pts.geometry.attributes.position.needsUpdate=true;
    }
  }
}
