# 🏔️ CULTIVATION — A 3D Isometric Xianxia Action RPG

> *You are a mortal child, one of thousands who dream of immortality.*
> Enter a sect, forge your Dao, survive its politics, ascend through 16 realms — and leave behind a bloodline.

Semi-realistic painterly Xianxia inspired by **No Mortal Space**, **Oriental Immortal**, and **Immortal Life**.

![Sect Valley Concept](docs/concepts/06-world-isometric-concept.png)

## ▶️ Play Now (Part 1: Mortal Roots — playable)

```bash
cd game
python3 -m http.server 8080
# open http://localhost:8080
```

No build step. Any static server works. `game/` is also ready for **GitHub Pages** (root: `/game`).

### What's playable in Part 1
- **Character creation** — 6 mortal origins, 7 sects, dramatic spirit-root awakening, physiques
- **3D isometric sect grounds** — pagoda, mountain gate, arena, herb mountain, caves, day/night cycle
- **Direct action controls** — WASD, dodge-dash, 3-hit combos, charged heavy, block, lock-on, 45° camera rotation + zoom
- **Real cultivation loop** — meditate → progress → bottleneck breakthroughs → Qi Sensing → Qi Condensation 1–9
- **Sect life** — Elder Yun's guidance, Rival Chen Hao spar duel, mission board, herb gathering, spirit stones
- **Full HUD** — HP/Qi/Stamina, realm, lifespan, hotbar, journal, cultivation screen, autosave

## 🎨 Concept Art (locked before modeling)

| Sheet | Content |
|---|---|
| [Protagonist](docs/concepts/01-protagonist-multiview.png) | Mortal → Outer → Inner disciple turnarounds |
| [Enemies](docs/concepts/02-enemies-multiview.png) | Bandit, demonic cultivator, corpse puppet, spider beast |
| [Spirit Beasts](docs/concepts/03-spirit-beasts-pets-multiview.png) | Crane, fox cub, tiger cub, dragon whelp |
| [Architecture](docs/concepts/04-sect-architecture-multiview.png) | Gate, pagoda, alchemy pavilion, arena, cave |
| [Powers & FX](docs/concepts/05-cultivation-powers-fx.png) | Qi auras, sword qi, fireball evolution, tribulation |
| [World](docs/concepts/06-world-isometric-concept.png) | Sect valley isometric panorama |

## 📐 Docs
- `docs/DESIGN.md` — the complete 19-part design bible (condensed)
- `docs/GAME_PLAN.md` — build order: Plan → Concepts → Assets → Code → Playtest → Push

## 🗺️ Roadmap
- **Part 1** ✅ Mortal Roots (this build)
- **Part 2** → Sect Life & Steel: 6-slot hotbar, parry, 3 enemy types, beast taming, tournament
- **Part 3** → Dao & Blood: Foundation/Core realms, alchemy, Dao Companion, children & genetics
- **Part 4** → Immortality: Nascent Soul → Supreme Immortal, Lineage Mode, sect building, endings
