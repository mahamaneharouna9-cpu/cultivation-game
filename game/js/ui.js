// ===== UI: HUD, creation, dialogue, modals, toasts =====
import * as THREE from 'three';
import { S, SEASONS, todName, isQuestDone } from './state.js';
import { REALMS, ORIGINS, SECTS, ROOT_TYPES, ELEMENTS_BASIC, ELEMENTS_MUTANT, PHYSIQUES, MANUALS, MASTERY, SKILLS, RANKS, SURNAMES, GIVEN, TIPS, HELP_TEXT } from './config.js';
import { AudioSys } from './audio.js';
import { FLAVOR } from './npcs.js';

const $=id=>document.getElementById(id);
const QUEST_DEFS={
  meet:{ n:'First Breath', d:'Speak with Elder Yun at the Elder Hall and learn to breathe.' },
  herbs:{ n:'Roots of Power', d:'Harvest 3 Spirit Herbs from the western gardens.' },
  spar:{ n:'Prove Yourself', d:'Defeat Chen Hao in the eastern arena.' },
  stage4:{ n:'Break the Shackles', d:'Break through to Qi Condensation Stage 4.' },
  peak:{ n:'Touch the Heavens', d:'Reach Qi Condensation Stage 9 and face what lies beyond. (Part 1 peak)' },
};
function pickW(arr){ let t=arr.reduce((s,e)=>s+e.w,0), r=Math.random()*t;
  for(const e of arr){ r-=e.w; if(r<=0) return e; } return arr[0]; }

export class UI {
  constructor(ctx){ this.ctx=ctx; this.modal=null; this.dlg=null; this.dead=false; this.tipT=0; this.near=null; this.floats=[]; }
  get titleVisible(){ return !$('title-screen').classList.contains('hidden'); }
  isBusy(){ return this.modal||this.dlg||this.dead||this.titleVisible||!$('creation').classList.contains('hidden'); }

  // ---------- generic ----------
  toast(msg,cls=''){
    const t=document.createElement('div'); t.className='toast '+cls; t.innerHTML=msg;
    const box=$('toasts'); box.appendChild(t);
    while(box.children.length>5) box.firstChild.remove();
    setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .4s'; setTimeout(()=>t.remove(),400); },4200);
  }
  insight(text){ const f=$('insight-flash'); f.textContent=text; f.classList.remove('hidden');
    clearTimeout(this._insT); this._insT=setTimeout(()=>f.classList.add('hidden'),2600); }
  float(worldPos,text,cls=''){
    const v=worldPos.clone?worldPos.clone():new THREE.Vector3(worldPos.x,2,worldPos.z);
    v.y+=1; v.project(this.ctx.world.camera);
    const el=document.createElement('div'); el.className='float '+cls; el.textContent=text;
    el.style.left=((v.x*0.5+0.5)*innerWidth)+'px'; el.style.top=((-v.y*0.5+0.5)*innerHeight)+'px';
    $('floats').appendChild(el); setTimeout(()=>el.remove(),1150);
  }
  fade(mid){ const f=$('fade'); f.style.opacity='1'; setTimeout(()=>{ mid&&mid(); setTimeout(()=>f.style.opacity='0',150); },650); }

  // ---------- hotkeys ----------
  hotkey(k,player){
    AudioSys.unlock();
    if(this.titleVisible||!$('creation').classList.contains('hidden')) return;
    if(k==='Escape'||k==='ESC'){ if(this.dlg) return; this.modal?this.closeModal():this.openPause(); return; }
    if(this.dlg||this.dead) return;
    switch(k){
      case 'KeyC': case 'CULT': this.modal==='cult'?this.closeModal():this.openCultivation(); break;
      case 'Tab': this.modal==='inv'?this.closeModal():this.openInventory(); break;
      case 'KeyM': this.modal==='map'?this.closeModal():this.openMap(); break;
      case 'KeyJ': this.modal==='journal'?this.closeModal():this.openJournal(); break;
      case 'KeyG': this.modal==='family'?this.closeModal():this.openFamily(); break;
      case 'KeyH': this.modal==='help'?this.closeModal():this.openHelp(); break;
      case 'KeyR': case 'PILL': this.quickPill(); break;
      case 'KeyZ': player.meditating?this.ctx.cultivation.stopMeditate():this.ctx.cultivation.startMeditate(); break;
      case 'KeyX': this.toast('No spirit beast yet. (Taming arrives in Part 2 🦊)','jade'); break;
      case 'KeyV': player.tryLock(); this.refreshTarget(); break;
    }
  }
  quickPill(){
    if((S.d.inv.pill_low||0)>0&&S.d.hp<S.d.maxhp){ S.d.inv.pill_low--; AudioSys.drink();
      this.ctx.player.heal(Math.round(S.d.maxhp*0.6)); this.refreshHUD(); }
    else if((S.d.inv.pill_low||0)<=0) this.toast('No healing pills! Aunt Lin sells them.','bad');
  }
  // ---------- HUD ----------
  refreshHUD(){
    const d=S.d;
    $('pname').textContent=d.name;
    $('ptitle').textContent=`${RANKS[d.rankIdx]} · ${SECTS.find(s=>s.id===d.sectId).el}`;
    $('realm-line').textContent=`${REALMS[d.realm].name} · Stage ${d.stage}/9 · ${Math.floor(d.progress)}%`;
    $('life-line').textContent=`Age ${d.age} · Lifespan ${d.lifespan-d.age}y left · Face ${d.face}`;
    $('stones').innerHTML=`💎 ${d.stones} <span id="contrib">❖ ${d.contrib}</span>`;
    this.refreshHotbar();
  }
  refreshHotbar(){
    const hb=$('hotbar'); hb.innerHTML='';
    const slots=[ {k:'1',id:'fireball',icon:'🔥'}, {k:'2',id:'swordqi',icon:'🗡'}, {k:'R',id:'__pill',icon:'💊'}, {k:'4',locked:1,icon:'🔒'}, {k:'5',locked:1,icon:'🔒'}, {k:'6',locked:1,icon:'🔒'} ];
    for(const s of slots){
      const el=document.createElement('div'); el.className='slot'+(s.locked?' locked':''); el.innerHTML=`<span class="key">${s.k}</span>${s.icon}`;
      if(s.id==='__pill'){ el.innerHTML+=`<span class="nm">Pill ×${S.d.inv.pill_low||0}</span>`; el.dataset.cd='pill'; }
      else if(!s.locked){ const has=S.d.skills.includes(s.id); if(!has) el.classList.add('locked');
        el.innerHTML+=`<span class="nm">${has?SKILLS[s.id].name:'???'}</span>`; el.dataset.cd=s.id; }
      else el.innerHTML+=`<span class="nm">Part 2</span>`;
      hb.appendChild(el);
    }
  }
  updateHUD(dt){
    const d=S.d; if(!d) return;
    $('hp-fill').style.width=(100*d.hp/d.maxhp)+'%'; $('hp-text').textContent=`${Math.ceil(d.hp)}/${d.maxhp}`;
    $('qi-fill').style.width=(100*d.qi/d.maxqi)+'%'; $('qi-text').textContent=`${Math.floor(d.qi)}/${d.maxqi}`;
    $('stam-fill').style.width=(100*d.stam/d.maxstam)+'%';
    $('clock').textContent=`Day ${d.day} · ${todName(d.tod)}`;
    $('season').textContent=SEASONS[d.seasonIdx];
    // cooldown overlays
    document.querySelectorAll('#hotbar .slot').forEach(el=>{
      el.querySelector('.cd')?.remove();
      const id=el.dataset.cd; if(!id||id==='pill') return;
      const cd=this.ctx.player.cds[id];
      if(cd>0){ const o=document.createElement('div'); o.className='cd'; o.textContent=cd.toFixed(1); el.appendChild(o); }
    });
    this.refreshTarget();
    this.tipT-=dt; if(this.tipT<=0){ this.tipT=26; $('tip-line').textContent='✦ '+TIPS[Math.floor(Math.random()*TIPS.length)]; }
    // interact prompt
    this.near=null;
    if(!this.isBusy()){
      let bd=99; const p=this.ctx.player.pos;
      for(const it of this.ctx.world.interact){
        if(it.when&&!it.when()) continue;
        const dd=Math.hypot(it.x-p.x,it.z-p.z);
        if(dd<it.r&&dd<bd){ bd=dd; this.near=it; }
      }
    }
    if(this.near){ $('prompt').classList.remove('hidden'); $('prompt-text').textContent=this.near.prompt(); }
    else $('prompt').classList.add('hidden');
    $('meditate-tag').classList.toggle('hidden',!this.ctx.player.meditating);
  }
  updateMeditate(r){ $('med-rate').textContent=`+${r.toFixed(1)}%/s`; }
  refreshTarget(){
    const t=this.ctx.player?.lockTarget, bar=$('target-bar');
    if(t&&!t.dead){ bar.classList.remove('hidden'); $('target-name').textContent=`◎ ${t.name}`;
      $('target-fill').style.width=(100*Math.max(0,t.hp??t.ref.hp)/(t.maxhp??t.ref.maxhp))+'%';
    } else bar.classList.add('hidden');
  }
  showBoss(n,hp,max){ $('boss-bar').classList.remove('hidden'); this.updateBoss(n,hp,max); }
  updateBoss(n,hp,max){ $('boss-name').textContent='⚔ '+n; $('boss-fill').style.width=(100*Math.max(0,hp)/max)+'%'; }
  hideBoss(){ $('boss-bar').classList.add('hidden'); }
  tryInteract(){
    if(this.dlg){ this.advanceDlg(); return; }
    if(this.ctx.player.meditating){ this.ctx.cultivation.stopMeditate(); return; }
    if(this.near&&!this.isBusy()){ AudioSys.click(); this.near.act(); }
  }
  // ---------- dialogue ----------
  dialogue({ name, text, choices }){
    return new Promise(res=>{
      this.dlg={ res, choices };
      $('dialogue').classList.remove('hidden');
      $('dlg-name').textContent=name; $('dlg-text').innerHTML=text;
      const box=$('dlg-choices'); box.innerHTML='';
      if(choices) for(const c of choices){
        const el=document.createElement('div'); el.className='opt'; el.innerHTML=`<h4>${c.t}</h4>`;
        el.onclick=e=>{ e.stopPropagation(); AudioSys.click(); this.closeDlg(c.v); };
        box.appendChild(el);
      }
      $('dlg-hint').textContent=choices?'choose your words':'click / F to continue';
    });
  }
  advanceDlg(){ if(this.dlg&&!this.dlg.choices){ AudioSys.click(); this.closeDlg(true); } }
  closeDlg(v){ $('dialogue').classList.add('hidden'); const r=this.dlg.res; this.dlg=null; r(v); }

  // ---------- modal ----------
  openModal(id,title,html){ this.modal=id; $('modal').classList.remove('hidden');
    $('modal-title').textContent=title; $('modal-body').innerHTML=html; AudioSys.click(); }
  closeModal(){ this.modal=null; $('modal').classList.add('hidden'); }
  refreshCultivation(){ if(this.modal==='cult') this.openCultivation(); if(this.modal==='brk') this.openBreakthrough(); }
  openCultivation(){
    const d=S.d, r=REALMS[d.realm];
    const mans=Object.keys(MANUALS).map(id=>{
      const has=d.manuals[id], m=MANUALS[id];
      return `<div class="kv"><span>${has?'📜':'🔒'} ${m.name} <small style="color:var(--paper-dim)">[${m.tier} · ${m.kind}]</small></span><b>${has?MASTERY[d.manuals[id].mastery]:'—'}</b></div>`;
    }).join('');
    this.openModal('cult','☯ Cultivation Status',`
      <div class="kv"><span>Realm</span><b>${r.name} · Stage ${d.stage}/9</b></div>
      <div class="cult-bar"><div style="width:${d.progress}%"></div></div>
      <div class="kv"><span>Progress</span><b>${d.progress.toFixed(1)}% ${d.progress>=100?'⚡READY':''}</b></div>
      <div class="kv"><span>Spirit Root</span><b style="color:${d.root.color}">${d.root.name}</b></div>
      <div class="kv"><span>Elements</span><b>${d.root.elements.join(' · ')}</b></div>
      <div class="kv"><span>Physique</span><b>${d.physique.name}</b></div>
      <div class="kv"><span>Meditation rate</span><b>+${this.ctx.cultivation.rate().toFixed(1)}%/s</b></div>
      <h3 class="sec">Manuals</h3>${mans}
      <h3 class="sec">Attributes</h3>
      <div class="stat-grid">
        ${['comp:Comprehension','wil:Willpower','sen:Spiritual Sense','talent:Talent','luk:Luck','con:Constitution','cha:Charisma'].map(s=>{ const [k,n]=s.split(':'); return `<div class="kv"><span>${n}</span><b>${d.stats[k]}</b></div>`; }).join('')}
      </div>
      <div class="btn-row">
        <button class="brush-btn small" id="b-med">🧘 Meditate (Z)</button>
        <button class="brush-btn small" id="b-brk">⚡ Breakthrough</button>
        <button class="brush-btn small" id="b-sec">🌙 Seclusion (1 day, +qi)</button>
      </div>`);
    $('b-med').onclick=()=>{ this.closeModal(); this.ctx.cultivation.startMeditate(); };
    $('b-brk').onclick=()=>this.openBreakthrough();
    $('b-sec').onclick=()=>this.doSeclusion();
  }
  openBreakthrough(){
    const d=S.d;
    if(d.realm>=1&&d.stage>=9&&d.progress>=100){ this.openHeavenTeaser(); return; }
    const { reqs, bottleneck, chance }=this.ctx.cultivation.reqs();
    this.openModal('brk','⚡ Breakthrough',`
      <p>Force the next shackle: <b>${REALMS[d.realm].name} Stage ${d.stage} → ${d.stage===9?'NEXT REALM':('Stage '+(d.stage+1))}</b>
      ${bottleneck?'<br><span style="color:var(--blood)">☠ BOTTLENECK — the heavens resist. Prepare well.</span>':''}</p>
      ${reqs.map(r=>`<div class="kv"><span>${r.ok?'✅':'❌'} ${r.label}</span><b class="${r.ok?'req-ok':'req-no'}">${r.ok?'READY':'LACKING'}</b></div>`).join('')}
      <div class="kv"><span>Qi brimming</span><b class="${d.progress>=100?'req-ok':'req-no'}">${d.progress.toFixed(0)}% / 100%</b></div>
      <div class="kv"><span>Success chance</span><b>${chance}%</b></div>
      <p style="color:var(--paper-dim);font-size:12px">Failure: qi deviation — wounds and progress falls to 55%.</p>
      <div class="btn-row"><button class="brush-btn" id="b-go">🔥 ATTEMPT BREAKTHROUGH</button></div>`);
    $('b-go').onclick=()=>this.ctx.cultivation.attempt();
  }
  doSeclusion(){
    this.closeModal();
    this.fade(()=>{
      const d=S.d; d.day++; d.tod=0.3; d.progress=Math.min(100,d.progress+18);
      d.hp=d.maxhp; d.qi=d.maxqi;
      if(d.day%8===0){ d.age++; this.ctx.main.checkAge(); }
      this.toast('🌙 Seven days… no — one full day passes in seclusion. (+18% progress)','jade');
      this.refreshHUD();
    });
  }
  openInventory(){
    const d=S.d;
    const items=[ ['herb','🌿 Spirit Herb',d.inv.herb||0,'Temper meridians · sell 25💎 at the board'],
      ['pill_low','💊 Low Healing Pill',d.inv.pill_low||0,'Restore 60% HP (R or click Use)'],
      ['pill_found','🏵 Foundation Pill',d.inv.pill_found||0,'Steadies the Stage 8→9 breakthrough'] ];
    this.openModal('inv','💍 Storage Ring',`
      <div class="kv"><span>Spirit Stones</span><b>💎 ${d.stones}</b></div>
      <div class="kv"><span>Contribution</span><b>❖ ${d.contrib}</b></div>
      <h3 class="sec">Belongings</h3>
      <table class="loot">${items.map(([id,n,c,desc])=>`<tr><td><b>${n}</b> ×${c}<br><small style="color:var(--paper-dim)">${desc}</small></td>
        <td style="text-align:right">${id==='pill_low'&&c>0?'<button class="brush-btn small" id="use-pill">Use</button>':''}</td></tr>`).join('')}</table>
      <h3 class="sec">Equipment</h3>
      <div class="kv"><span>Weapon</span><b>🗡 Sect Iron Sword</b></div>
      <div class="kv"><span>Robe</span><b>${RANKS[d.rankIdx]} Robe</b></div>
      <p style="color:var(--paper-dim);font-size:12px">Artifact refining & weapon spirits arrive in Part 3.</p>`);
    $('use-pill')&&($('use-pill').onclick=()=>{ this.quickPill(); this.openInventory(); });
  }
  openMap(){
    const d=S.d;
    const px=(d.pos.x/120*100+50).toFixed(1), pz=(d.pos.z/120*100+50).toFixed(1);
    const zones=[['Elder Hall',50,30],['Library Pagoda',50,18],['Arena ➤ spar',80,55],['Herb Mountain',18,55],['Alchemy Pavilion',32,32],['Cultivation Caves',20,14],['Mountain Gate',50,88],['Mission Board',58,62],['Jade Slips',42,60],['Mirror Pond',38,68]];
    this.openModal('map','🗺 Sect Map — Azure Grounds',`
      <div style="position:relative;width:100%;height:340px;border:1px solid var(--gold);border-radius:8px;background:radial-gradient(ellipse at 50% 40%,#1d3a4f,#0b1220);overflow:hidden">
      ${zones.map(([n,x,y])=>`<div style="position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);font-size:11px;color:var(--paper-dim);text-align:center">◇<br>${n}</div>`).join('')}
      <div style="position:absolute;left:${px}%;top:${pz}%;transform:translate(-50%,-50%);font-size:20px;animation:pulse 1.6s infinite">🧍</div>
      </div><p style="color:var(--paper-dim);font-size:12px">The wilderness gate is sealed by elders. (Opens Part 2.)</p>`);
  }
  openJournal(){
    const d=S.d;
    this.openModal('journal','📜 Journal',`
      <div class="kv"><span>Motive</span><b>${{power:'Power',love:'Protection',dao:'The Dao'}[d.flags.motive]||'Unspoken'}</b></div>
      <div class="kv"><span>Journey</span><b>Day ${d.day} · Age ${d.age}</b></div>
      <h3 class="sec">Quests</h3>
      ${Object.keys(QUEST_DEFS).map(id=>{ const q=QUEST_DEFS[id], done=isQuestDone(id), active=d.quests[id];
        if(!active&&id!=='peak'&&id!=='meet') return ''; if(id==='peak'&&d.realm<1) return '';
        return `<div class="journal-q ${done?'done':''}"><h4>${done?'✔':'◇'} ${q.n}</h4><div>${q.d}</div></div>`; }).join('')}
      <h3 class="sec">Whispers</h3><p style="font-style:italic;color:var(--paper-dim)">“${FLAVOR[Math.floor(Math.random()*FLAVOR.length)]}”</p>`);
  }
  openFamily(){
    this.openModal('family','👪 Family & Lineage',`
      <p><b>Dao Companion:</b> <span style="color:var(--paper-dim)">None yet. (Romance & bonding arrive in Part 3: Dao & Blood.)</span></p>
      <p><b>Children:</b> <span style="color:var(--paper-dim)">None. Your bloodline sleeps, ${S.d.name}.</span></p>
      <p><b>Family Vault:</b> <span style="color:var(--paper-dim)">Locked — found one in Part 4.</span></p>
      <p style="color:var(--jade)">Cultivate well. A legend needs heirs.</p>`);
  }
  openShop(){
    const d=S.d;
    this.openModal('shop','⚗ Aunt Lin — Pill Pavilion',`
      <p>“Oh? A new sprout! Pills for breakthroughs, pills for bruises — all fresh from my furnace.”</p>
      <div class="kv"><span>Your stones</span><b>💎 ${d.stones}</b></div>
      <table class="loot">
      <tr><td><b>🏵 Foundation Pill</b> ×${d.inv.pill_found||0}<br><small style="color:var(--paper-dim)">Required for Stage 8→9. Steadies the soul.</small></td><td style="text-align:right"><button class="brush-btn small" id="buy-found">300 💎</button></td></tr>
      <tr><td><b>💊 Low Healing Pill</b> ×${d.inv.pill_low||0}<br><small style="color:var(--paper-dim)">Restore 60% HP.</small></td><td style="text-align:right"><button class="brush-btn small" id="buy-low">40 💎</button></td></tr>
      </table>`);
    const buy=(id,cost,nm)=>{ if(d.stones<cost){ this.toast('Not enough spirit stones!','bad'); AudioSys.fail(); return; }
      d.stones-=cost; d.inv[id]=(d.inv[id]||0)+1; AudioSys.coin(); this.toast(`Bought ${nm}!`,'jade'); this.refreshHUD(); this.openShop(); };
    $('buy-found').onclick=()=>buy('pill_found',300,'Foundation Pill');
    $('buy-low').onclick=()=>buy('pill_low',40,'Low Healing Pill');
  }
  openBoard(){
    const d=S.d, claimed=d.flags['allow'+d.day];
    const allow=d.rankIdx>=2?30:d.rankIdx>=1?15:5;
    this.openModal('board','📌 Mission Board',`
      <div class="kv"><span>Rank</span><b>${RANKS[d.rankIdx]}</b></div>
      <div class="kv"><span>Daily allowance</span><b>${claimed?'Claimed ✔':`${allow} 💎`}</b></div>
      ${claimed?'':'<div class="btn-row"><button class="brush-btn small" id="b-allow">Claim allowance</button></div>'}
      <h3 class="sec">Herb Exchange (repeatable)</h3>
      <div class="kv"><span>🌿 Spirit Herbs</span><b>×${d.inv.herb||0}</b></div>
      <div class="btn-row">
        <button class="brush-btn small" id="b-sell1">Sell 1 → 25💎</button>
        <button class="brush-btn small" id="b-turn">Turn in 3 → 80💎 +10❖</button>
      </div>
      <h3 class="sec">Rumor</h3><p style="font-style:italic;color:var(--paper-dim)">“A servant with a Heavenly Root joined last spring. The elders fought over him for three days.”</p>`);
    $('b-allow')&&($('b-allow').onclick=()=>{ d.flags['allow'+d.day]=1; d.stones+=allow; AudioSys.coin(); this.toast(`Allowance +${allow} 💎`,'jade'); this.refreshHUD(); this.openBoard(); });
    $('b-sell1').onclick=()=>{ if((d.inv.herb||0)<1){ this.toast('No herbs. The western gardens glow at dusk.','bad'); return; }
      d.inv.herb--; d.stones+=25; AudioSys.coin(); this.refreshHUD(); this.openBoard(); };
    $('b-turn').onclick=()=>{ if((d.inv.herb||0)<3){ this.toast('Need 3 herbs.','bad'); return; }
      d.inv.herb-=3; d.stones+=80; d.contrib+=10; AudioSys.quest(); this.toast('Mission complete! +80💎 +10❖','jade'); this.refreshHUD(); this.openBoard(); };
  }
  openHelp(){
    this.openModal('help','❖ How to Play',`${HELP_TEXT}
      <h3 class="sec">Gamepad</h3>
      <p>Left stick move · X attack · B heavy · A dodge · Y interact · LB/RB skills · LT block · Start pause · Back cultivation</p>
      <h3 class="sec">Your Path (Part 1)</h3>
      <p>1. Speak to <b>Elder Yun</b> (north hall). 2. <b>Meditate (Z)</b> to 100%. 3. <b>Break through (C)</b>.
      4. Harvest <b>herbs</b> west, study the <b>jade slip</b>, spar <b>Chen Hao</b> east. 5. Reach <b>Stage 9</b>. 6. Bring a <b>Foundation Pill</b> (Aunt Lin) for the final shackle.</p>`);
  }
  openPause(){
    this.openModal('pause','⏸ Paused',`
      <p>${S.d.name} · Day ${S.d.day} · ${REALMS[S.d.realm].name} ${S.d.stage}</p>
      <div class="btn-row">
        <button class="brush-btn small" id="p-res">Resume</button>
        <button class="brush-btn small" id="p-save">💾 Save</button>
        <button class="brush-btn small" id="p-help">❖ Help</button>
        <button class="brush-btn small" id="p-title">Save & Title</button>
      </div>`);
    $('p-res').onclick=()=>this.closeModal();
    $('p-save').onclick=()=>{ S.save()?this.toast('💾 Saved. The heavens remember.','jade'):this.toast('Save failed!','bad'); };
    $('p-help').onclick=()=>this.openHelp();
    $('p-title').onclick=()=>{ S.save(); location.reload(); };
  }
  openHeavenTeaser(){
    this.openModal('heaven','🌩 The Heavens Stir',`
      <p>You stand at the peak of Qi Condensation. Above, tribulation clouds gather — violet, vast, <i>aware</i>.</p>
      <p>Foundation Establishment demands a battlefield beyond these walls: bandits, spirit beasts, rival sects, the wild roads of the mortal kingdoms…</p>
      <p style="color:var(--gold2)"><b>⚔ PART 2 — Sect Life & Steel — is where your legend continues.</b></p>
      <p style="color:var(--paper-dim);font-size:12px">Your journey is saved. The mountain will wait for you.</p>
      <div class="btn-row"><button class="brush-btn small" id="h-ok">I will return.</button></div>`);
    $('h-ok').onclick=()=>this.closeModal();
  }
  // ---------- death ----------
  showDeath(text){
    if(this.dead) return; this.dead=true;
    $('death-text').textContent=text; $('death').classList.remove('hidden');
    AudioSys.fail();
  }
  hideDeath(){ this.dead=false; $('death').classList.add('hidden'); }
  // ================= CREATION =================
  startCreation(onDone){
    this._cc={ step:0, name:'', origin:null, sect:null, root:null, physique:null, stats:null };
    $('creation').classList.remove('hidden');
    this._ccDone=onDone; this.renderCC();
    $('cc-back').onclick=()=>{ if(this._cc.step>0){ this._cc.step--; this.renderCC(); } };
    $('cc-next').onclick=()=>this.ccNext();
  }
  renderCC(){
    const c=this._cc, titles=['I. Mortal Origin','II. Choose Your Sect','III. Spirit Root Awakening','IV. Name & Physique'];
    $('cc-title').textContent=titles[c.step]||'';
    const B=$('cc-body'); B.innerHTML=''; $('cc-next').disabled=false;
    $('cc-back').style.visibility=c.step===0?'hidden':'visible';
    if(c.step===0){
      $('cc-sub').textContent='Every immortal was once a hungry, dreaming child. Who were you?';
      for(const o of ORIGINS){ const el=document.createElement('div');
        el.className='opt'+(c.origin?.id===o.id?' sel':'');
        el.innerHTML=`<h4>${o.name}</h4><div class="bonus">${o.bonus}</div><p>${o.hook}</p>`;
        el.onclick=()=>{ c.origin=o; AudioSys.click(); this.renderCC(); }; B.appendChild(el); }
    } else if(c.step===1){
      $('cc-sub').textContent='Seven gates open on the mountain. Each sect forges a different soul.';
      for(const s of SECTS){ const el=document.createElement('div');
        el.className='opt'+(c.sect?.id===s.id?' sel':'');
        el.innerHTML=`<h4><span style="color:#${s.color.toString(16).padStart(6,'0')}">⬢</span> ${s.name}</h4><div class="bonus">${s.spec} · ${s.culture}</div><p>Starting manual: ${s.manual}</p>`;
        el.onclick=()=>{ c.sect=s; AudioSys.click(); this.renderCC(); }; B.appendChild(el); }
    } else if(c.step===2){
      $('cc-sub').textContent='Place your palm on the Measuring Stone…';
      if(!c.root){
        B.innerHTML=`<div class="root-reveal"><div class="root-orb">☯</div><p>The stone drinks your qi…</p></div>`;
        $('cc-next').disabled=true;
        setTimeout(()=>{
          const t=pickW(ROOT_TYPES);
          let els=['Mundane'];
          if(t.id==='mixed'){ els=[...ELEMENTS_BASIC].sort(()=>Math.random()-0.5).slice(0,2+Math.floor(Math.random()*2)); }
          else if(t.id==='dual'){ els=[...ELEMENTS_BASIC].sort(()=>Math.random()-0.5).slice(0,2); }
          else if(t.id==='single'||t.id==='heavenly'){ els=[ELEMENTS_BASIC[Math.floor(Math.random()*5)]]; }
          else if(t.id==='mutant'){ els=[ELEMENTS_MUTANT[Math.floor(Math.random()*6)]]; }
          c.root={ ...t, elements:els };
          if(t.id==='mortal') c._bonusLuck=true;
          AudioSys.breakthrough(); this.renderCC();
        },1800);
      } else {
        B.innerHTML=`<div class="root-reveal"><div style="font-size:60px">💎</div>
          <h3 style="color:${c.root.color};font-size:30px;margin:6px">${c.root.name}</h3>
          <p>${c.root.elements.join(' · ')} — cultivation ×${c.root.mult}</p><p style="color:var(--paper-dim)">${c.root.desc}</p></div>`;
      }
    } else if(c.step===3){
      if(!c.physique){ c.physique=pickW(PHYSIQUES); }
      if(!c.stats){ const { rollStats }=this._rollHack; c.stats=rollStats(c.origin);
        if(c._bonusLuck) c.stats.luk+=3; if(c.physique.id==='vajra') c.stats.con+=3; if(c.physique.id==='sword') c.stats.talent+=2; }
      if(!c.name) c.name=SURNAMES[Math.floor(Math.random()*SURNAMES.length)]+' '+GIVEN[Math.floor(Math.random()*GIVEN.length)];
      $('cc-sub').textContent='The stone has spoken. Heaven records your name.';
      B.innerHTML=`<input id="cc-name" value="${c.name}" maxlength="16">
        <div class="kv"><span>Physique</span><b>${c.physique.name}</b></div>
        <p style="color:var(--paper-dim);font-size:12px">${c.physique.desc}</p>
        <div class="stat-grid">${['comp:Comprehension','wil:Willpower','sen:Spirit Sense','talent:Talent','luk:Luck','con:Constitution','cha:Charisma'].map(s=>{ const [k,n]=s.split(':'); return `<div class="kv"><span>${n}</span><b>${c.stats[k]}</b></div>`; }).join('')}</div>
        <div class="btn-row"><button class="brush-btn small" id="cc-reroll">🎲 Reroll name</button></div>`;
      $('cc-reroll').onclick=()=>{ c.name=SURNAMES[Math.floor(Math.random()*15)]+' '+GIVEN[Math.floor(Math.random()*15)]; $('cc-name').value=c.name; };
      $('cc-next').textContent='⛰ Enter the Sect →';
    }
    if(c.step!==3) $('cc-next').textContent='Next →';
  }
  ccNext(){
    const c=this._cc; AudioSys.click();
    if(c.step===0&&!c.origin) return this.toast('Choose your origin.','bad');
    if(c.step===1&&!c.sect) return this.toast('Choose your sect.','bad');
    if(c.step===2&&!c.root) return;
    if(c.step<3){ c.step++; this.renderCC(); }
    else { c.name=($('cc-name').value||c.name).slice(0,16);
      $('creation').classList.add('hidden'); this._ccDone(c); }
  }
}
