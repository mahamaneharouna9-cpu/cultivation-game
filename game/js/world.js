// ===== World: sect grounds, sky, day/night, props, interactables =====
import * as THREE from 'three';
const M=(c,r=0.9,extra={})=>new THREE.MeshStandardMaterial({ color:c, roughness:r, metalness:0.05, flatShading:true, ...extra });
const BOUND=58;

export class World {
  constructor(canvas, fx){
    this.fx=fx; this.colliders=[]; this.interact=[]; this.herbs=[]; this.dummies=[]; this.lanterns=[];
    this.floaters=[];
    const r=this.renderer=new THREE.WebGLRenderer({ canvas, antialias:true });
    r.setPixelRatio(Math.min(devicePixelRatio,2)); r.setSize(innerWidth,innerHeight);
    r.shadowMap.enabled=true; r.shadowMap.type=THREE.PCFSoftShadowMap;
    r.toneMapping=THREE.ACESFilmicToneMapping; r.toneMappingExposure=1.05;
    const s=this.scene=new THREE.Scene();
    fx.scene=s; // FX needs the scene before ambience() is built below
    s.fog=new THREE.Fog(0xbcd3e8,60,220);
    this.camera=new THREE.PerspectiveCamera(30,innerWidth/innerHeight,0.1,600);
    // lights
    this.hemi=new THREE.HemisphereLight(0xbfd8ff,0x3a5f3f,0.75); s.add(this.hemi);
    this.sun=new THREE.DirectionalLight(0xfff2dd,1.6);
    this.sun.castShadow=true; this.sun.shadow.mapSize.set(2048,2048);
    Object.assign(this.sun.shadow.camera,{left:-70,right:70,top:70,bottom:-70,far:260});
    this.sun.shadow.bias=-0.0006; s.add(this.sun); s.add(this.sun.target);
    this.moon=new THREE.DirectionalLight(0x8fa8ff,0.0); this.moon.position.set(-40,60,-30); s.add(this.moon);
    // sky dome
    this.skyMat=new THREE.ShaderMaterial({ side:THREE.BackSide, depthWrite:false, fog:false,
      uniforms:{ top:{value:new THREE.Color(0x3d6fb5)}, mid:{value:new THREE.Color(0xbcd3e8)}, bot:{value:new THREE.Color(0xe8f0f5)} },
      vertexShader:'varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader:`varying vec3 vP; uniform vec3 top,mid,bot;
        void main(){ float h=normalize(vP).y; vec3 c=h>0.12?mix(mid,top,smoothstep(0.12,0.75,h)):mix(bot,mid,smoothstep(-0.15,0.12,h));
        gl_FragColor=vec4(c,1.0); }`});
    s.add(new THREE.Mesh(new THREE.SphereGeometry(400,24,16),this.skyMat));
    // stars
    const sg=new THREE.BufferGeometry(), sp=new Float32Array(400*3);
    for(let i=0;i<400;i++){ const a=Math.random()*Math.PI*2, e=Math.random()*Math.PI*0.45+0.1;
      sp[i*3]=Math.cos(a)*Math.cos(e)*380; sp[i*3+1]=Math.sin(e)*380; sp[i*3+2]=Math.sin(a)*Math.cos(e)*380; }
    sg.setAttribute('position',new THREE.BufferAttribute(sp,3));
    this.stars=new THREE.Points(sg,new THREE.PointsMaterial({ color:0xffffff, size:1.6, sizeAttenuation:false, transparent:true, opacity:0, fog:false, depthWrite:false }));
    s.add(this.stars);
    this.buildTerrain(); this.buildSect(); this.buildNature();
    fx.ambience(130,90,0xffe3ee);
    addEventListener('resize',()=>{ this.camera.aspect=innerWidth/innerHeight; this.camera.updateProjectionMatrix(); r.setSize(innerWidth,innerHeight); });
  }
  addCollider(x,z,rad){ this.colliders.push({x,z,rad}); }
  addInteract(o){ this.interact.push(o); return o; }
  collide(p,rad=0.6){
    p.x=Math.max(-BOUND,Math.min(BOUND,p.x)); p.z=Math.max(-BOUND,Math.min(BOUND,p.z));
    for(const c of this.colliders){
      const dx=p.x-c.x, dz=p.z-c.z, d=Math.hypot(dx,dz), min=c.rad+rad;
      if(d<min&&d>0.001){ p.x=c.x+dx/d*min; p.z=c.z+dz/d*min; }
    }
  }
  // ---------- terrain ----------
  buildTerrain(){
    const s=this.scene;
    const gnd=new THREE.Mesh(new THREE.CircleGeometry(150,48),M(0x4a7a4e));
    gnd.rotation.x=-Math.PI/2; gnd.receiveShadow=true; s.add(gnd);
    // stone plaza
    const plaza=new THREE.Mesh(new THREE.CircleGeometry(13,28),M(0x9a958a));
    plaza.rotation.x=-Math.PI/2; plaza.position.y=0.02; plaza.receiveShadow=true; s.add(plaza);
    const ring=new THREE.Mesh(new THREE.RingGeometry(12.4,13,40),M(0x7a756a));
    ring.rotation.x=-Math.PI/2; ring.position.y=0.03; s.add(ring);
    // paths
    const pathM=M(0x8d887c);
    const mkPath=(w,l,x,z,ry=0)=>{ const p=new THREE.Mesh(new THREE.BoxGeometry(w,0.06,l),pathM);
      p.position.set(x,0.03,z); p.rotation.y=ry; p.receiveShadow=true; s.add(p); };
    mkPath(4,30,0,28); mkPath(4,26,0,-26); mkPath(26,4,24,4); mkPath(22,4,-22,6);
    // pond
    const pond=new THREE.Mesh(new THREE.CircleGeometry(5,24),new THREE.MeshStandardMaterial({ color:0x2e6f8e, roughness:0.15, metalness:0.5 }));
    pond.rotation.x=-Math.PI/2; pond.position.set(-14,0.04,20); s.add(pond);
    this.addCollider(-14,20,5.4);
    // distant mountains + snow
    for(let i=0;i<14;i++){
      const a=i/14*Math.PI*2+0.2, R=120+Math.random()*40, h=34+Math.random()*30, w=26+Math.random()*22;
      const m=new THREE.Mesh(new THREE.ConeGeometry(w,h,5),M(i%2?0x5a6f8a:0x4a5f7a));
      m.position.set(Math.cos(a)*R,h/2-4,Math.sin(a)*R); m.rotation.y=Math.random()*3; s.add(m);
      const cap=new THREE.Mesh(new THREE.ConeGeometry(w*0.36,h*0.36,5),M(0xe8f0f5,0.6));
      cap.position.set(m.position.x,h-4-h*0.18,m.position.z); cap.rotation.y=m.rotation.y; s.add(cap);
    }
    // sea of clouds beyond bounds
    const cloudM=new THREE.SpriteMaterial({ map:this.fx.tex, color:0xe8f0f8, transparent:true, opacity:0.85, depthWrite:false });
    for(let i=0;i<26;i++){
      const sp=new THREE.Sprite(cloudM.clone());
      const a=Math.random()*Math.PI*2, R=75+Math.random()*45;
      sp.position.set(Math.cos(a)*R,-4+Math.random()*4,Math.sin(a)*R);
      const sc=18+Math.random()*22; sp.scale.set(sc,sc*0.4,1); s.add(sp);
      this.floaters.push({ m:sp, baseY:sp.position.y, ph:Math.random()*9, amp:1.2 });
    }
    // floating islets
    for(let i=0;i<5;i++){
      const grp=new THREE.Group();
      const rock=new THREE.Mesh(new THREE.ConeGeometry(3+Math.random()*2,4+Math.random()*3,6),M(0x5a5f6a));
      rock.rotation.x=Math.PI; grp.add(rock);
      const top=new THREE.Mesh(new THREE.CylinderGeometry(3.2,2.6,0.8,8),M(0x4a7a4e)); top.position.y=2.4; grp.add(top);
      const pine=this.pine(1.4); pine.position.y=3; grp.add(pine);
      const a=0.6+i*1.25; grp.position.set(Math.cos(a)*(46+i*3),16+Math.random()*6,Math.sin(a)*(46+i*3));
      s.add(grp); this.floaters.push({ m:grp, baseY:grp.position.y, ph:Math.random()*9, amp:0.8 });
    }
  }
  // ---------- building kit ----------
  roofMat(){ return M(0x2b6fa6,0.55); }
  pillarM(){ return M(0x8e2f36,0.7); }
  wallM(){ return M(0xe8e2d2,0.85); }
  makeRoof(w,d,y,parent,over=1.35){
    const roof=new THREE.Mesh(new THREE.ConeGeometry(Math.max(w,d)*0.5*over,2.2,4),this.roofMat());
    roof.position.y=y; roof.rotation.y=Math.PI/4; roof.castShadow=true; parent.add(roof);
    const ridge=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.5,Math.max(w,d)*0.7),M(0xc9a227,0.5));
    ridge.position.y=y+1.2; parent.add(ridge);
    // upturned eave tips
    for(const [sx,sz] of [[1,1],[1,-1],[-1,1],[-1,-1]]){
      const tip=new THREE.Mesh(new THREE.BoxGeometry(0.25,0.25,1.6),M(0xc9a227,0.5));
      tip.position.set(sx*w*0.5*over*0.92,y-0.8,sz*d*0.5*over*0.92); tip.rotation.y=sx*sz*0.785; tip.rotation.x=-0.35*sz; parent.add(tip);
    }
    return roof;
  }
  makeGate(x,z,ry=0){
    const g=new THREE.Group(); g.position.set(x,0,z); g.rotation.y=ry;
    for(const sx of [-3.4,3.4]) for(const sz of [-1.2,1.2]){
      const p=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.5,7,8),this.pillarM());
      p.position.set(sx,3.5,sz); p.castShadow=true; g.add(p);
      const base=new THREE.Mesh(new THREE.BoxGeometry(1.3,0.8,1.3),M(0x7a756a)); base.position.set(sx,0.4,sz); g.add(base);
    }
    const beam=new THREE.Mesh(new THREE.BoxGeometry(8.6,0.9,3.4),M(0x6e1f26,0.7)); beam.position.y=7.2; beam.castShadow=true; g.add(beam);
    const beam2=new THREE.Mesh(new THREE.BoxGeometry(7.2,0.6,2.4),M(0x6e1f26,0.7)); beam2.position.y=5.2; g.add(beam2);
    this.makeRoof(9,4,8.6,g);
    const plaque=new THREE.Mesh(new THREE.BoxGeometry(3.2,1.0,0.2),M(0x1a1a22,0.6));
    plaque.position.set(0,6.1,1.75); g.add(plaque);
    for(const sx of [-5.2,5.2]){ // stone lions
      const lion=new THREE.Group();
      const b=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.1,1.6),M(0x8d887c)); b.position.y=1.0; lion.add(b);
      const h=new THREE.Mesh(new THREE.SphereGeometry(0.55,8,8),M(0x9a958a)); h.position.set(0,1.9,0.5); lion.add(h);
      const ped=new THREE.Mesh(new THREE.BoxGeometry(1.4,0.6,2),M(0x6e6a60)); ped.position.y=0.3; lion.add(ped);
      lion.position.set(sx,0,2.6); lion.traverse(m=>{if(m.isMesh)m.castShadow=true;}); g.add(lion);
    }
    this.scene.add(g);
    this.addCollider(x+Math.cos(ry)*0-3.4,z,1.1); this.addCollider(x+3.4,z,1.1);
    return g;
  }
  makePagoda(x,z,floors=4,scale=1){
    const g=new THREE.Group(); g.position.set(x,0,z); g.scale.setScalar(scale);
    let y=0;
    const plat=new THREE.Mesh(new THREE.CylinderGeometry(6.4,7,1,8),M(0x8d887c)); plat.position.y=0.5; plat.receiveShadow=true; g.add(plat); y=1;
    for(let f=0;f<floors;f++){
      const w=9-f*1.6;
      const body=new THREE.Mesh(new THREE.CylinderGeometry(w/2,w/2,3,8),this.wallM());
      body.position.y=y+1.5; body.castShadow=true; g.add(body);
      for(let i=0;i<4;i++){ // glowing windows
        const win=new THREE.Mesh(new THREE.BoxGeometry(0.9,1.2,0.1),
          new THREE.MeshStandardMaterial({ color:0x443311, emissive:0xffc46b, emissiveIntensity:0.9 }));
        const a=i*Math.PI/2+Math.PI/8; win.position.set(Math.cos(a)*w/2*0.98,y+1.5,Math.sin(a)*w/2*0.98);
        win.rotation.y=-a+Math.PI/2; g.add(win);
      }
      this.makeRoof(w+1.4,w+1.4,y+3.9,g,1.28); y+=4.4;
    }
    const spire=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,2.6,6),M(0xc9a227,0.4)); spire.position.y=y+1; g.add(spire);
    this.scene.add(g); this.addCollider(x,z,6.6*scale);
    return g;
  }
  makeHall(x,z,w=10,d=7,ry=0,name=''){
    const g=new THREE.Group(); g.position.set(x,0,z); g.rotation.y=ry;
    const plat=new THREE.Mesh(new THREE.BoxGeometry(w+2,0.8,d+2),M(0x8d887c)); plat.position.y=0.4; plat.receiveShadow=true; g.add(plat);
    const body=new THREE.Mesh(new THREE.BoxGeometry(w,3.4,d),this.wallM()); body.position.y=2.5; body.castShadow=true; g.add(body);
    for(let i=0;i<=4;i++){ const p=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.32,3.4,8),this.pillarM());
      p.position.set(-w/2+i*w/4,2.5,d/2+0.3); p.castShadow=true; g.add(p); }
    const door=new THREE.Mesh(new THREE.BoxGeometry(1.8,2.6,0.15),M(0x3a2415,0.8)); door.position.set(0,1.9,d/2+0.05); g.add(door);
    this.makeRoof(w+2.4,d+2.4,5.2,g);
    this.scene.add(g);
    const ex=Math.abs(Math.cos(ry))*(w/2+1)+Math.abs(Math.sin(ry))*(d/2+1);
    const ez=Math.abs(Math.sin(ry))*(w/2+1)+Math.abs(Math.cos(ry))*(d/2+1);
    this.addCollider(x,z,Math.max(ex,ez)*0.95);
    return g;
  }
  makeArena(x,z){
    const g=new THREE.Group(); g.position.set(x,0,z);
    const floor=new THREE.Mesh(new THREE.CylinderGeometry(10,10.4,0.5,24),M(0x9a958a));
    floor.position.y=0.25; floor.receiveShadow=true; g.add(floor);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(9.4,0.25,8,40),M(0x6e1f26,0.7));
    ring.rotation.x=Math.PI/2; ring.position.y=0.55; g.add(ring);
    for(let i=0;i<8;i++){ const a=i/8*Math.PI*2;
      const post=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.2,3.4,6),this.pillarM());
      post.position.set(Math.cos(a)*10.6,1.7,Math.sin(a)*10.6); post.castShadow=true; g.add(post);
      const ban=new THREE.Mesh(new THREE.BoxGeometry(0.1,1.6,1.1),M(i%2?0x2b5fa6:0xe8e2d2,0.8));
      ban.position.set(Math.cos(a)*10.6,2.6,Math.sin(a)*10.6); ban.rotation.y=-a; g.add(ban);
    }
    // weapon rack
    const rack=new THREE.Mesh(new THREE.BoxGeometry(3,0.15,0.6),M(0x5a3a20)); rack.position.set(8,1.1,-8); g.add(rack);
    for(const [lx,lz] of [[-1.3,-8],[1.3,-8]]){ const leg=new THREE.Mesh(new THREE.BoxGeometry(0.15,1.1,0.6),M(0x5a3a20)); leg.position.set(8+lx,0.55,lz); g.add(leg); }
    for(let i=0;i<4;i++){ const sw=new THREE.Mesh(new THREE.BoxGeometry(0.08,1.6,0.08),M(0xb9c4d0,0.4));
      sw.position.set(7+i*0.7,1.6,-8); sw.rotation.z=0.15; g.add(sw); }
    this.scene.add(g); return g;
  }
  makeCave(x,z){
    const g=new THREE.Group(); g.position.set(x,0,z);
    const cliff=new THREE.Mesh(new THREE.BoxGeometry(16,14,4),M(0x5f5a52)); cliff.position.y=6; cliff.castShadow=true; g.add(cliff);
    const door=new THREE.Mesh(new THREE.BoxGeometry(3.4,4.4,0.4),M(0x2c2a26,0.9)); door.position.set(0,2.2,2.05); g.add(door);
    const runeM=new THREE.MeshBasicMaterial({ color:0x46e0a8, transparent:true, opacity:0.9 });
    const rune=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.1,8,24),runeM); rune.position.set(0,2.4,2.3); g.add(rune);
    const rune2=new THREE.Mesh(new THREE.BoxGeometry(0.15,2.6,0.05),runeM); rune2.position.set(0,2.4,2.3); g.add(rune2);
    this.floaters.push({ m:runeM, pulse:true, ph:0 });
    this.scene.add(g); this.addCollider(x,z,4.5); return g;
  }
  pine(s=1){
    const g=new THREE.Group();
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.18*s,0.26*s,1.6*s,7),M(0x5a3a20)); trunk.position.y=0.8*s; trunk.castShadow=true; g.add(trunk);
    for(let i=0;i<3;i++){ const c=new THREE.Mesh(new THREE.ConeGeometry((1.5-i*0.35)*s,1.3*s,8),M(0x2e5f3a));
      c.position.y=(1.8+i*0.9)*s; c.castShadow=true; g.add(c); }
    return g;
  }
  tree(ginkgo=false){
    const g=new THREE.Group();
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.34,2.2,7),M(0x5a3a20)); trunk.position.y=1.1; trunk.castShadow=true; g.add(trunk);
    const c=new THREE.Mesh(new THREE.SphereGeometry(1.7,8,7),M(ginkgo?0xd9a92b:0x3f7a3f)); c.position.y=3.1; c.castShadow=true; g.add(c);
    return g;
  }
  lantern(x,z,h=3){
    const g=new THREE.Group(); g.position.set(x,0,z);
    const post=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.12,h,6),M(0x3a2c1c)); post.position.y=h/2; g.add(post);
    const arm=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.09,0.09),M(0x3a2c1c)); arm.position.set(0.35,h-0.15,0); g.add(arm);
    const lampM=new THREE.MeshStandardMaterial({ color:0xff9a3c, emissive:0xff7a2a, emissiveIntensity:1.2 });
    const lamp=new THREE.Mesh(new THREE.SphereGeometry(0.32,10,10),lampM); lamp.position.set(0.7,h-0.55,0); lamp.scale.y=1.25; g.add(lamp);
    this.scene.add(g); this.lanterns.push({ lamp, lampM, x, z, h });
    return g;
  }
  herbMesh(){
    const g=new THREE.Group();
    for(let i=0;i<5;i++){
      const leaf=new THREE.Mesh(new THREE.ConeGeometry(0.09,0.7+Math.random()*0.4,5),M(0x46e0a8,0.6));
      const a=i/5*Math.PI*2; leaf.position.set(Math.cos(a)*0.15,0.35,Math.sin(a)*0.15);
      leaf.rotation.set((Math.random()-0.5)*0.6,0,(Math.random()-0.5)*0.6); g.add(leaf);
    }
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({ map:this.fx.tex, color:0x46e0a8, transparent:true, opacity:0.6, blending:THREE.AdditiveBlending, depthWrite:false }));
    glow.scale.set(1.6,1.6,1); glow.position.y=0.5; g.add(glow);
    return g;
  }
  dummyMesh(){
    const g=new THREE.Group();
    const post=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.2,1.9,8),M(0x7a5a30)); post.position.y=0.95; post.castShadow=true; g.add(post);
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,1.5,6),M(0x7a5a30)); arm.rotation.z=Math.PI/2; arm.position.y=1.45; g.add(arm);
    const head=new THREE.Mesh(new THREE.SphereGeometry(0.22,8,8),M(0xd9b98a,0.8)); head.position.y=2.0; g.add(head);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.7,0.25,10),M(0x6e6a60)); base.position.y=0.12; g.add(base);
    return g;
  }
  // ---------- sect layout ----------
  buildSect(){
    this.makeGate(0,46);
    this.makePagoda(0,-40,4,1.1);                       // library / elder hall behind
    this.makeHall(0,-28,12,8,0);                         // Elder Hall
    this.makeHall(-20,-24,9,7,0.35);                     // Alchemy Pavilion
    this.makeHall(20,-24,9,7,-0.35);                     // Disciples' Quarters
    this.makeHall(-24,26,8,6,0.5);                       // Storage / shop hut
    this.makeArena(36,6);                                // training arena (east)
    this.makeCave(-38,-34); this.makeCave(-30,-38);      // cultivation caves (NW cliff)
    // mission board
    const b=new THREE.Group(); b.position.set(9,0,14); b.rotation.y=-0.5;
    for(const sx of [-1.4,1.4]){ const leg=new THREE.Mesh(new THREE.BoxGeometry(0.22,3,0.22),M(0x5a3a20)); leg.position.set(sx,1.5,0); leg.castShadow=true; b.add(leg); }
    const board=new THREE.Mesh(new THREE.BoxGeometry(3.4,2,0.15),M(0x7a5a30)); board.position.y=2.2; board.castShadow=true; b.add(board);
    for(let i=0;i<4;i++){ const note=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.7,0.03),M(0xf3e9d2,0.9));
      note.position.set(-1.1+i*0.75,2.1+(i%2)*0.35,0.1); b.add(note); }
    this.makeRoof(4,1.4,3.8,b,1.2);
    this.scene.add(b); this.addCollider(9,14,1.6);
    // jade-slip stand (skill manuals)
    const st=new THREE.Group(); st.position.set(-9,0,12); st.rotation.y=0.5;
    const ped=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.7,1.1,8),M(0x8d887c)); ped.position.y=0.55; st.add(ped);
    const slip=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.9,0.12),
      new THREE.MeshStandardMaterial({ color:0x46e0a8, emissive:0x46e0a8, emissiveIntensity:0.5, roughness:0.3 }));
    slip.position.y=1.5; slip.rotation.z=0.2; st.add(slip);
    const halo=new THREE.Sprite(new THREE.SpriteMaterial({ map:this.fx.tex, color:0x46e0a8, transparent:true, opacity:0.5, blending:THREE.AdditiveBlending, depthWrite:false }));
    halo.scale.set(2,2,1); halo.position.y=1.5; st.add(halo);
    this.scene.add(st); this.addCollider(-9,12,1.0);
    this.floaters.push({ m:slip, spin:true, baseY:1.5, ph:0 });
    // lantern rows
    for(let i=0;i<5;i++){ this.lantern(-4,20+i*5.4); this.lantern(4,20+i*5.4); }
    for(let i=0;i<4;i++){ this.lantern(-4,-6-i*5.4); this.lantern(4,-6-i*5.4); }
    this.lantern(28,6,3); this.lantern(44,6,3); this.lantern(-20,6,3); this.lantern(-32,8,3);
    // plaza cauldron (alchemy flavor)
    const ca=new THREE.Mesh(new THREE.SphereGeometry(0.9,10,8,0,Math.PI*2,0,Math.PI*0.6),M(0x3a3f4a,0.4));
    ca.position.set(-6,0.7,-18); ca.castShadow=true; this.scene.add(ca);
    for(const [lx,lz] of [[-6.7,-18.5],[-5.3,-18.5],[-6,-17.2]]){
      const leg=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.9,6),M(0x3a3f4a,0.4)); leg.position.set(lx,0.35,lz); this.scene.add(leg); }
    this.addCollider(-6,-18,1.2);
  }
  buildNature(){
    // pine + ginkgo scatter (avoid paths/buildings)
    const spots=[[-12,-8],[12,-10],[-16,2],[16,-2],[-8,30],[10,32],[-28,-8],[28,-14],[-14,-32],[14,-34],[24,20],[-26,18],[8,-16],[-4,8],[40,-8],[-44,-16],[44,20],[-48,2],[20,34],[-20,38]];
    for(const [x,z] of spots){
      const t=Math.random()<0.3?this.tree(true):(Math.random()<0.6?this.pine(1+Math.random()*0.6):this.tree());
      t.position.set(x+(Math.random()-0.5)*2,0,z+(Math.random()-0.5)*2); t.rotation.y=Math.random()*6;
      this.scene.add(t); this.addCollider(t.position.x,t.position.z,0.7);
    }
    // rocks
    for(let i=0;i<16;i++){
      const a=Math.random()*Math.PI*2, R=20+Math.random()*32;
      const r=new THREE.Mesh(new THREE.DodecahedronGeometry(0.5+Math.random()*1.1,0),M(0x7a756a));
      r.position.set(Math.cos(a)*R,0.3,Math.sin(a)*R); r.rotation.set(Math.random()*3,Math.random()*3,0);
      r.castShadow=true; this.scene.add(r);
    }
    // herb nodes (west garden + north path)
    const herbSpots=[[-26,4],[-30,10],[-24,12],[-34,4],[-28,-4],[-16,-14],[-10,-22],[16,-30],[-38,-24],[24,26],[-36,14],[6,36]];
    for(const [x,z] of herbSpots){
      const mesh=this.herbMesh(); mesh.position.set(x,0,z); this.scene.add(mesh);
      this.herbs.push({ mesh, x, z, taken:false, timer:0 });
    }
    // training dummies in arena
    for(const [dx,dz] of [[-3,0],[0,3],[3,-1]]){
      const mesh=this.dummyMesh(); mesh.position.set(36+dx,0.5,6+dz); this.scene.add(mesh);
      this.dummies.push({ mesh, x:36+dx, z:6+dz, hp:60, maxhp:60, wob:0 });
      this.addCollider(36+dx,6+dz,0.7);
    }
  }
  // ---------- day/night ----------
  setTime(tod){
    const t=tod; // 0..1, 0=midnight
    const sunA=(t-0.25)*Math.PI*2; // sunrise .25? map: .25 dawn .5 noon
    const el=Math.sin((t)*Math.PI*2-Math.PI/2); // elevation-ish
    const day=Math.max(0,Math.sin(t*Math.PI*2)); // reuse simple: peak at .25?? -> fix below
    // Simpler: daylight factor peaks at t=0.4 (midday), zero at night
    const dl=Math.max(0,Math.sin((t-0.02)/0.62*Math.PI)); // day window ~0.02..0.64
    const dusk=Math.max(0,1-Math.abs(t-0.58)/0.07)+Math.max(0,1-Math.abs(t-0.06)/0.06);
    this.sun.position.set(Math.cos(t*Math.PI*2)*80,20+dl*70,Math.sin(t*Math.PI*2)*80);
    this.sun.intensity=0.15+dl*1.6;
    this.sun.color.setHSL(0.1,Math.min(0.7,dusk*0.6),0.6+dl*0.35);
    this.moon.intensity=(1-dl)*0.35;
    this.hemi.intensity=0.22+dl*0.6;
    const top=new THREE.Color().setHSL(0.6,0.5,0.03+dl*0.42+dusk*0.06);
    const mid=new THREE.Color().setHSL(dusk>0.4?0.05:0.58,dusk>0.4?0.6:0.35,0.08+dl*0.62);
    const bot=new THREE.Color().setHSL(dusk>0.4?0.08:0.12,0.35,0.06+dl*0.8+dusk*0.1);
    this.skyMat.uniforms.top.value.copy(top); this.skyMat.uniforms.mid.value.copy(mid); this.skyMat.uniforms.bot.value.copy(bot);
    this.scene.fog.color.copy(mid).lerp(bot,0.4);
    this.stars.material.opacity=(1-dl)*0.9;
    const night=1-dl;
    for(const L of this.lanterns){ L.lampM.emissiveIntensity=0.4+night*1.8; }
  }
  update(dt,t){
    for(const f of this.floaters){
      if(f.pulse){ f.m.opacity=0.6+0.35*Math.sin(t*2.4); }
      else if(f.spin){ f.m.rotation.y+=dt*1.2; f.m.position.y=f.baseY+Math.sin(t*2)*0.12; }
      else { f.m.position.y=f.baseY+Math.sin(t*0.5+f.ph)*f.amp; }
    }
    for(const h of this.herbs){
      if(h.taken){ h.timer-=dt; if(h.timer<=0){ h.taken=false; h.mesh.visible=true; } }
      else h.mesh.rotation.y+=dt*0.5;
    }
    for(const d of this.dummies){
      if(d.wob>0){ d.wob-=dt; d.mesh.rotation.z=Math.sin(d.wob*20)*0.18*d.wob; if(d.wob<=0) d.mesh.rotation.z=0; }
    }
  }
}
