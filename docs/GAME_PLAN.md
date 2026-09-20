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
| `113-azure-cloud-sect-architecture.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `114-crimson-phoenix-sect-architecture.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `115-iron-mountain-sect-architecture.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `116-jade-spirit-sect-architecture.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `117-shadow-moon-sect-architecture.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `118-thousand-beast-sect-architecture.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `119-heavenly-dao-sect-architecture.png` | Campus, gate views, main hall exterior and cutaway, specialty hall, residence | Seven-sect architecture (Parts 2–4) |
| `120-azure-cloud-public-interiors.png` | Reception, missions, council, archive, treasury, dining | Seven-sect architecture (Parts 2–4) |
| `121-azure-cloud-living-interiors.png` | Dormitory, disciple suite, elder residence, baths, infirmary, guest house | Seven-sect architecture (Parts 2–4) |
| `122-azure-cloud-training-interiors.png` | Sword hall, meditation, alchemy, forge, formations, cultivation cave | Seven-sect architecture (Parts 2–4) |
| `123-crimson-phoenix-public-interiors.png` | Reception, mission hall, council, archive, treasury, dining | Sect interior concepts (Parts 2–4) |
| `124-crimson-phoenix-living-interiors.png` | Disciple room, elder suite, guest room, baths, infirmary, residential layout | Sect interior concepts (Parts 2–4) |
| `125-crimson-phoenix-training-interiors.png` | Alchemy hall, fire arena, meditation, pill lab, herb room, training layout | Sect interior concepts (Parts 2–4) |
| `126-iron-mountain-public-interiors.png` | Reception, mission hall, council, archive, treasury, dining | Sect interior concepts (Parts 2–4) |
| `127-iron-mountain-living-interiors.png` | Disciple room, elder suite, guest room, baths, infirmary, residential layout | Sect interior concepts (Parts 2–4) |
| `128-iron-mountain-training-interiors.png` | Weight court, sparring hall, gravity room, forge, recovery room, training layout | Sect interior concepts (Parts 2–4) |
| `129-jade-spirit-public-interiors.png` | Reception, mission hall, council, archive, treasury, dining | Sect interior concepts (Parts 2–4) |
| `130-jade-spirit-living-interiors.png` | Disciple room, elder suite, guest room, baths, infirmary, residential layout | Sect interior concepts (Parts 2–4) |
| `131-jade-spirit-training-interiors.png` | Formation hall, talisman studio, meditation, crystal lab, ward testing, training layout | Sect interior concepts (Parts 2–4) |
| `132-azure-cloud-service-interiors.png` | Storehouse, workshop, staff room, security room, laundry, service layout | Sect interior concepts (Parts 2–4) |
| `133-shadow-moon-public-interiors.png` | Reception, mission hall, council, archive, treasury, dining | Seven-sect interior reference (Parts 2–4) |
| `134-shadow-moon-living-interiors.png` | Disciple room, elder suite, guest room, baths, infirmary, residential layout | Seven-sect interior reference (Parts 2–4) |
| `135-shadow-moon-training-interiors.png` | Stealth hall, dagger hall, meditation, shadow chamber, hidden passage, training layout | Seven-sect interior reference (Parts 2–4) |
| `136-thousand-beast-public-interiors.png` | Reception, mission hall, council, archive, treasury, dining | Seven-sect interior reference (Parts 2–4) |
| `137-thousand-beast-living-interiors.png` | Disciple room, elder suite, guest room, baths, infirmary, residential layout | Seven-sect interior reference (Parts 2–4) |
| `138-thousand-beast-training-interiors.png` | Bonding arena, hatchery, beast clinic, aviary, feed room, training layout | Seven-sect interior reference (Parts 2–4) |
| `139-heavenly-dao-public-interiors.png` | Reception, mission hall, council, archive, treasury, dining | Seven-sect interior reference (Parts 2–4) |
| `140-heavenly-dao-living-interiors.png` | Disciple room, elder suite, guest room, baths, infirmary, residential layout | Seven-sect interior reference (Parts 2–4) |
| `141-heavenly-dao-training-interiors.png` | Sword arena, meditation hall, Dao chamber, element hall, breakthrough room, training layout | Seven-sect interior reference (Parts 2–4) |
| `142-crimson-phoenix-service-interiors.png` | Storehouse, workshop, staff room, security room, laundry, service layout | Seven-sect interior reference (Parts 2–4) |
| `143-iron-mountain-service-interiors.png` | Storehouse, workshop, kitchen, guard room, laundry, cutaway | Service interiors (Parts 2–4) |
| `144-jade-spirit-service-interiors.png` | Storehouse, repair room, staff kitchen, guard room, laundry, cutaway | Sect architecture and interiors (Parts 2–4) |
| `145-shadow-moon-service-interiors.png` | Storehouse, repair room, staff kitchen, guard room, laundry, cutaway | Sect architecture and interiors (Parts 2–4) |
| `146-thousand-beast-service-interiors.png` | Storehouse, repair room, staff kitchen, guard room, laundry, cutaway | Sect architecture and interiors (Parts 2–4) |
| `147-heavenly-dao-service-interiors.png` | Storehouse, repair room, staff kitchen, guard room, laundry, cutaway | Sect architecture and interiors (Parts 2–4) |
| `148-phoenix-furnace-pavilion.png` | Exterior views, cutaway, floor plan, furnace hall, herb room, cooling room | Sect architecture and interiors (Parts 2–4) |
| `149-iron-mountain-grand-forge.png` | Exterior views, cutaway, floor plan, forge hall, assembly room, quench room | Sect architecture and interiors (Parts 2–4) |
| `150-jade-spirit-ward-pavilion.png` | Exterior views, cutaway, floor plan, test hall, crystal studio, control room | Sect architecture and interiors (Parts 2–4) |
| `151-shadow-moon-hidden-hall.png` | Exterior views, cutaway, floor plan, strategy room, disguise room, escape tunnel | Sect architecture and interiors (Parts 2–4) |
| `152-thousand-beast-sanctuary.png` | Exterior views, cutaway, floor plan, healing ward, nursery, bonding court | Sect architecture and interiors (Parts 2–4) |
| `153-heavenly-dao-harmony-hall.png` | Exterior views, cutaway, plan, meditation hall, quiet room, crystal room, gallery | Sect architecture and interiors (Parts 2–4) |
| `154-azure-cloud-gatehouse.png` | Exterior views, cutaway, plan, entry, guard room, inspection room, watch room | Sect architecture and interiors (Parts 2–4) |
| `155-crimson-phoenix-gatehouse.png` | Exterior views, cutaway, plan, entry, guard room, inspection room, watch room | Sect architecture and interiors (Parts 2–4) |
| `156-iron-mountain-gatehouse.png` | Exterior views, cutaway, plan, entry, guard room, inspection room, watch room | Sect architecture and interiors (Parts 2–4) |
| `157-jade-spirit-gatehouse.png` | Exterior views, cutaway, plan, entry, guard room, inspection room, watch room | Sect architecture and interiors (Parts 2–4) |
| `158-shadow-moon-gatehouse.png` | Exterior views, cutaway, plan, entry, guard room, inspection room, watch room | Sect architecture and interiors (Parts 2–4) |
| `159-thousand-beast-gatehouse.png` | Exterior views, cutaway, plan, entry, guard room, inspection room, watch room | Sect architecture and interiors (Parts 2–4) |
| `160-heavenly-dao-gatehouse.png` | Exterior views, cutaway, plan, entry, guard room, inspection room, watch room | Sect architecture and interiors (Parts 2–4) |
| `161-azure-cloud-disciple-residence.png` | Exterior, cutaway, plan, bedroom, study, washroom, common room, courtyard | Sect architecture and interiors (Parts 2–4) |
| `162-crimson-phoenix-disciple-residence.png` | Exterior, cutaway, plan, bedroom, study, washroom, common room, courtyard | Sect architecture and interiors (Parts 2–4) |
| `163-iron-mountain-disciple-residence.png` | Exterior, cutaway, plan, bedroom, study, washroom, common room, courtyard | Sect architecture and interiors (Parts 2–4) |
| `164-jade-spirit-disciple-residence.png` | Exterior, cutaway, plan, bedroom, study, washroom, common room, courtyard | Sect architecture and interiors (Parts 2–4) |
| `165-shadow-moon-disciple-residence.png` | Exterior views, cutaway, floor plan, bedroom, study, washroom, common room, courtyard | Sect architecture and interiors (Parts 2–4) |
| `166-thousand-beast-disciple-residence.png` | Exterior, cutaway, plan, bedroom, study, washroom, common room, courtyard | Sect architecture and interiors (Parts 2–4) |
| `167-heavenly-dao-disciple-residence.png` | Exterior, cutaway, plan, bedroom, study, washroom, common room, courtyard | Sect architecture and interiors (Parts 2–4) |
| `168-azure-cloud-dining-hall.png` | Exterior views, cutaway, plan, dining hall, kitchen, pantry, wash area, tea court | Sect architecture and interiors (Parts 2–4) |
| `169-crimson-phoenix-dining-hall.png` | Exterior views, cutaway, plan, dining hall, kitchen, pantry, wash area, tea court | Sect architecture and interiors (Parts 2–4) |
| `170-iron-mountain-dining-hall.png` | Exterior views, cutaway, floor plan, dining room, kitchen, pantry, wash area, tea court | Sect architecture and interiors (Parts 2–4) |
| `171-jade-spirit-dining-hall.png` | Exterior views, cutaway, floor plan, dining room, kitchen, pantry, wash area, tea court | Sect architecture and interiors (Parts 2–4) |
| `172-shadow-moon-dining-hall.png` | Exterior views, cutaway, floor plan, dining room, kitchen, pantry, wash area, tea court | Sect architecture and interiors (Parts 2–4) |
| `173-thousand-beast-dining-hall.png` | Exterior views, cutaway, floor plan, dining room, kitchen, pantry, wash area, tea court | Sect architecture and interiors (Parts 2–4) |
| `174-heavenly-dao-dining-hall.png` | Exterior views, cutaway, floor plan, dining room, kitchen, pantry, wash area, tea court | Sect architecture and interiors (Parts 2–4) |
| `175-azure-cloud-infirmary.png` | Exterior views, cutaway, floor plan, reception, healing ward, treatment room, herb store, recovery court | Sect architecture and interiors (Parts 2–4) |
| `176-crimson-phoenix-infirmary.png` | Exterior views, cutaway, floor plan, reception, healing ward, treatment room, herb store, recovery court | Sect architecture and interiors (Parts 2–4) |
| `177-iron-mountain-infirmary.png` | Exterior views, cutaway, floor plan, reception, healing ward, treatment room, herb store, recovery court | Sect architecture and interiors (Parts 2–4) |
| `178-jade-spirit-infirmary.png` | Exterior views, cutaway, floor plan, reception, healing ward, treatment room, herb store, recovery court | Sect architecture and interiors (Parts 2–4) |
| `179-shadow-moon-infirmary.png` | Exterior views, cutaway, floor plan, reception, healing ward, treatment room, herb store, recovery court | Sect architecture and interiors (Parts 2–4) |
| `180-thousand-beast-infirmary.png` | Exterior views, cutaway, floor plan, reception, healing ward, treatment room, herb store, recovery court | Sect architecture and interiors (Parts 2–4) |
| `181-heavenly-dao-infirmary.png` | Exterior views, cutaway, floor plan, reception, healing ward, treatment room, herb store, recovery court | Sect architecture and interiors (Parts 2–4) |
| `182-azure-cloud-archive.png` | Exterior views, cutaway, floor plan, reading hall, manual vault, curator office, restoration room, study court | Sect architecture and interiors (Parts 2–4) |
| `183-crimson-phoenix-archive.png` | Front and rear views, cutaway, floor plan, reading hall, vault, office, restoration room, study court | Sect architecture and interiors (Parts 2–4) |
| `184-iron-mountain-archive.png` | Exterior views, cutaway, floor plan, reading hall, manual vault, curator office, restoration room, study court | Sect architecture and interiors (Parts 2–4) |
| `185-jade-spirit-archive.png` | Exterior views, cutaway, floor plan, reading hall, manual vault, curator office, restoration room, study court | Sect architecture and interiors (Parts 2–4) |
| `186-shadow-moon-archive.png` | Exterior views, cutaway, floor plan, reading hall, manual vault, curator office, restoration room, study court | Sect architecture and interiors (Parts 2–4) |
| `187-thousand-beast-archive.png` | Exterior views, cutaway, floor plan, reading hall, manual vault, curator office, restoration room, study court | Sect architecture and interiors (Parts 2–4) |
| `188-heavenly-dao-archive.png` | Exterior views, cutaway, floor plan, reading hall, manual vault, curator office, restoration room, study court | Sect architecture and interiors (Parts 2–4) |
| `189-azure-cloud-council-hall.png` | Front and rear views, cutaway, floor plan, council chamber, waiting room, leader office, strategy room, tea court | Sect governance interiors (Parts 2–4) |
| `190-crimson-phoenix-council-hall.png` | Front and rear views, cutaway, floor plan, council chamber, waiting room, leader office, strategy room, tea court | Sect governance interiors (Parts 2–4) |
| `191-iron-mountain-council-hall.png` | Front and rear views, cutaway, floor plan, council chamber, waiting room, leader office, strategy room, tea court | Sect governance interiors (Parts 2–4) |
| `192-jade-spirit-council-hall.png` | Front and rear views, cutaway, floor plan, council chamber, waiting room, leader office, strategy room, tea court | Sect governance interiors (Parts 2–4) |
| `193-shadow-moon-council-hall.png` | Front and rear views, cutaway, floor plan, council chamber, waiting room, leader office, strategy room, tea court | Sect governance interiors (Parts 2–4) |
| `194-thousand-beast-council-hall.png` | Front and rear views, cutaway, floor plan, council, waiting room, office, strategy room, tea court | Sect architecture and interiors (Parts 2–4) |
| `195-heavenly-dao-council-hall.png` | Front and rear views, cutaway, floor plan, council chamber, waiting room, leader office, strategy room, tea court | Sect architecture and interiors (Parts 2–4) |
| `196-azure-cloud-elder-residence.png` | Front and rear views, cutaway, floor plan, reception, bedchamber, meditation room, bathing room, tea garden | Sect architecture and interiors (Parts 2–4) |
| `197-crimson-phoenix-elder-residence.png` | Front and rear views, cutaway, floor plan, reception, bedchamber, meditation room, bathing room, tea garden | Sect architecture and interiors (Parts 2–4) |
| `198-iron-mountain-elder-residence.png` | Front and rear views, cutaway, floor plan, reception, bedchamber, meditation room, bathing room, tea garden | Sect architecture and interiors (Parts 2–4) |
| `199-jade-spirit-elder-residence.png` | Front and rear views, cutaway, floor plan, reception, bedchamber, meditation room, bathing room, tea garden | Sect architecture and interiors (Parts 2–4) |
| `200-shadow-moon-elder-residence.png` | Front and rear views, cutaway, floor plan, reception, bedchamber, meditation room, bathing room, tea garden | Sect architecture and interiors (Parts 2–4) |
| `201-thousand-beast-elder-residence.png` | Front and rear views, cutaway, floor plan, reception, bedchamber, meditation room, bathing room, tea garden | Sect architecture and interiors (Parts 2–4) |
| `202-heavenly-dao-elder-residence.png` | Front and rear views, cutaway, floor plan, reception, bedchamber, meditation room, bathing room, tea garden | Sect architecture and interiors (Parts 2–4) |
| `203-azure-cloud-guest-residence.png` | Front and rear views, furnished cutaway, floor plan, reception, bedroom, bath, tea lounge, courtyard | Sect architecture (Parts 2–4) |
| `204-crimson-phoenix-guest-residence.png` | Front and rear views, furnished cutaway, floor plan, reception, bedroom, bath, tea lounge, courtyard | Seven-sect architecture and interiors (Parts 2–4) |
| `205-iron-mountain-guest-residence.png` | Front and rear views, furnished cutaway, floor plan, reception, bedroom, bath, tea lounge, courtyard | Sect architecture (Parts 2–4) |
| `206-jade-spirit-guest-residence.png` | Front and rear views, furnished cutaway, floor plan, reception, bedroom, bath, tea lounge, courtyard | Sect architecture (Parts 2–4) |
| `207-shadow-moon-guest-residence.png` | Front and rear views, furnished cutaway, floor plan, reception, bedroom, bath, tea lounge, courtyard | Sect architecture (Parts 2–4) |
| `208-thousand-beast-guest-residence.png` | Front and rear views, furnished cutaway, floor plan, reception, bedroom, bath, tea lounge, courtyard | Sect architecture (Parts 2–4) |
| `209-heavenly-dao-guest-residence.png` | Front and rear views, furnished cutaway, floor plan, reception, bedroom, bath, tea lounge, courtyard | Sect architecture (Parts 2–4) |
| `210-azure-cloud-utility-building.png` | Front and rear views, furnished cutaway, floor plan, wash room, drying room, linen store, staff room, service court | Seven-sect architecture and interiors (Parts 2–4) |
| `211-crimson-phoenix-utility-building.png` | Front and rear views, furnished cutaway, floor plan, wash room, drying room, linen store, staff room, service court | Sect architecture (Parts 2–4) |
| `212-iron-mountain-utility-building.png` | Front and rear views, furnished cutaway, floor plan, wash room, drying room, linen store, staff room, service court | Seven-sect architecture and interiors (Parts 2–4) |
| `213-jade-spirit-utility-building.png` | Front and rear views, furnished cutaway, floor plan, wash room, drying room, linen store, staff room, service court | Seven-sect architecture and interiors (Parts 2–4) |
| `214-shadow-moon-utility-building.png` | Front and rear views, furnished cutaway, floor plan, wash room, drying room, linen store, staff room, service court | Seven-sect architecture and interiors (Parts 2–4) |
| `215-thousand-beast-utility-building.png` | Front and rear views, furnished cutaway, floor plan, wash room, drying room, linen store, staff room, service court | Seven-sect architecture and interiors (Parts 2–4) |
| `216-heavenly-dao-utility-building.png` | Front and rear views, furnished cutaway, floor plan, wash room, drying room, linen store, staff room, service court | Seven-sect architecture and interiors (Parts 2–4) |
| `217-azure-cloud-kitchen-dining.png` | Front and rear views, furnished cutaway, floor plan, kitchen, dining hall, pantry, tea room, delivery court | Seven-sect architecture and interiors (Parts 2–4) |
| `218-crimson-phoenix-kitchen-dining.png` | Front and rear views, furnished cutaway, floor plan, kitchen, dining hall, pantry, tea room, delivery court | Seven-sect architecture and interiors (Parts 2–4) |
| `219-iron-mountain-kitchen-dining.png` | Front and rear views, furnished cutaway, floor plan, kitchen, dining hall, pantry, tea room, delivery court | Seven-sect architecture and interiors (Parts 2–4) |
| `220-jade-spirit-kitchen-dining.png` | Front and rear views, furnished cutaway, floor plan, kitchen, dining hall, pantry, tea room, delivery court | Sect interiors (Parts 2–4) |
| `221-shadow-moon-kitchen-dining.png` | Front and rear views, furnished cutaway, floor plan, kitchen, dining hall, pantry, tea room, delivery court | Sect interiors (Parts 2–4) |
| `222-thousand-beast-kitchen-dining.png` | Front and rear views, furnished cutaway, floor plan, kitchen, dining hall, pantry, tea room, delivery court | Sect interiors (Parts 2–4) |
| `223-heavenly-dao-kitchen-dining.png` | Front and rear views, furnished cutaway, floor plan, kitchen, dining hall, pantry, tea room, delivery court | Sect interiors (Parts 2–4) |
| `224-azure-cloud-treasury.png` | Exterior views, furnished cutaway, floor plan, reception, stone vault, artifact chamber, inspection room, guard room | Sect interiors (Parts 2–4) |
| `225-crimson-phoenix-treasury.png` | Exterior views, furnished cutaway, floor plan, reception, stone vault, artifact chamber, inspection room, guard room | Sect interiors (Parts 2–4) |
| `226-iron-mountain-treasury.png` | Exterior views, furnished cutaway, floor plan, reception, stone vault, artifact chamber, inspection room, guard room | Sect interiors (Parts 2–4) |
| `227-jade-spirit-treasury.png` | Exterior views, furnished cutaway, floor plan, reception, stone vault, artifact chamber, inspection room, guard room | Sect interiors (Parts 2–4) |
| `228-shadow-moon-treasury.png` | Exterior views, furnished cutaway, floor plan, reception, stone vault, artifact chamber, inspection room, guard room | Sect interiors (Parts 2–4) |
| `229-thousand-beast-treasury.png` | Exterior views, furnished cutaway, floor plan, reception, stone vault, artifact chamber, inspection room, guard room | Sect interiors (Parts 2–4) |
| `230-heavenly-dao-treasury.png` | Exterior views, furnished cutaway, floor plan, reception, stone vault, artifact chamber, inspection room, guard room | Sect interiors (Parts 2–4) |
| `231-azure-cloud-mission-hall.png` | Exterior views, furnished cutaway, floor plan, reception, briefing room, arbitration, reward store, waiting court | Sect interiors (Parts 2–4) |
| `232-crimson-phoenix-mission-hall.png` | Exterior views, furnished cutaway, floor plan, reception, briefing room, arbitration, reward store, waiting court | Sect interiors (Parts 2–4) |
| `233-iron-mountain-mission-hall.png` | Exterior views, furnished cutaway, floor plan, reception, briefing room, arbitration, reward store, waiting court | Sect interiors (Parts 2–4) |
| `234-jade-spirit-mission-hall.png` | Exterior views, furnished cutaway, floor plan, reception, briefing room, arbitration, reward store, waiting court | Sect interiors (Parts 2–4) |
| `235-shadow-moon-mission-hall.png` | Exterior views, furnished cutaway, floor plan, reception, briefing room, arbitration, reward store, waiting court | Sect interiors (Parts 2–4) |
| `236-thousand-beast-mission-hall.png` | Exterior views, furnished cutaway, floor plan, reception, briefing room, arbitration, reward store, waiting court | Sect interiors (Parts 2–4) |
| `237-heavenly-dao-mission-hall.png` | Exterior views, furnished cutaway, floor plan, reception, briefing room, arbitration, reward store, waiting court | Sect interiors (Parts 2–4) |
| `238-azure-cloud-detention-hall.png` | Exterior views, furnished cutaway, floor plan, intake, guard room, holding room, visit room, exercise court | Sect interiors (Parts 2–4) |
| `239-crimson-phoenix-detention-hall.png` | Exterior views, furnished cutaway, conceptual floor plan, intake, guard room, holding room, visit room, exercise court | Sect interiors (Parts 2–4) |
| `240-iron-mountain-detention-hall.png` | Exterior views, furnished cutaway, floor plan, intake, guard room, holding room, visit room, exercise court | Sect interiors (Parts 2–4) |
| `241-jade-spirit-detention-hall.png` | Exterior views, furnished cutaway, floor plan, intake, guard room, holding room, visit room, exercise court | Sect interiors (Parts 2–4) |
| `242-shadow-moon-detention-hall.png` | Exterior views, furnished cutaway, floor plan, intake, guard room, holding room, visit room, exercise court | Sect interiors (Parts 2–4) |
| `243-thousand-beast-detention-hall.png` | Exterior views, furnished cutaway, floor plan, intake, guard room, holding room, visit room, exercise court | Sect interiors (Parts 2–4) |
| `244-heavenly-dao-detention-hall.png` | Exterior views, furnished cutaway, conceptual floor plan, intake, guard room, holding room, visit room, exercise court | Sect interiors (Parts 2–4) |
| `245-azure-cloud-ancestral-hall.png` | Exterior views, furnished cutaway, floor plan, ancestor chamber, relic room, offering room, preparation room, memorial garden | Sect interiors (Parts 2–4) |
| `246-crimson-phoenix-ancestral-hall.png` | Exterior views, furnished cutaway, conceptual floor plan, ancestor chamber, relic room, offering room, preparation room, memorial garden | Sect interiors (Parts 2–4) |
| `247-iron-mountain-ancestral-hall.png` | Exterior views, furnished cutaway, conceptual floor plan, ancestor chamber, relic room, offering room, preparation room, memorial garden | Sect interiors (Parts 2–4) |
| `248-jade-spirit-ancestral-hall.png` | Exterior views, furnished cutaway, conceptual floor plan, ancestor chamber, relic room, offering room, preparation room, memorial garden | Sect interiors (Parts 2–4) |
| `249-shadow-moon-ancestral-hall.png` | Exterior views, furnished cutaway, conceptual floor plan, ancestor chamber, relic room, offering room, preparation room, memorial garden | Sect interiors (Parts 2–4) |
| `250-thousand-beast-ancestral-hall.png` | Exterior views, furnished cutaway, conceptual floor plan, ancestor chamber, relic room, offering room, preparation room, memorial garden | Sect interiors (Parts 2–4) |
| `251-heavenly-dao-ancestral-hall.png` | Exterior views, furnished cutaway, conceptual floor plan, ancestor chamber, relic room, offering room, preparation room, memorial garden | Sect interiors (Parts 2–4) |
| `252-azure-cloud-cultivation-retreat.png` | Exterior views, furnished cutaway, conceptual floor plan, meditation chamber, breathing room, rest room, bathing room, tea garden | Sect interiors (Parts 2–4) |
| `253-crimson-phoenix-cultivation-retreat.png` | Exterior views, furnished cutaway, conceptual floor plan, meditation chamber, breathing room, rest room, bathing room, tea garden | Sect interiors (Parts 2–4) |
| `254-iron-mountain-cultivation-retreat.png` | Exterior views, furnished cutaway, conceptual floor plan, meditation chamber, breathing room, rest room, bathing room, tea garden | Sect interiors (Parts 2–4) |
| `255-jade-spirit-cultivation-retreat.png` | Exterior views, furnished cutaway, conceptual floor plan, meditation chamber, breathing room, rest room, bathing room, tea garden | Sect interiors (Parts 2–4) |
| `256-shadow-moon-cultivation-retreat.png` | Exterior views, furnished cutaway, conceptual floor plan, meditation chamber, breathing room, rest room, bathing room, tea garden | Sect interiors (Parts 2–4) |
| `257-thousand-beast-cultivation-retreat.png` | Exterior views, furnished cutaway, conceptual floor plan, meditation chamber, breathing room, rest room, bathing room, tea garden | Sect interiors (Parts 2–4) |
| `258-heavenly-dao-cultivation-retreat.png` | Exterior views, furnished cutaway, conceptual floor plan, meditation chamber, breathing room, rest room, bathing room, tea garden | Sect interiors (Parts 2–4) |
| `259-azure-cloud-servant-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `260-azure-cloud-outer-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `261-azure-cloud-inner-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `262-azure-cloud-core-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `263-azure-cloud-personal-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `264-azure-cloud-elder.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `265-azure-cloud-peak-master.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `266-azure-cloud-grand-elder.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `267-azure-cloud-sect-master.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `268-crimson-phoenix-servant-disciple.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `269-crimson-phoenix-outer-disciple.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `270-crimson-phoenix-inner-disciple.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `271-crimson-phoenix-core-disciple.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `272-crimson-phoenix-personal-disciple.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `273-crimson-phoenix-elder.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `274-crimson-phoenix-peak-master.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `275-crimson-phoenix-grand-elder.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `276-crimson-phoenix-sect-master.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `277-iron-mountain-servant-disciple.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC hierarchy (Parts 2–4) |
| `278-iron-mountain-outer-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `279-iron-mountain-inner-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `280-iron-mountain-core-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `281-iron-mountain-personal-disciple.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `282-iron-mountain-elder.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `283-iron-mountain-peak-master.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `284-iron-mountain-grand-elder.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `285-iron-mountain-sect-master.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `286-jade-spirit-servant-disciple.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `287-jade-spirit-outer-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `288-jade-spirit-inner-disciple.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `289-jade-spirit-core-disciple.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `290-jade-spirit-personal-disciple.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `291-jade-spirit-elder.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `292-jade-spirit-peak-master.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `293-jade-spirit-grand-elder.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `294-jade-spirit-sect-master.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `295-shadow-moon-servant-disciple.png` | Front, side, back, face, clothing and equipment details | Sect NPC hierarchy (Parts 2–4) |
| `296-shadow-moon-outer-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `297-shadow-moon-inner-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `298-shadow-moon-core-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `299-shadow-moon-personal-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `300-shadow-moon-elder.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `301-shadow-moon-peak-master.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `302-shadow-moon-grand-elder.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `303-shadow-moon-sect-master.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `304-thousand-beast-servant-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `305-thousand-beast-outer-disciple.png` | Front, side, back, face, clothing and equipment details | Seven-sect NPC hierarchy (Parts 2–4) |
| `306-thousand-beast-inner-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `307-thousand-beast-core-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `308-thousand-beast-personal-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `309-thousand-beast-elder.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `310-thousand-beast-peak-master.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `311-thousand-beast-grand-elder.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `312-thousand-beast-sect-master.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `313-heavenly-dao-servant-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `314-heavenly-dao-outer-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `315-heavenly-dao-inner-disciple.png` | Front, side, back, face, clothing and equipment | Sect NPC hierarchy (Parts 2–4) |
| `316-heavenly-dao-core-disciple.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `317-heavenly-dao-personal-disciple.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `318-heavenly-dao-elder.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `319-heavenly-dao-peak-master.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `320-heavenly-dao-grand-elder.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `321-heavenly-dao-sect-master.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `322-azure-cloud-deacon.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `323-azure-cloud-guard.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `324-azure-cloud-archivist.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `325-azure-cloud-healer.png` | Front, side, back, face, clothing and equipment studies | Seven-sect NPC concepts (Parts 2–4) |
| `326-azure-cloud-artisan.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `327-azure-cloud-kitchen-staff.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `328-crimson-phoenix-deacon.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `329-crimson-phoenix-guard.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `330-crimson-phoenix-archivist.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `331-crimson-phoenix-healer.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `332-crimson-phoenix-artisan.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `333-crimson-phoenix-kitchen-staff.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `334-iron-mountain-deacon.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |
| `335-iron-mountain-guard.png` | Front, side, back, face, clothing and equipment | Sect support NPC concepts (Parts 2–4) |

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

Batch 11 (113–122): seven campus/exterior/interior overview sheets, plus Azure Cloud public, living and training interiors. These are concept layouts, not complete construction drawings or implemented game scenes. All ten sheets visually reviewed after generation.

Batch 12 (123–132) complete: Crimson Phoenix, Iron Mountain and Jade Spirit public/living/training interiors, plus Azure Cloud service interiors. All ten sheets visually reviewed. Views include furnished room perspectives, cutaways and conceptual wing layouts; these are not validated architectural floor plans.

Remaining interior coverage is planned, not yet generated:
- Batch 13 (133–142): Shadow Moon public/living/training (3), Thousand Beast public/living/training (3), Heavenly Dao public/living/training (3), Crimson Phoenix service buildings (1).
- Batch 14 (143–152): service interiors for Iron Mountain, Jade Spirit, Shadow Moon, Thousand Beast and Heavenly Dao (5); gatehouse/guardhouse layouts (1), kitchens/pantries (1), sanitation/laundry/utilities (1), connected floor plans (1), architectural material and modular kit comparison (1).

Public interiors cover reception, missions, council, archive, treasury and dining. Living interiors cover disciple/elder/guest accommodation, baths and infirmary. Training interiors cover each sect's specialty, meditation and supporting crafting spaces. Service sheets cover storage, maintenance, staff and security rooms. Audit the building inventory and room connections after these batches before declaring all seven sect interiors complete.

### Seven-sect architecture direction and remaining work

All seven main sects use xianxia East Asian fantasy architecture: sweeping tiled eaves, timber bracket systems, lattice screens, courtyards and mountain terraces. Labels are English only; no calligraphy, seals or script-like decorative marks.

Sheets 113–142 cover all seven sect exterior overviews and public, living and training interior categories, plus Azure Cloud and Crimson Phoenix services. Sheets 144–147 add four service sets. Sheet 143 remains pending visual correction. Sheets 148–152 deepen five specialty buildings with exterior views, cutaways, floor plans and room views. These are concept references, not finalized construction plans or implemented game interiors.

Next batch: repair 143 first, then continue detailed room-by-room building coverage, including Heavenly Dao specialty halls and remaining gatehouses, residences, archives and utility spaces. Do not treat category overview sheets as exhaustive coverage of every building.

### Batch 15 review and next coverage

Ten generations attempted: sheet 143 retry rejected for a script-like wall plaque; nine sheets 153–161 accepted after visual review. Seven sect gatehouses now have detailed exterior and interior concept references. Heavenly Dao Harmony Hall and Azure Cloud disciple residence deepen specialty and housing coverage. Floor plans and cutaways are illustrative, not validated matching construction drawings.

Next batch: repair 143 with no wall plaques or decorative emblems; six other sect disciple residences; Azure Cloud archive, kitchen/pantry and sanitation/utility building (ten sheets total). Later batches must cover sect-specific archives, kitchens, utilities, elder/guest residences and audit room connections before complete interiors can be claimed.

### Latest sect interior batch — sheets 165, 170–178

Supersedes the older next-batch notes above. Corrected the two pending signage sheets (165, 170), completed all seven dining halls, and added the first four infirmaries. All ten images were visually reviewed. See `SECT_ARCHITECTURE.md` for current coverage and the next ten-sheet plan. Complete building coverage remains in progress; generated floor plans require spatial reconciliation before modeling.

### Latest sect interior batch — sheets 179–188

Supersedes earlier next-batch notes. Ten generations visually reviewed; five accepted (181, 182, 185, 187, 188), five withheld for script-like decorations (179, 180, 183, 184, 186). Xianxia East Asian architecture retained throughout. Repair the five pending sheets before completing this batch. See `SECT_ARCHITECTURE.md` for the current coverage matrix and next ten-generation plan. Complete interior coverage and spatial validation remain unfinished.

### Next sect architecture batch

Continue Xianxia / East Asian fantasy architecture: sweeping tiled roofs, timber brackets, lattice screens and courtyards. English labels only; no script-like decorations. Regenerate sheet 183 without any entrance plaque. Next add Thousand Beast and Heavenly Dao council halls to complete all seven, then continue detailed building interiors. Sheets are visual concepts, not construction-accurate plans; reconcile room layouts during modeling.

### Latest architecture review — sheets 183 and 194–202

Supersedes earlier next-batch notes. Nine of ten generations accepted after visual review. Archive 183 corrected; council hall 195 added; elder residences 196–202 cover all seven sects. Council hall 194 withheld for script-like wall decorations and needs regeneration. See SECT_ARCHITECTURE.md for updated coverage and the next ten-generation plan. Complete interiors and spatial validation remain in progress.


### Latest sect interior batch — corrections 221/224/228 and sheets 230–236

Supersedes older next-batch notes. Ten generations reviewed: seven accepted, three withheld (231–233) for script-like entrance decorations. All seven detailed kitchen/dining and treasury sheets are now present. Three mission/arbitration halls accepted; four remain pending generation or correction. Continue per SECT_ARCHITECTURE.md. NPC hierarchy phase remains queued until all interior coverage is completed and audited. Floor plans remain illustrative rather than construction-validated.


### Latest sect interior batch — mission corrections and detention halls

Supersedes older next-batch notes. Nine of ten generations accepted after visual review: 231–233, 237–238, 240–243. All seven mission/arbitration halls now have detailed concepts. Detention hall 239 requires removal of script-like entrance markings; Heavenly Dao detention hall is next. See SECT_ARCHITECTURE.md for the current coverage matrix and next ten-sheet plan. Interior coverage remains in progress; floor plans and cutaways are illustrative and require spatial reconciliation before modeling. NPC hierarchy phase has not started.


### Latest sect interior batch — detention completion, ancestral halls and retreat

Supersedes older next-batch notes. Six of ten generations accepted after visual review: 239, 244, 246–248, 252. Detention concepts cover all seven sects. Three ancestral halls and Azure Cloud retreat accepted; four ancestral halls (245, 249–251) withheld for script-like decorations. Next: those four corrections plus six remaining retreats. See SECT_ARCHITECTURE.md for the current matrix. Audit all interior functions before starting NPC hierarchies. Plans remain illustrative, not dimensionally validated.


### Latest sect interior batch — retreat coverage and ancestral corrections

Nine of ten generations accepted after visual review: 249–251, 253–258. All seven retreats are present. Azure Cloud ancestral hall 245 still contains script-like framed decorations and remains withheld. Preliminary ten-category inventory audit recorded in SECT_ARCHITECTURE.md; not final acceptance or dimensional validation. Correct 245 and finish audit before NPC phase. Next character scope, only after acceptance: nine Azure Cloud rank turnarounds, then other sects, in batches of ten.


### Architecture handoff and first full NPC rank set

Sheet 245 correction passed visual review. Planned concept-reference coverage accepted after checking the ten functional categories and confirming sheets 113–258 have no missing or duplicate numbers. Shared crafting spaces retain survey/specialist references; spatial modeling validation remains outstanding. NPC phase started only after this handoff. Azure Cloud ranks 259–267 generated and visually reviewed: nine accepted sheets with front/side/back views, face, clothing and equipment. See NPC_HIERARCHY.md for continuation.


### NPC hierarchy batch — Crimson Phoenix and Iron Mountain starter

268–277 generated and individually visually reviewed; all ten accepted. Crimson Phoenix now has all nine rank references. Iron Mountain Servant Disciple is accepted. Total rank coverage: 19/63. Next: eight remaining Iron Mountain ranks and two Jade Spirit starter ranks. See NPC_HIERARCHY.md for coverage and production limitations.


### Latest NPC batch — 278–287

Eight accepted after visual review. Sheet 281 generation failed (sandbox timeout, no image); sheet 286 withheld for script-like embroidery. Coverage is 27/63 rank sheets. See NPC_HIERARCHY.md for next batch and acceptance status. Architecture concept handoff remains complete with modeling/spatial-validation limitations documented separately.


### Latest NPC batch — Iron Mountain completion and Jade Spirit ranks

Ten of ten sheets accepted after visual review: 281, 286, 288–295. Iron Mountain and Jade Spirit now join Azure Cloud and Crimson Phoenix with nine ranks each; Shadow Moon has its Servant Disciple. Total 37/63 rank concepts accepted. Next: eight remaining Shadow Moon ranks and the first two Thousand Beast ranks. See NPC_HIERARCHY.md. These are representative design references, not implemented or named story characters.


### Latest NPC batch — sheets 296–305

Ten of ten accepted after individual visual review. Shadow Moon hierarchy is complete; Thousand Beast Servant and Outer Disciple added. Coverage is 47/63 representative rank designs. Next: seven remaining Thousand Beast ranks and the first three Heavenly Dao ranks. See NPC_HIERARCHY.md. English-only labels and no visible script-like decoration found; modeling still requires cross-view consistency checks.


### Latest NPC batch — 316–325

All ten generated sheets visually reviewed and accepted. Heavenly Dao ranks complete; the seven-sect hierarchy now has 63/63 representative rank concepts. Azure Cloud support-role concepts added: Deacon, Guard, Archivist and Healer. See NPC_HIERARCHY.md for the next ten-sheet plan. Concept references still require character modeling and consistency review.


### Latest NPC support batch — 326–335

Ten sheets generated and visually reviewed, all accepted. Azure Cloud and Crimson Phoenix support roles are complete (six each); Iron Mountain Deacon and Guard added. Rank hierarchy remains 63/63, support roles now 14/42. Next: Iron Mountain's remaining four support roles and all six Jade Spirit support roles. See NPC_HIERARCHY.md. These are concept references, not implemented game characters.
