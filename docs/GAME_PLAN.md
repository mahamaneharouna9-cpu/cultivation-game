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
