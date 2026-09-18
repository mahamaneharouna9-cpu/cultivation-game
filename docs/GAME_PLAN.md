# 🏔️ CULTIVATION — A 3D Isometric Xianxia Action RPG

> *"You are a mortal child, one of thousands who dream of immortality."*
> Semi-realistic painterly Xianxia world inspired by *No Mortal Space*, *Oriental Immortal*, and *Immortal Life*.

**Engine:** Web (Three.js + HTML5) — runs instantly in any browser, deployable to GitHub Pages.
**Camera:** 3D Isometric, player-follow, zoom + 45° rotation, combat tightening, cinematic pulls.
**Controls:** Full keyboard/mouse + gamepad (see design doc Part 3).

---

## 📐 Build Order (Quality Gates)

> Rule: **Plan → Multiview Concepts → Assets/Scene → Code → Playtest → Push.**
> Nothing is built before its concept sheet exists in `docs/concepts/`.

### PART 1 — Mortal Roots (this build) ✅ *in progress*
- [x] Master plan + concept sheets (character / enemies / pets / buildings / powers / world)
- [ ] Isometric sect grounds scene (gate, pagoda, training grounds, herb garden, mountains)
- [ ] Direct controls: WASD, sprint, dodge-dash, attack combo, block, lock-on
- [ ] Cultivation loop: Qi Sensing → Qi Condensation 1–9, meditate, breakthrough, bottlenecks
- [ ] Time system: day/night, aging, lifespan pressure
- [ ] NPCs: Elder (tutorial + manual), Rival (spar duel), Mission board (herb quest)
- [ ] Gathering, spirit stones, 2 starter Qi skills, training dummies
- [ ] HUD + Cultivation screen + save/autosave (localStorage)

### PART 2 — Sect Life & Steel (next)
- [ ] Full action combat: 6-slot hotbar, heavy charge, perfect parry, realm suppression
- [ ] 3 fighting enemy types (bandit, demonic cultivator, spirit beast) + HP/aggro AI
- [ ] Sect ranks: Servant → Outer → Inner, contribution points, allowance, library tiers
- [ ] Rival system, sparring tournament arc, Face system
- [ ] Jade slip manual learning + mastery levels (Beginner → Transcendence)
- [ ] Spirit beast taming: crane, fox, tiger (follow/defend/attack commands)

### PART 3 — Dao & Blood
- [ ] Foundation Establishment + Core Formation, flying swords, tribulation boss fights
- [ ] Dao comprehension system (actions grow your Dao organically)
- [ ] Alchemy (flame minigame, pill tiers), auction house, secret realm #1
- [ ] Dao Companion: bonding, dual cultivation, resonance combat abilities
- [ ] Children: genetics/inheritance, raising stages, awakening ceremony
- [ ] Inner demons, karma, qi deviation

### PART 4 — Immortality
- [ ] Nascent Soul → Tribulation Transcendence, Immortal World map
- [ ] Lineage Mode (play as heir), family vault, sect building, New Game+/Reincarnation
- [ ] Weapon spirits, formations, talismans, sect wars, endings (Submit vs Defy Heaven)

---

## 🎨 Concept Sheets → Asset Map

| Concept sheet | Covers | Built from it |
|---|---|---|
| `01-protagonist-multiview.png` | Mortal child → Outer → Inner disciple turnarounds | Procedural robed character rig, outfit palette swaps |
| `02-enemies-multiview.png` | Bandit, demonic cultivator, corpse puppet, spider beast | Enemy meshes, AI archetypes (Part 2) |
| `03-spirit-beasts-pets-multiview.png` | Crane, fox cub, tiger, dragon whelp | Pet rigs + mount system (Part 2–3) |
| `04-sect-architecture-multiview.png` | Gate, pagoda, pavilions, arena, caves | Sect grounds modular building kit |
| `05-cultivation-powers-fx.png` | Qi auras, sword qi, fireball evolution, tribulation | Particle/FX library (`effects.js`) |
| `06-world-isometric-concept.png` | Sect valley panorama, ink-wash mood | Sky, fog, lighting, terrain art direction |
| `07-sect-interiors.png` | Throne hall, library, alchemy chamber, cave, barracks | Interior maps (Parts 2–3: throne audiences, library study, pill refining) |
| `08-world-panoramas.png` | Mortal capital, beast forest, demonic ruins, immortal palace | World zones: kingdoms → ruins → Immortal World (Parts 2–4) |
| `09-protagonist-expansion.png` | Training, breakthrough, tribulation, elder robes, saber/spear variants | Outfit + weapon-variant rigs, breakthrough/tribulation cinematics |
| `10-enemies-expansion.png` | Bandit chief, rogue cultivator, demon wolf, serpent, golem, skeleton general | Wilderness/dungeon enemy roster (Parts 2–3) |
| `11-sect-hierarchy-npcs.png` | Sect Leader → Servant, 9-rank lineup | All sect NPC castes, tournaments, war councils (Parts 2–4) |
| `12-realms-vfx-expansion.png` | Aura ladder, Dao manifestation, sword flight, soul avatar, tribulations, domain, bloodline | Realm-scaled FX + systems (Parts 2–4) |
| `13-sect-interiors-2.png` | Mission hall, vault, punishment hall, bathhouse, spirit mine | Interior maps + economy spaces (Parts 2–3) |
| `14-world-panoramas-2.png` | Frozen north, flamelands, sea isles, thunder plateau | Elemental world zones (Parts 3–4) |
| `15-heroine-multiview.png` | Female hero: mortal → outer → inner turnarounds | Gender choice rig (Part 2) |
| `16-protagonist-lifestages.png` | Hero at 8 / 16 / 25 / 200 / 2000 years | Aging + ancestor visuals (Parts 3–4) |
| `17-enemies-3.png` | Stone ape, ghostface, venom toad, panther, corpse general, mosquito swarm | Dungeon/wild roster (Parts 2–3) |
| `18-peak-masters.png` | Seven Peak Masters lineup | Sect leadership cast (Parts 2–4) |
| `19-sect-staff.png` | Deacons, keeper, guard, pill boy, enforcer, chef | Service NPCs (Parts 2–3) |
| `20-spirit-beasts-2.png` | Qilin, frost wolf, thunder eagle, turtle, carp, moon rabbit | Taming roster wave 2 (Part 3) |
| `21-weapons-artifacts.png` | Swords–bows, storage ring, flying boat | Weapon/treasure models (Parts 2–3) |
| `22-pills-herbs-materials.png` | Pill ladder, herbs, ores, talismans, furnace | Alchemy + gathering visuals (Part 3) |

> Language lock: all concept sheets use **English-only labels** (re-issued 2026-09-18).

## 🗂️ Repo Layout

```
cultivation-game/
├── docs/
│   ├── DESIGN.md          # full design doc (19 parts)
│   ├── GAME_PLAN.md       # this file
│   └── concepts/          # multiview concept sheets (art lock-in before modeling)
├── game/                  # playable web build (also served via GitHub Pages)
│   ├── index.html
│   ├── css/style.css
│   └── js/ (main, config, state, world, player, combat, cultivation, npcs, ui, effects, audio)
└── README.md
```

## ▶️ Run Locally

```bash
cd game && npx serve .   # or: python3 -m http.server 8080
# open http://localhost:8080
```

## 🌐 GitHub Pages

`game/` is a static site — enable Pages on `main`, root `/game`, and the build is live.
Every part merges to `main` only after its playtest checklist passes.
