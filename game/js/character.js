// ===== Procedural robed-figure rig (player, NPCs, dummies' cousins) =====
import * as THREE from 'three';
const MAT = (c,r=0.85)=>new THREE.MeshStandardMaterial({ color:c, roughness:r, metalness:0.05, flatShading:true });

export function makeFigure(o={}){
  const robeC=o.robe??0x2b5fa6, trimC=o.trim??0xdfe9f5, skinC=o.skin??0xe8b98a, hairC=o.hair??0x1a1a22;
  const g=new THREE.Group();
  // robe (tapered, ground-length)
  const robe=new THREE.Mesh(new THREE.CylinderGeometry(0.30,0.62,1.5,10),MAT(robeC));
  robe.position.y=0.75; robe.castShadow=true; g.add(robe);
  // chest / shoulders
  const chest=new THREE.Mesh(new THREE.SphereGeometry(0.30,10,8),MAT(robeC)); chest.scale.set(1.15,0.8,0.8); chest.position.y=1.42; chest.castShadow=true; g.add(chest);
  // sash belt
  const sash=new THREE.Mesh(new THREE.CylinderGeometry(0.335,0.36,0.14,10),MAT(o.sash??trimC,0.6)); sash.position.y=1.02; g.add(sash);
  // collar trim (two crossed planes)
  const collar=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.5,0.02),MAT(trimC,0.6));
  collar.position.set(0.1,1.32,0.26); collar.rotation.z=0.35; g.add(collar);
  const collar2=collar.clone(); collar2.position.x=-0.1; collar2.rotation.z=-0.35; g.add(collar2);
  // head
  const head=new THREE.Group(); head.position.y=1.78; g.add(head);
  const face=new THREE.Mesh(new THREE.SphereGeometry(0.21,14,12),MAT(skinC,0.7)); face.castShadow=true; head.add(face);
  const hair=new THREE.Mesh(new THREE.SphereGeometry(0.215,14,12,0,Math.PI*2,0,Math.PI*0.55),MAT(hairC,0.95));
  hair.position.y=0.03; head.add(hair);
  const bun=new THREE.Mesh(new THREE.SphereGeometry(0.08,8,8),MAT(hairC,0.95)); bun.position.set(0,0.22,-0.06); head.add(bun);
  if(o.beard){ const b=new THREE.Mesh(new THREE.ConeGeometry(0.09,0.35,8),MAT(0xcccccc,0.95)); b.position.set(0,-0.28,0.08); b.rotation.x=Math.PI; head.add(b); }
  if(o.hat){ const brim=new THREE.Mesh(new THREE.ConeGeometry(0.34,0.16,10),MAT(0x8a6f3f,0.9)); brim.position.y=0.24; head.add(brim); }
  // arms (pivot groups at shoulders)
  function arm(side){
    const pivot=new THREE.Group(); pivot.position.set(0.34*side,1.5,0); g.add(pivot);
    const sleeve=new THREE.Mesh(new THREE.CylinderGeometry(0.10,0.14,0.55,8),MAT(robeC)); sleeve.position.y=-0.28; sleeve.castShadow=true; pivot.add(sleeve);
    const hand=new THREE.Mesh(new THREE.SphereGeometry(0.09,8,8),MAT(skinC,0.7)); hand.position.y=-0.6; pivot.add(hand);
    return pivot;
  }
  const armL=arm(-1), armR=arm(1);
  // sword on back
  let sword=null;
  if(o.sword!==false){
    sword=new THREE.Group();
    const blade=new THREE.Mesh(new THREE.BoxGeometry(0.07,1.0,0.02),MAT(0xb9c4d0,0.35)); blade.position.y=0.15; sword.add(blade);
    const guard=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.05,0.06),MAT(0xc9a227,0.5)); guard.position.y=-0.36; sword.add(guard);
    const grip=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.22,6),MAT(0x5a3a20)); grip.position.y=-0.48; sword.add(grip);
    sword.position.set(-0.12,1.55,-0.30); sword.rotation.z=0.5; sword.rotation.x=0.12; g.add(sword);
  }
  // hand sword (hidden unless fighting)
  const handSword=new THREE.Group();
  const hb=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.95,0.02),MAT(0xd7e3f0,0.25)); hb.position.y=-1.05; handSword.add(hb);
  const hg=new THREE.Mesh(new THREE.BoxGeometry(0.2,0.05,0.05),MAT(0xc9a227,0.5)); hg.position.y=-0.58; handSword.add(hg);
  handSword.position.set(0,-0.6,0.05); handSword.rotation.x=Math.PI; handSword.visible=false; armR.add(handSword);
  // shadow blob safety
  g.traverse(m=>{ if(m.isMesh) m.receiveShadow=false; });
  if(o.scale) g.scale.setScalar(o.scale);
  const fig={ g, robe, head, armL, armR, handSword, swordBack:sword,
    mode:'idle', t:Math.random()*10, atkT:0, atkVar:0, block:false, dead:false, sit:false,
    baseY:0, bobP:Math.random()*10 };
  g.userData.fig=fig;
  return fig;
}

// pose update — call every frame
export function poseFigure(f,dt,moveSpeed=0){
  f.t+=dt;
  const swing=Math.sin(f.t*9)*Math.min(1,moveSpeed)*0.7;
  if(f.dead){ f.g.rotation.x += ((-Math.PI/2)-f.g.rotation.x)*Math.min(1,dt*5); return; }
  f.g.rotation.x=0;
  if(f.sit){ // meditation
    f.g.position.y=f.baseY-0.35+Math.sin(f.t*1.6)*0.02;
    f.armL.rotation.x=-0.9; f.armR.rotation.x=-0.9; f.armL.rotation.z=0.5; f.armR.rotation.z=-0.5;
    f.head.rotation.x=0.15; f.robe.scale.set(1.25,0.72,1.25); f.handSword.visible=false; return;
  }
  f.robe.scale.set(1,1,1);
  f.g.position.y=f.baseY+Math.abs(Math.sin(f.t*9))*0.06*Math.min(1,moveSpeed)+Math.sin(f.t*2)*0.015;
  f.robe.rotation.y=Math.sin(f.t*2)*0.03;
  if(f.atkT>0){ // attack swing
    f.atkT-=dt; const k=1-f.atkT/0.38, sw=Math.sin(k*Math.PI);
    f.handSword.visible=true;
    if(f.atkVar===0){ f.armR.rotation.x=-2.2*sw+0.3; f.armR.rotation.z=-0.4; }
    else if(f.atkVar===1){ f.armR.rotation.x=-1.4*sw; f.armR.rotation.z=-1.8*sw; }
    else { f.armR.rotation.x=-2.6*sw+0.5; f.armR.rotation.z=0.9*sw; f.g.rotation.y+=dt*7; }
    f.armL.rotation.x=0.5*sw; f.head.rotation.x=-0.1;
    if(f.atkT<=0) f.handSword.visible=(f.mode==='combat');
  } else if(f.block){
    f.armL.rotation.x=-1.4; f.armR.rotation.x=-1.2; f.armR.rotation.z=-0.9;
    f.handSword.visible=true; f.head.rotation.x=0.05;
  } else {
    f.armL.rotation.x=swing; f.armR.rotation.x=-swing;
    f.armL.rotation.z=0.12; f.armR.rotation.z=-0.12; f.head.rotation.x=0;
    f.handSword.visible=(f.mode==='combat');
    if(f.handSword.visible){ f.armR.rotation.x=-0.5; f.armR.rotation.z=-0.3; }
  }
}

// floating nameplate sprite
export function makeNameplate(text,color='#ffd76a'){
  const c=document.createElement('canvas'); c.width=256; c.height=64;
  const x=c.getContext('2d'); x.font='600 30px "Noto Serif SC",serif'; x.textAlign='center';
  x.shadowColor='#000'; x.shadowBlur=8; x.fillStyle=color; x.fillText(text,128,42);
  const tex=new THREE.CanvasTexture(c);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({ map:tex, transparent:true, depthWrite:false }));
  s.scale.set(3.2,0.8,1); s.position.y=2.5; return s;
}
