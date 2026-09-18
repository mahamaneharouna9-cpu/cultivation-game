// ===== CULTIVATION — Static game data (Part 1) =====
export const REALMS = [
  { id:'sensing', name:'Qi Sensing',       short:'Qi Sensing',       max:150,  desc:'Feel spiritual energy for the first time.', unlock:'Basic meditation, sense spirit herbs' },
  { id:'cond',    name:'Qi Condensation',  short:'Qi Condensation',  max:150,  desc:'Gather and store qi in your meridians.', unlock:'Techniques, talismans, flying-sword dreams' },
  { id:'found',   name:'Foundation Establishment', short:'Foundation', max:300, desc:'Build the foundation of your path. [Part 2]', unlock:'Sword flight, alchemy, sect missions' },
  { id:'core',    name:'Core Formation',   short:'Core Formation',   max:500,  desc:'Condense a golden core. [Part 3]', unlock:'Core abilities, beast contracts' },
  { id:'soul',    name:'Nascent Soul',     short:'Nascent Soul',     max:1000, desc:'Birth a soul within your core. [Part 4]', unlock:'Soul arts, clones, astral projection' },
];
export const PART1_MAX_REALM = 1; // Qi Condensation

export const ORIGINS = [
  { id:'orphan',   name:'Orphan of War',     bonus:'+Willpower, +Pain Resistance', stats:{wil:3}, hook:'Your parents were slain by demonic cultivators. You cultivate so no child suffers as you did.' },
  { id:'farmer',   name:"Farmer's Child",    bonus:'+Earth Affinity, +Herb Knowledge', stats:{sen:2,luk:1}, hook:'You found a mysterious jade slip buried in the millet field. It hummed when you touched it.' },
  { id:'merchant', name:"Merchant's Child",  bonus:'+120 Spirit Stones, +Appraisal', stats:{cha:2}, stones:120, hook:'Your family trades with cultivators. You grew up weighing spirit stones before copper coins.' },
  { id:'noble',    name:"Fallen Noble's Child", bonus:'+Charisma, +Sword Talent', stats:{cha:3}, hook:'A rival clan destroyed your house. Only the sword your father hid remains.' },
  { id:'urchin',   name:'Street Urchin',     bonus:'+Agility, +Stealth', stats:{con:1,wil:1,luk:1}, hook:'You once witnessed two immortals duel above the rooftops. You have never looked down since.' },
  { id:'scholar',  name:"Scholar's Child",   bonus:'+Comprehension, +Formation Affinity', stats:{comp:3}, hook:'Your father failed the sect exam three times. His annotated classics are your inheritance.' },
];

export const SECTS = [
  { id:'azure',   name:'Azure Cloud Sect',   el:'Azure Cloud Sect',   color:0x3fa7ff, robe:0x2b5fa6, trim:0xdfe9f5, spec:'Sword cultivation',  culture:'Orthodox, honorable', manual:'Basic Cloud Sword Art' },
  { id:'phoenix', name:'Crimson Phoenix Sect', el:'Crimson Phoenix Sect', color:0xff5a3c, robe:0x8e2432, trim:0xffc46b, spec:'Fire arts, alchemy', culture:'Passionate, competitive', manual:'Phoenix Flame Sutra' },
  { id:'iron',    name:'Iron Mountain Sect', el:'Iron Mountain Sect', color:0x9aa3ad, robe:0x4a4f57, trim:0xc9a227, spec:'Body cultivation',  culture:'Disciplined, military', manual:'Iron Mountain Body Forging' },
  { id:'jade',    name:'Jade Spirit Sect',   el:'Jade Spirit Sect',   color:0x4fe0a5, robe:0x1f6e52, trim:0xe8f5e9, spec:'Formations & talismans', culture:'Scholarly, calculating', manual:'Spirit Gathering Method' },
  { id:'shadow',  name:'Shadow Moon Sect',   el:'Shadow Moon Sect',   color:0x8b7bff, robe:0x2a2547, trim:0xb9aefc, spec:'Assassination, dark arts', culture:'Secretive, pragmatic', manual:'Moonless Shadow Art' },
  { id:'beast',   name:'Thousand Beast Sect', el:'Thousand Beast Sect', color:0xd98a2b, robe:0x6b4a23, trim:0xf3e2c7, spec:'Beast taming', culture:'Wild, nature-loving', manual:'Beast Heart Communion' },
  { id:'heaven',  name:'Heavenly Dao Sect',  el:'Heavenly Dao Sect',  color:0xf5d76e, robe:0x5c5340, trim:0xf5d76e, spec:'All-rounder, strongest', culture:'Elite, arrogant', manual:'Primordial Breathing Technique' },
];

export const ROOT_TYPES = [
  { id:'mortal',   name:'Mortal Root',   mult:0.55, w:8,  desc:'Trash tier — the against-all-odds path. Slow… but Heaven loves a joke. (Hidden: +Luck, faster Dao)', color:'#8a8f98' },
  { id:'mixed',    name:'Mixed Root',    mult:1.0,  w:45, desc:'Two or three elements. Common, steady, reliable.', color:'#7fc97f' },
  { id:'dual',     name:'Dual Root',     mult:1.4,  w:25, desc:'Two elements in harmony. Above average.', color:'#4fa8ff' },
  { id:'single',   name:'Single Root',   mult:2.0,  w:15, desc:'One pure element. Rare genius.', color:'#c77dff' },
  { id:'heavenly', name:'Heavenly Root', mult:3.0,  w:5,  desc:'Supreme talent. The sect will fight over you.', color:'#ffd166' },
  { id:'mutant',   name:'Mutant Root',   mult:2.5,  w:2,  desc:'Chaos, Void, Time… unseen for a thousand years.', color:'#ff5d8f' },
];
export const ELEMENTS_BASIC = ['Metal','Wood','Water','Fire','Earth'];
export const ELEMENTS_MUTANT = ['Chaos','Void','Time','Space','Life','Death'];

export const PHYSIQUES = [
  { id:'common', name:'Common Mortal Body', w:88, desc:'Unremarkable. Most immortals started here.' },
  { id:'yang',   name:'Nine Yang Body',     w:2,  desc:'Fire/Yang arts overwhelming. Body runs hot as a furnace.' },
  { id:'yin',    name:'Frozen Yin Body',    w:2,  desc:'Ice/Yin arts overwhelming. Frost follows your steps.' },
  { id:'vajra',  name:'Diamond Vajra Body', w:2,  desc:'Body cultivation prodigy. +Constitution, tougher breakthroughs survived.' },
  { id:'void',   name:'Void Spirit Body',   w:2,  desc:'Formation/Space mastery. The world folds a little around you.' },
  { id:'sword',  name:'Sword Bone',         w:2,  desc:'Born for the sword. Sword arts learn twice as fast.' },
  { id:'poison', name:'Poison Body',        w:2,  desc:'Immune to poison. Poison arts whisper to you.' },
];

export const MANUALS = {
  breathing: { id:'breathing', name:'Cloud Breathing Method', tier:'Earth', kind:'Core', desc:'The sect foundation method. Without it, qi will not stay.', mult:1.0 },
  fireball:  { id:'fireball',  name:'Ember Fireball Art',     tier:'Earth', kind:'Combat', desc:'Hurl a searing fireball. (Skill 1)', mult:1.1 },
  swordqi:   { id:'swordqi',   name:'Falling Leaf Sword Qi',  tier:'Earth', kind:'Combat', desc:'A crescent of sword qi. (Skill 2)', mult:1.15 },
};
export const MASTERY = ['Beginner','Small Success','Large Success','Perfection','Transcendence'];

export const SKILLS = {
  fireball: { id:'fireball', name:'Ember Fireball',  key:'1', qi:18, cd:3.5, dmg:26, color:0xff7a2a, manual:'fireball', desc:'Searing fireball. Burns dummies, singes young masters.' },
  swordqi:  { id:'swordqi',  name:'Leaf Sword Qi',   key:'2', qi:22, cd:5.0, dmg:38, color:0x9fe8ff, manual:'swordqi',  desc:'Crescent sword qi. Wide, fast, merciless.' },
};

export const RANKS = ['Servant Disciple','Outer Disciple','Inner Disciple','Core Disciple','Personal Disciple','Elder'];

export const SURNAMES = ['Chen','Li','Wang','Zhang','Lin','Su','Ye','Xiao','Fang','Mo','Jiang','Shen','Luo','Han','Bai'];
export const GIVEN = ['Long','Yue','Feng','Mei','Tian','Xue','Hao','Ling','Yun','Lei','Qing','Ming','Yan','Ze','Ruo'];

export const TIPS = [
  'Meditate (Z) in quiet hours — midnight qi is denser.',
  'Heavenly Roots cultivate fast. Mortal Roots cultivate legends.',
  'Sell spirit herbs at the mission board for cultivation funds.',
  'Stage 3→4, 6→7 and 8→9 are bottlenecks. Prepare before forcing them.',
  'The rival Chen Hao spars at dawn in the arena. Face is on the line.',
  'A Foundation Pill (300 stones, Aunt Lin) steadies the final breakthrough.',
  'Q/E rotates the camera. V locks onto a foe. RMB blocks.',
  'Hold LMB to charge a heavy strike that breaks guards.',
];

export const HELP_TEXT = `
<b>WASD</b> move · <b>Shift</b> sprint · <b>Space</b> dodge-dash · <b>LMB</b> attack combo (hold = heavy) · <b>RMB</b> block ·
<b>1/2</b> skills · <b>F</b> interact · <b>Z</b> meditate · <b>C</b> cultivation · <b>Tab</b> ring · <b>M</b> map · <b>J</b> journal ·
<b>V</b> lock-on · <b>Q/E</b> rotate camera · <b>Wheel</b> zoom · <b>Esc</b> pause`.trim();
