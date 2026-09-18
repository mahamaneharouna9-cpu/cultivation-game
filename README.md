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
| [Sect Interiors](docs/concepts/07-sect-interiors.png) | Throne hall, library, alchemy chamber, cave, barracks |
| [World Panoramas](docs/concepts/08-world-panoramas.png) | Mortal capital, beast forest, demonic ruins, immortal palace |
| [Protagonist II](docs/concepts/09-protagonist-expansion.png) | Training, breakthrough, tribulation, elder robes, weapon variants |
| [Enemies II](docs/concepts/10-enemies-expansion.png) | Bandit chief, rogue, demon wolf, serpent, golem, skeleton general |
| [Sect Hierarchy](docs/concepts/11-sect-hierarchy-npcs.png) | Sect Leader → Servant Disciple, full 9-rank lineup |
| [Realms & VFX II](docs/concepts/12-realms-vfx-expansion.png) | Aura ladder, Dao manifestation, soul avatar, domains, bloodline |
| [Interiors II](docs/concepts/13-sect-interiors-2.png) | Mission hall, vault, punishment hall, bathhouse, spirit mine |
| [Panoramas II](docs/concepts/14-world-panoramas-2.png) | Frozen north, flamelands, sea isles, thunder plateau |
| [Heroine](docs/concepts/15-heroine-multiview.png) | Female hero turnarounds, mortal → inner disciple |
| [Life Stages](docs/concepts/16-protagonist-lifestages.png) | Hero at 8 / 16 / 25 / 200 / 2000 years |
| [Enemies III](docs/concepts/17-enemies-3.png) | Ape, ghostface, toad, panther, corpse general, mosquitoes |
| [Peak Masters](docs/concepts/18-peak-masters.png) | The Seven Peak Masters lineup |
| [Sect Staff](docs/concepts/19-sect-staff.png) | Deacons, keeper, guard, pill boy, enforcer, chef |
| [Beasts II](docs/concepts/20-spirit-beasts-2.png) | Qilin, frost wolf, thunder eagle, turtle, carp, rabbit |
| [Weapons](docs/concepts/21-weapons-artifacts.png) | Full armory + storage ring + flying boat |
| [Alchemy](docs/concepts/22-pills-herbs-materials.png) | Pill ladder, herbs, ores, talismans, furnace |
| [Buildings II](docs/concepts/23-sect-exteriors-2.png) | Mission hall, treasure pavilion, punishment cliff, plaza, dome |
| [Secret Realms](docs/concepts/24-secret-realms.png) | Sunken palace, sky isles, volcanic heart, mirror maze |
| [Companions](docs/concepts/25-dao-companions.png) | Sword fairy, alchemist, tamer, witch, holy maiden |
| [Family](docs/concepts/26-children-family.png) | Child stages, training, family robes |
| [Bosses](docs/concepts/27-arc-bosses.png) | Demonic heir, serpent king, fallen elder, heart demon lord |
| [Tribulations](docs/concepts/28-tribulations-phenomena.png) | Lightning, karma fire, heaven's eye, soul chains, blood moon |
| [Formations](docs/concepts/29-formations-talismans.png) | Five grand arrays + five-talisman set |
| [Mounts](docs/concepts/30-mounts-flying-treasures.png) | Crane, sword, boat, gourd, tiger, kite glider |
| [Kingdoms](docs/concepts/31-mortal-kingdoms.png) | Emperor, general, merchant, auctioneer, smith, innkeeper |
| [Demonic Sect](docs/concepts/32-demonic-sect.png) | Demon lord, blood elder, asura, succubus, puppeteer, traitor |
| [Commerce](docs/concepts/33-auction-commerce.png) | Auction hall, black market, appraisal, stalls, vault |
| [Bonding](docs/concepts/34-bonding-ceremony.png) | Vow ritual, robes, dual chamber, soul resonance, token |
| [Sect War](docs/concepts/35-sect-war.png) | Battlefield, sky duel, siege, banners, medic tent |
| [Celestial Court](docs/concepts/36-celestial-court.png) | Emperor, consort, general, scribe, warden |
| [Divine Beasts](docs/concepts/37-divine-beasts.png) | Dragon, phoenix, tiger, tortoise, qilin |
| [Artifacts](docs/concepts/38-legendary-artifacts.png) | 8 famous treasures with lore |
| [Life Skills](docs/concepts/39-life-skills.png) | Fishing, cooking, farming, mining, runes, grooming |
| [Festivals](docs/concepts/40-festival-events.png) | Lanterns, tournament, feast, new year, fireworks |
| [Seven Sects](docs/concepts/41-seven-sects-disciples.png) | Signature disciple of each sect |
| [Heaven Map](docs/concepts/42-higher-realm-architecture.png) | Heaven gate, observatory, palace, steles, bridge |
| [Sunken Palace](docs/concepts/43-sunken-palace-interior.png) | Coral throne, library, vault, garden, whirlpool gate |
| [Wedding Feast](docs/concepts/44-wedding-feast.png) | Feast hall, tea rite, fireworks, gifts, sword dance |
| [Demon Lands](docs/concepts/45-demonic-lands-map.png) | Blood marsh, bone desert, citadel, fallen battlefield |
| [Heaven Armory](docs/concepts/46-heavenly-armory.png) | 6 endgame gear sets |
| [Pet Evolutions](docs/concepts/47-pet-evolutions.png) | Fox / carp / tiger / crane lines |
| [Uniforms](docs/concepts/48-rank-uniforms.png) | Servant → Elder progression |
| [Night Market](docs/concepts/49-night-market.png) | Food, fortunes, performers, trinkets, tea house |
| [Ancestors & Dao](docs/concepts/50-ancestral-dao.png) | Ancestral hall, steles, mural, platform, bell |
| [Final Arena](docs/concepts/51-final-arena.png) | Throne of Heaven, 3 phases |
| [Ascension](docs/concepts/52-ascension-ceremony.png) | Platform, gate, farewell, first step, registry |
| [Council Drama](docs/concepts/53-council-drama.png) | Table, accusation, vote, expulsion, ballot room |
| [Rogue Camps](docs/concepts/54-rogue-camps.png) | Cliff camp, bounties, fence, fight pit, oath fire |
| [Spirit Veins](docs/concepts/55-spirit-vein-caverns.png) | Vein hall, nooks, guardians, shaft, vein heart |
| [Mishaps](docs/concepts/56-alchemy-mishaps.png) | Explosion, poison, golem, frost, lucky success |
| [Tomb Raid](docs/concepts/57-tomb-raid.png) | Sealed door, traps, chamber, guardian, niche |
| [Skyships](docs/concepts/58-skyship-combat.png) | Battleship, skiff, broadside, boarding, crash |
| [Gate Defense](docs/concepts/59-gate-defense.png) | Gate hold, batteries, charge, last stand, repairs |
| [Rebirth](docs/concepts/60-reincarnation-lobby.png) | Ferry, judgment, memory well, gates, altar |
| Dao Garden | ⏳ Sheet 61 pending re-issue (English-label fix) |
| [Endings](docs/concepts/62-ending-variants.png) | Submit, defy, sect eternal, bloodline |

*All sheets use English-only labels.*

## 📐 Docs
- `docs/DESIGN.md` — the complete 19-part design bible (condensed)
- `docs/GAME_PLAN.md` — build order: Plan → Concepts → Assets → Code → Playtest → Push

## 🗺️ Roadmap
- **Part 1** ✅ Mortal Roots (this build)
- **Part 2** → Sect Life & Steel: 6-slot hotbar, parry, 3 enemy types, beast taming, tournament
- **Part 3** → Dao & Blood: Foundation/Core realms, alchemy, Dao Companion, children & genetics
- **Part 4** → Immortality: Nascent Soul → Supreme Immortal, Lineage Mode, sect building, endings
