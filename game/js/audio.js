// ===== Procedural WebAudio: pentatonic ambience + xianxia SFX =====
let ctx=null, master=null, musicGain=null, started=false, pluckBufs={};
const PENTA=[220,261.63,293.66,329.63,392,440,523.25,587.33,659.25,784]; // A minor pentatonic-ish
function ensure(){
  if(ctx) { if(ctx.state==='suspended') ctx.resume(); return true; }
  try{ ctx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return false; }
  master=ctx.createGain(); master.gain.value=0.5; master.connect(ctx.destination);
  musicGain=ctx.createGain(); musicGain.gain.value=0.16; musicGain.connect(master);
  // wind ambience: looped noise through wandering filter
  const len=ctx.sampleRate*4, buf=ctx.createBuffer(1,len,ctx.sampleRate), d=buf.getChannelData(0);
  for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
  const src=ctx.createBufferSource(); src.buffer=buf; src.loop=true;
  const f=ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=400; f.Q.value=0.6;
  const g=ctx.createGain(); g.gain.value=0.05;
  const lfo=ctx.createOscillator(); lfo.frequency.value=0.07;
  const lg=ctx.createGain(); lg.gain.value=250; lfo.connect(lg); lg.connect(f.frequency);
  src.connect(f); f.connect(g); g.connect(master); src.start(); lfo.start();
  // guzheng-ish plucks (Karplus-Strong)
  for(const fq of PENTA){
    const N=Math.round(ctx.sampleRate/fq), L=ctx.sampleRate*1.2, b=ctx.createBuffer(1,L,ctx.sampleRate), o=b.getChannelData(0);
    const line=new Float32Array(N); for(let i=0;i<N;i++) line[i]=Math.random()*2-1;
    let idx=0; for(let i=0;i<L;i++){ const cur=line[idx]; const nxt=line[(idx+1)%N]; const v=0.996*0.5*(cur+nxt); line[idx]=v; o[i]=cur; idx=(idx+1)%N; }
    pluckBufs[fq]=b;
  }
  started=true; schedulePluck(); return true;
}
function schedulePluck(){
  if(!started) return;
  const fq=PENTA[Math.floor(Math.random()*PENTA.length)];
  const s=ctx.createBufferSource(); s.buffer=pluckBufs[fq];
  const g=ctx.createGain(); g.gain.value=0.5+Math.random()*0.5;
  s.connect(g); g.connect(musicGain); s.start();
  if(Math.random()<0.3){ const s2=ctx.createBufferSource(); s2.buffer=pluckBufs[fq*2]||pluckBufs[fq];
    const g2=ctx.createGain(); g2.gain.value=0.3; s2.connect(g2); g2.connect(musicGain); s2.start(ctx.currentTime+0.35); }
  setTimeout(schedulePluck, 2600+Math.random()*5200);
}
function tone(freq,dur,type='sine',vol=0.2,slide=null,delay=0){
  if(!ctx) return; const t=ctx.currentTime+delay;
  const o=ctx.createOscillator(), g=ctx.createGain();
  o.type=type; o.frequency.setValueAtTime(freq,t);
  if(slide) o.frequency.exponentialRampToValueAtTime(slide,t+dur);
  g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.001,t+dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t+dur+0.05);
}
function noise(dur,vol=0.3,freq=2000,type='highpass',delay=0){
  if(!ctx) return; const t=ctx.currentTime+delay;
  const len=Math.ceil(ctx.sampleRate*dur), b=ctx.createBuffer(1,len,ctx.sampleRate), d=b.getChannelData(0);
  for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*(1-i/len);
  const s=ctx.createBufferSource(); s.buffer=b;
  const f=ctx.createBiquadFilter(); f.type=type; f.frequency.value=freq;
  const g=ctx.createGain(); g.gain.value=vol;
  s.connect(f); f.connect(g); g.connect(master); s.start(t);
}
export const AudioSys = {
  unlock(){ ensure(); },
  click(){ tone(660,0.08,'triangle',0.15); },
  hover(){ tone(440,0.05,'sine',0.06); },
  sword(){ noise(0.18,0.35,3500); tone(180,0.15,'sawtooth',0.08,90); },
  heavy(){ noise(0.3,0.4,1200); tone(120,0.3,'sawtooth',0.12,50); },
  hit(){ noise(0.12,0.5,700,'lowpass'); tone(150,0.12,'square',0.12,60); },
  block(){ tone(320,0.15,'square',0.15,180); noise(0.1,0.25,2500); },
  parry(){ tone(880,0.25,'triangle',0.25,1760); noise(0.2,0.2,6000); },
  dodge(){ noise(0.22,0.18,1200); },
  fireball(){ noise(0.5,0.3,900,'bandpass'); tone(200,0.5,'sawtooth',0.1,80); },
  boom(){ noise(0.6,0.5,300,'lowpass'); tone(80,0.6,'sine',0.3,30); },
  harvest(){ tone(520,0.15,'sine',0.15,780); tone(780,0.2,'sine',0.12,1040,0.08); },
  coin(){ tone(1320,0.12,'square',0.08); tone(1760,0.18,'square',0.08,null,0.07); },
  breakthrough(){ [523,659,784,1046,1318].forEach((f,i)=>tone(f,0.8,'sine',0.18,null,i*0.12)); noise(1.2,0.2,500,'lowpass'); },
  thunder(){ noise(1.5,0.6,150,'lowpass'); noise(0.8,0.4,2500,'highpass',0.05); },
  fail(){ tone(220,0.5,'sawtooth',0.15,110); },
  quest(){ [440,554,659].forEach((f,i)=>tone(f,0.4,'triangle',0.15,null,i*0.1)); },
  insight(){ tone(1046,0.6,'sine',0.12,2093); },
  step(){ noise(0.05,0.06,500,'lowpass'); },
  drink(){ tone(300,0.2,'sine',0.12,500); },
};
