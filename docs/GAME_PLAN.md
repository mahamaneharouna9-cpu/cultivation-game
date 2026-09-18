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
| `23-sect-exteriors-2.png` | Mission hall, treasure pavilion, punishment cliff, grand plaza, dome formation | Sect grounds expansion (Parts 2–3) |
| `24-secret-realms.png` | Sunken palace, sky sword isles, volcanic heart, mirror maze | Secret realm dungeons (Parts 3–4) |
| `25-dao-companions.png` | Sword fairy, alchemist, beast tamer, rogue witch, holy maiden | Romance cast (Part 3) |
| `26-children-family.png` | Infant → disciple stages, training, family robes | Bloodline system visuals (Part 3) |
| `27-arc-bosses.png` | Demonic heir, serpent king, fallen elder, heart demon lord | Story boss designs (Parts 2–4) |
| `28-tribulations-phenomena.png` | Ninefold lightning, karma fire, heaven's eye, soul chains, pill lightning, blood moon | Tribulation encounters (Parts 3–4) |
| `29-formations-talismans.png` | Gathering/sword/illusion/teleport/seal arrays + talisman set | Formation + talisman crafting (Part 3) |
| `30-mounts-flying-treasures.png` | Crane, flying sword, boat, gourd, tiger, kite glider | Mounts + flight (Parts 2–3) |
| `31-mortal-kingdoms.png` | Emperor, general, merchant, auctioneer, blacksmith, innkeeper | Kingdom NPCs + auction (Parts 2–3) |
| `32-demonic-sect.png` | Demon lord, blood elder, asura, succubus, puppeteer, defected disciple | Enemy faction (Parts 3–4) |
| `33-auction-commerce.png` | Auction hall, black market, appraisal, stalls, vault exchange | Economy spaces (Parts 2–3) |
| `34-bonding-ceremony.png` | Vow ritual, ceremony robes, dual chamber, soul resonance, bond token | Bonding system (Part 3) |
| `35-sect-war.png` | Battlefield, sky duel, siege, war banners, medic tent | Sect war arc (Part 4) |
| `36-celestial-court.png` | Celestial emperor, moon consort, general, scribe, gate warden | Immortal court cast (Part 4) |
| `37-divine-beasts.png` | Azure dragon, vermilion bird, white tiger, black tortoise, qilin | Divine beast encounters (Part 4) |
| `38-legendary-artifacts.png` | 8 famous treasures with lore | Treasure rankings (Parts 3–4) |
| `39-life-skills.png` | Fishing, cooking, farming, mining, rune carving, grooming | Life-skill minigames (Part 3) |
| `40-festival-events.png` | Lantern night, tournament, harvest feast, new year, fireworks show | Seasonal events (Parts 2–4) |
| `41-seven-sects-disciples.png` | Signature disciple of each of the 7 sects | Faction identity (Parts 1–2) |
| `42-higher-realm-architecture.png` | Heaven gate, observatory, floating palace, stele forest, rainbow bridge | Immortal World map (Part 4) |
| `43-sunken-palace-interior.png` | Coral throne, drowned library, pearl vault, tide garden, whirlpool gate | Underwater dungeon interiors (Part 3) |
| `44-wedding-feast.png` | Feast hall, tea ceremony, fireworks, gifts, sword dance | Bonding celebration event (Part 3) |
| `45-demonic-lands-map.png` | Blood marsh, bone desert, demon citadel, fallen battlefield | Demonic zone map (Parts 3–4) |
| `46-heavenly-armory.png` | Thunder armor, starfall swords, phoenix robe, frost bow, seal shield, void cloak | Endgame gear sets (Part 4) |
| `47-pet-evolutions.png` | Fox / carp / tiger / crane 3-stage lines | Pet evolution system (Part 3) |
| `48-rank-uniforms.png` | Servant → Elder uniform progression | Rank outfit models (Parts 1–2) |
| `49-night-market.png` | Food street, fortune teller, performers, trinkets, tea house | Nightlife hub (Parts 2–3) |
| `50-ancestral-dao.png` | Ancestral hall, sword stele, alchemy mural, enlightenment platform, karma bell | Dao comprehension sites (Part 3) |
| `51-final-arena.png` | Throne of Heaven arena, 3 phases + throne | Final boss arena (Part 4) |
| `52-ascension-ceremony.png` | Tribulation platform, gate opening, farewell, first step, registry | Ascension sequence (Part 4) |
| `53-council-drama.png` | Long table, accusation, blade vote, expulsion, ballot room | Sect politics scenes (Parts 2–4) |
| `54-rogue-camps.png` | Cliff camp, bounty post, fence tent, fight pit, oath fire | Outlaw hubs (Parts 2–3) |
| `55-spirit-vein-caverns.png` | Vein hall, nooks, guardians, collapsed shaft, vein heart | Cultivation hotspot dungeon (Part 3) |
| `56-alchemy-mishaps.png` | Explosion, poison cloud, pill golem, frost backfire, lucky success | Alchemy fail states (Part 3) |
| `57-tomb-raid.png` | Sealed door, trapped corridor, burial chamber, guardian, niche | Tomb dungeon (Part 3) |
| `58-skyship-combat.png` | Battleship, pirate skiff, broadside, boarding, crash | Aerial combat (Part 4) |
| `59-gate-defense.png` | Gate hold, batteries, beast charge, elder stand, repairs | Siege defense event (Part 4) |
| `60-reincarnation-lobby.png` | Ferry dock, judgment, memory well, rebirth gates, altar | NG+ reincarnation flow (Part 4) |
| `61-dao-fruit-garden.png` | Garden view, ancient tree, mirror pool, petal path, fruit shrine, meditation terrace | Dao comprehension garden (Part 3) |
| `62-ending-variants.png` | Submit, defy, sect eternal, bloodline continues | Ending cinematics (Part 4) |
| `63-training-grounds.png` | Courtyard, dummy views, sword lanes, waterfall, obstacle course, arena plan | Training spaces (Part 2) |
| `64-tournament-grounds.png` | Stadium, duel platform, waiting room, judges balcony, trophy, arena plan | Tournament venue (Part 2) |
| `65-spirit-forge.png` | Workshop, furnace views, anvil, quenching pool, assembly bench, floor plan | Weapon crafting (Part 3) |
| `66-healing-pavilion.png` | Ward, bedside, herb bench, recovery pool, healer turnaround, garden plan | Sect recovery spaces (Parts 2–3) |
| `67-beast-sanctuary.png` | Habitat, stable, aviary, fox den, incubator, feeding court | Beast care (Parts 2–3) |
| `68-spirit-farming.png` | Terraces, greenhouse, water wheel, growth stages, harvest station, field plan | Herb cultivation (Part 3) |
| `69-mountain-expedition.png` | Cliff route, rope bridge, shelter, ice cave, expedition gear, route plan | Exploration (Part 3) |
| `70-desert-caravan.png` | Oasis camp, skiff turnaround, pack beast, tent, waystation, caravan plan | Travel and trade (Part 3) |
| `71-sect-construction.png` | Exploded hall, wall kit, bridge elevations, scaffolding, storage yard, settlement plan | Sect building (Part 4) |
| `72-sect-seasons.png` | Courtyard in four seasons; gate at dawn and night | Seasonal environment studies (Parts 2–4) |
| `73-spirit-library.png` | Archive hall, shelf elevation, reading room, sealed vault, memory orb, floor plan | Archive environment (Parts 2–4) |
| `74-prison-complex.png` | Cliff gate, sealed cell, restraint ring, guard corridor, quiet court, floor plan | Sect justice (Parts 2–4) |
| `75-messenger-network.png` | Post station, dispatch room, courier turnaround, capsule, landing platform, floor plan | Sect travel and communication (Parts 2–4) |
| `76-fishing-retreat.png` | Lake pavilion, dock, spirit rod, fish habitat, hut cutaway, lake plan | Life skills (Parts 2–4) |
| `77-mushroom-depths.png` | Cavern, giant fungi, spore bridge, herbalist camp, guardian views, cavern plan | Dungeon exploration (Parts 2–4) |
| `78-volcanic-refinery.png` | Crater works, smelting hall, furnace, cooling channel, ore lift, floor plan | Crafting environment (Parts 2–4) |
| `79-frozen-observatory.png` | Summit view, tower views, telescope, star chamber, snow bridge, floor plan | Celestial study (Parts 2–4) |
| `80-storm-lighthouse.png` | Island view, tower elevations, beacon breakdown, keeper room, dock, island plan | Coastal exploration (Parts 2–4) |
| `81-dream-labyrinth.png` | Maze view, mirror corridor, floating stairs, dream gate, awakening platform, maze plan | Dream dungeon (Parts 2–4) |
| `82-world-tree-refuge.png` | Tree settlement, root entrance, canopy home, seed shrine, branch bridge, village plan | Sanctuary environment (Parts 2–4) |
| `83-spirit-kitchen.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `84-cloud-weaving.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `85-beast-sanctuary.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `86-crystal-transit.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `87-rainforest-ruins.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `88-moonwell-retreat.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `89-thunder-quarry.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `90-guardian-workshop.png` | Reception, missions, council, archive, treasury, dining | Seven-sect architecture (Parts 2–4) |
| `91-saltglass-coast.png` | Dormitory, disciple suite, elder residence, baths, infirmary, guest house | Seven-sect architecture (Parts 2–4) |
| `92-peace-summit.png` | Sword hall, meditation, alchemy, forge, formations, cultivation cave | Seven-sect architecture (Parts 2–4) |
| `83-spirit-kitchen.png` | Main hall, stove views, pantry, serving court, chef views, floor plan | Sect cooking (Parts 2–3) |
| `84-cloud-weaving.png` | Workshop, loom views, thread spools, dye pools, weaver views, floor plan | Textile crafting (Part 3) |
| `85-beast-sanctuary.png` | Valley view, hatchery, healer pavilion, keeper views, feeding station, site plan | Beast care (Parts 2–3) |
| `86-crystal-transit.png` | Station, gondola views, boarding platform, crystal engine, conductor views, route plan | Mountain transport (Parts 3–4) |
| `87-rainforest-ruins.png` | Entrance, drowned court, guardian views, stone door, root chamber, dungeon plan | Exploration dungeon (Part 3) |
| `88-moonwell-retreat.png` | Night view, well section, quiet room, moon lantern, keeper views, site plan | Cultivation retreat (Parts 3–4) |
| `89-thunder-quarry.png` | Pit view, lift views, crystal drill, sorting hall, miner views, quarry plan | Resource gathering (Part 3) |
| `90-guardian-workshop.png` | Assembly hall, guardian views, core assembly, tools, artisan views, floor plan | Construct crafting (Parts 3–4) |
| `91-saltglass-coast.png` | Coast view, cliff home cutaway, diver views, skiff views, tide cave, site plan | Coastal exploration (Part 3) |
| `92-peace-summit.png` | Pavilion, council room, envoy views, ceremonial staff, guest court, site plan | Sect diplomacy (Part 4) |
| `93-spirit-orchard.png` | Terraces, fruit tree, irrigation, harvest, gardener, site plan | Resource gathering (Parts 2–3) |
| `94-cloud-harbor.png` | Harbor, dock tower, sky boat views, boarding bridge, mooring winch, site plan | Sky travel (Part 4) |
| `95-jade-bathhouse.png` | Exterior, pool hall, private pool, heater views, attendant, floor plan | Sect recovery (Parts 2–3) |
| `96-echo-canyon.png` | Canyon, cliff shrine, rope bridge, resonance bowl, crystal cave, route plan | Exploration puzzles (Part 3) |
| `97-lotus-marsh.png` | Marsh, stilt hut, skiff views, giant lotus, boardwalk, site plan | Wetland exploration (Part 3) |
| `98-meteor-crater.png` | Crater, base camp, meteor core, sampling arm, glass cave, site plan | Rare materials (Parts 3–4) |
| `99-sword-graveyard.png` | Valley, memorial arch, ancient blades, keeper views, meditation circle, site plan | Sword trials (Part 3) |
| `100-spirit-courier.png` | Outpost, messenger turnaround, winged deer, travel gear, dispatch room, floor plan | Delivery missions (Parts 2–4) |
| `101-mirror-lake.png` | Lake, floating shrine, stone path, mirror gate, rest pavilion, site plan | Pilgrimage (Part 3) |
| `102-sect-emergency.png` | Safe courtyard, rescue worker turnaround, supply cart, healing room, bell, exit plan | Sect emergency events (Parts 2–4) |
| `103-azure-grounds-gatehouse.png` | Campus, site plan, gate elevations, gate cutaway, guard room | Azure Cloud architecture (Parts 2–4) |
| `104-azure-main-hall.png` | Exterior, cutaway, floor plan, council chamber, elder office, ancestral room | Azure Cloud architecture (Parts 2–4) |
| `105-azure-sword-academy.png` | Exterior views, cutaway, floor plan, training hall, weapon room, sparring court | Azure Cloud architecture (Parts 2–4) |
| `106-azure-library.png` | Exterior, cutaway, floor plan, archive, study room, manual vault | Azure Cloud architecture (Parts 2–4) |
| `107-azure-disciple-housing.png` | Exterior views, cutaway, floor plan, shared room, dining and kitchen, bath and laundry | Azure Cloud architecture (Parts 2–4) |
| `108-azure-elder-residence.png` | Exterior views, cutaway, floor plan, tea room, private quarters, meditation room | Azure Cloud architecture (Parts 2–4) |
| `109-azure-alchemy-infirmary.png` | Exterior, cutaway, floor plan, alchemy room, infirmary, pharmacy | Azure Cloud architecture (Parts 2–4) |
| `110-azure-workshops-treasury.png` | Exterior views, cutaway, floor plan, sword forge, repair room, treasury | Azure Cloud architecture (Parts 2–4) |
| `111-azure-mission-discipline-hall.png` | Exterior, cutaway, floor plan, mission desk, hearing room, detention room | Azure Cloud architecture (Parts 2–4) |
| `112-azure-cultivation-retreat.png` | Exterior views, cliff cutaway, floor plan, private cave, meditation hall, service room | Azure Cloud architecture (Parts 2–4) |

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

## Seven-Sect Architecture Expansion

Style requirement: xianxia East Asian fantasy throughout all seven sects. Use sweeping tiled roofs, upturned eaves, timber brackets, lattice screens, courtyards and mountain terraces. Do not substitute Western castles or cathedrals. English-only labels; no calligraphy, seal stamps or script-like decorations. Magical markings must be abstract geometry.

Batch 8 (83–92): seven campus/exterior/interior overview sheets, plus Azure Cloud public, living and training interiors. These are concept layouts, not complete construction drawings or implemented game scenes. All ten sheets visually reviewed after generation.

Remaining interior coverage is planned, not yet generated:
- Batch 9 (93–102): Crimson Phoenix public/living/training (3), Iron Mountain public/living/training (3), Jade Spirit public/living/training (3), Azure Cloud service buildings (1).
- Batch 10 (103–112): Shadow Moon public/living/training (3), Thousand Beast public/living/training (3), Heavenly Dao public/living/training (3), Crimson Phoenix service buildings (1).
- Batch 11 (113–122): service interiors for Iron Mountain, Jade Spirit, Shadow Moon, Thousand Beast and Heavenly Dao (5); gatehouse/guardhouse layouts (1), kitchens/pantries (1), sanitation/laundry/utilities (1), connected floor plans (1), architectural material and modular kit comparison (1).

Public interiors cover reception, missions, council, archive, treasury and dining. Living interiors cover disciple/elder/guest accommodation, baths and infirmary. Training interiors cover each sect's specialty, meditation and supporting crafting spaces. Service sheets cover storage, maintenance, staff and security rooms. Audit the building inventory and room connections after these batches before declaring all seven sect interiors complete.
