// ===== Game state + save system =====
import { REALMS, PART1_MAX_REALM } from './config.js';
const KEY = 'cultivation_save_v1';

export function rollStats(origin){
  const s = { comp:5, wil:5, sen:5, talent:5, luk:5, con:5, cha:5 };
  for(const k in s) s[k] += Math.floor(Math.random()*4); // 5-8 base
  if(origin?.stats) for(const k in origin.stats) s[k]+=origin.stats[k];
  return s;
}
export function newGame({ name, origin, sect, root, physique, stats }){
  return {
    v:1, name, originId:origin.id, sectId:sect.id,
    root:{ type:root.id, name:root.name, mult:root.mult, elements:root.elements, color:root.color },
    physique:{ id:physique.id, name:physique.name, desc:physique.desc },
    stats, realm:0, stage:1, progress:0,
    age:12, lifespan:80, day:1, seasonIdx:0, tod:0.32,
    hp:100, maxhp:100, qi:60, maxqi:60, stam:100, maxstam:100,
    stones:60+(origin.stones||0), contrib:0, face:10, rankIdx:0,
    manuals:{}, skills:[], inv:{ herb:0, pill_low:1 }, flags:{}, quests:{}, pos:{x:0,z:26}, playtime:0,
  };
}
export const S = {
  d:null,
  get realmDef(){ return REALMS[this.d.realm]; },
  realmName(){ const r=REALMS[this.d.realm]; return `${r.name} · Stage ${this.d.stage}/9`; },
  maxed(){ return this.d.realm>=PART1_MAX_REALM && this.d.stage>=9; },
  save(){ try{ localStorage.setItem(KEY, JSON.stringify(this.d)); return true; }catch(e){ return false; } },
  load(){ try{ const raw=localStorage.getItem(KEY); if(!raw) return false; this.d=JSON.parse(raw); return true; }catch(e){ return false; } },
  has(){ return !!localStorage.getItem(KEY); },
  wipe(){ localStorage.removeItem(KEY); },
};
export function addQuest(id){ if(!S.d.quests[id]) S.d.quests[id]={ done:false }; }
export function doneQuest(id){ addQuest(id); S.d.quests[id].done=true; }
export function isQuestDone(id){ return !!S.d.quests[id]?.done; }
export const SEASONS=['🌸 Spring','☀ Summer','🍂 Autumn','❄ Winter'];
export function todName(t){
  if(t<0.05||t>=0.95) return '🌙 Midnight'; if(t<0.2) return '🌅 Dawn'; if(t<0.32) return '☀ Morning';
  if(t<0.5) return '☀ Midday'; if(t<0.62) return '🌇 Dusk'; if(t<0.75) return '🌆 Evening'; return '🌙 Night';
}
