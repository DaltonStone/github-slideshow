# MONS (working title) — Design Spec

**Version:** 0.1
**Status:** Draft. Sections marked _TBD_ are not yet designed; sections marked
_provisional_ are filled in with a defensible default so the system can be
exercised, and are expected to change.

This document is the canonical prose spec. The machine-readable mirror lives in
[`data/`](data/) and is checked against this document by the tests in
[`test/`](test/). If the two ever disagree, that is a bug — fix both.

---

## 1. Types

Ten types:

| # | Type | Origin (flavor) |
|---|---------|---------|
| 1 | Normal  | Natural |
| 2 | Fire    | Natural |
| 3 | Water   | Natural |
| 4 | Earth   | Natural |
| 5 | Steel   | Made    |
| 6 | Psychic | Spirit  |
| 7 | Dark    | Spirit  |
| 8 | Light   | Spirit  |
| 9 | Dragon  | Natural |
| 10 | Phantom | Spirit |

**Origins** are flavor groupings, not a mechanic:

- **Natural** — Fire, Water, Earth, Normal, Dragon
- **Made** — Steel
- **Spirit** — Psychic, Dark, Light, Phantom

Origin drives dex lore (birth group / material / manifest condition), not damage.

---

## 2. Type chart

Attacker → defender. `2` = effective (+100%), `0.5` = ineffective (−50%),
`0` = immune, blank = normal (`1`).

| ATK ↓ / DEF → | Nml | Fir | Wat | Ear | Ste | Psy | Drk | Lgt | Drg | Pha |
|---|---|---|---|---|---|---|---|---|---|---|
| **Normal**  | – | – | – | – | 0.5 | – | – | – | – | **0** |
| **Fire**    | – | 0.5 | 0.5 | **2** | **2** | – | – | – | 0.5 | – |
| **Water**   | – | **2** | 0.5 | 0.5 | **2** | – | – | – | 0.5 | – |
| **Earth**   | – | 0.5 | **2** | 0.5 | **2** | – | – | – | 0.5 | – |
| **Steel**   | **2** | 0.5 | 0.5 | 0.5 | 0.5 | – | – | – | 0.5 | – |
| **Psychic** | **0** | – | – | – | **2** | 0.5 | 0.5 | – | **2** | – |
| **Dark**    | **2** | – | – | – | 0.5 | **2** | 0.5 | **2** | – | **2** |
| **Light**   | – | – | – | – | 0.5 | 0.5 | **2** | – | – | **2** |
| **Dragon**  | – | **2** | **2** | **2** | 0.5 | – | – | – | **2** | – |
| **Phantom** | **0** | – | – | – | – | **2** | 0.5 | – | – | **2** |

### Structure the chart encodes

- **Elemental cycle:** Water → Fire → Earth → Water. Each beats the next for 2×
  and is resisted by it for 0.5×, so every pair is a clean one-way trade.
- **Dark and Light are a closed rivalry.** They hit each other for 2×, and they
  are each other's *only* weakness — nothing else in the game punishes either
  one. Rule-breaker and denial neither switch in safely against each other, and
  the exchange is a race rather than a counter. This is the only mutually
  super-effective pair in the chart, and a test keeps it that way.
- **Light is even.** Aside from Dark, nothing is super-effective into Light and
  nothing resists it. Its power is meant to come from **acting first** (see §4.1)
  rather than from the chart, which is what reactive denial should do.
- **Dark → Psychic** is a one-way trade like the elements.
- **Steel** is the defensive anchor: it resists six types and is neutral to a
  seventh, but is soft to all three elements and has almost no offense of its
  own (2× on Normal only).
- **Dragon** hits the whole elemental cycle for 2× and resists all of it, and is
  checked only by Psychic and by other Dragons.
- **Normal** has no super-effective matchup anywhere — it is the "mundane" type,
  and it pays for that with two immunities of its own (Psychic and Phantom
  cannot touch it) while being soft to Steel and Dark.
- **Phantom** and Normal are mutually immune.

See [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §1 for balance notes on this chart.

---

## 3. Dual-type stacking: additive

Multiplicative stacking (the genre default) produces 4× and 0.25× cliffs that
make dual types swingy. MONS stacks **additively** instead.

Each defending type contributes a percentage:

| Chart value vs. that type | Contribution |
|---|---|
| 2 (effective)   | **+100%** |
| 1 (normal)      | **0%** |
| 0.5 (ineffective) | **−50%** |
| 0 (immune)      | immunity |

Sum the contributions of both defending types, then read off the multiplier:

| Sum | Multiplier | Reached by |
|---|---|---|
| +200% | **3.0×** | weak / weak |
| +100% | **2.0×** | weak / neutral, or mono-type weak |
| +50%  | **1.5×** | weak / resist |
| 0%    | **1.0×** | neutral / neutral, or mono-type neutral |
| −50%  | **0.5×** | resist / neutral, or mono-type resist |
| −100% | **0.25×** | resist / resist — **floor** |

**Immunity on either type is 0×, and always wins** — it is checked before the
sum and cannot be cancelled by a weakness on the other type.

The floor at −100% is stated explicitly so that future sources of resistance
(abilities, field effects, held items) cannot stack a defender past 0.25×.

Worked examples:

- Fire move vs. Earth/Steel: +100 (Earth) +100 (Steel) = +200% → **3.0×**
- Fire move vs. Steel/Dragon: +100 (Steel) −50 (Dragon) = +50% → **1.5×**
- Steel move vs. Fire/Water: −50 −50 = −100% → **0.25×**
- Psychic move vs. Normal/Dragon: Normal is immune → **0×**, despite Dragon's +100.

---

## 4. STAB (Same-Type Attack Bonus)

- **Mono-type:** 1.5× on moves of its own type.
- **Dual-type:** 1.25× on moves of *either* of its two types.

A dual type therefore trades peak power for coverage: it gets a smaller bonus,
but on twice as many move types. STAB is a property of the *user*, not the
target, and applies independently of type effectiveness.

### 4.1 Denial acts first

**Light's denial moves have priority.** A move that undoes, cancels or blocks
another effect resolves before the effect it is answering, regardless of SPD.

This is the whole of Light's power budget. Light is even on the chart precisely
because it does not need defensive help: a counter that resolves second is not a
counter. The rule also makes the mutual 2× with Dark a genuine race — Light's
edge is tempo, Dark's is raw force — rather than a race Dark simply wins on
stats.

Not yet decided: whether *all* Light moves get priority or only the denial
subset (it should be the subset), how ties between two priority moves resolve,
and whether anything can out-prioritise it. See
[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §1.3.

### 4.2 Critical hits

Crit **chance** rises with level and then stops:

| Level | 1 | 15 | 30 | 45 | **60** | 61–99 |
|---|---|---|---|---|---|---|
| Chance | 5.0% | 7.4% | 9.9% | 12.5% | **15.0%** | 15.0% |

Linear from 5% at L1 to 15% at L60, flat thereafter. Levels run to 99, so the
last 39 levels buy no extra crit — crit is an early- and mid-game curve.

Chance and damage are **separate knobs**. A move or ability raises one or the
other, never both implicitly; the engine keeps them apart and a test enforces it.
The crit damage multiplier is currently 1.5 and is *provisional* — the design
states the chance curve, not the multiplier. See
[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §2.

---

## 5. Stats

Six stats: **HP, ATK, DEF, SpA, SpD, SPD**. Base numbers are deliberately small
(single- and double-digit), so that a +3 ability bump is a real decision rather
than rounding noise.

**Base stat totals** are fixed by evolution stage:

| Stage | Total |
|---|---|
| Basic (unevolved) | **105** |
| Evolved (middle)  | **135** |
| Final             | **170** |

Levels run **1–99**.

### Growth

```
stat(L) = base + floor(base * (L - 1) / 33)
HP(L)   = base + floor(base * (L - 1) / 33) + L
```

Landmarks: a stat is exactly `1×` base at L1, `2×` at L34, `3×` at L67, and
`≈3.97×` at L99. HP additionally gains a flat `+L`, which keeps low-HP mons from
being one-shot at high level and gently compresses the relative gap between
bulky and frail mons as the game goes on.

**Level is not a term in the damage formula.** Level acts only through stats.
This means a level advantage is worth exactly the stats it buys and nothing
more, and an underlevelled mon with a type advantage stays relevant.

### 5.1 In-battle stat modifiers

Abilities and moves apply **modifiers** to a stat for the length of a battle.
They are multipliers, not permanent changes — stored stats are never touched and
everything clears when the battle ends.

```
multiplier = max(0.25, 1 + sum of active modifiers on that stat)
```

The number written on an ability is the fraction it adds:

| Modifier | Multiplier | Reading | Source |
|---|---|---|---|
| **+0.25** | ×1.25 | +25% | Aspect of Flame, per BURN applied |
| +2 | ×3.00 | +200% | Moving Waters, in WATER terrain |
| +4 | ×5.00 | +400% | Layered Stone, at battle start |
| −0.25 | ×0.75 | −25% | |
| **−1** | **×0.25** | −75% | **floored** — the plain rule gives 0 |

Modifiers on the same stat **add before they multiply**, so four of Aspect of
Flame's quarters is ×2, not ×2.44.

**The floor is proposed.** `1 + (−1)` is exactly zero, which would delete a stat
outright, so it is clamped at 0.25 — the same floor the type chart uses, to keep
one convention across the game. The other plausible shape for negatives is
`1/(1+|sum|)`, which halves at −1 instead. See
[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §9.5.

HP never carries a modifier: these are battle-length effects and should not move
a health bar mid-fight.

---

## 6. Starters and roster

### 6.1 Starters

Each line is three stages. Final-stage typings are **not yet stated**.

| Line | Basic | Evolved | Final | Signature ability |
|---|---|---|---|---|
| Fire | **Candelite** | Lanturnn | Ebberflame | Aspect of Flame |
| Water | **Merling** | Merful | MerKing | Moving Waters |
| Earth | **Bouldur** | Cliffkin | Fortruss | Layered Stone |

They sit on the elemental cycle, so the choice is a real
rock-paper-scissors commitment (Water → Fire → Earth → Water).

### 6.2 Roster

30 named creatures. All are **concept entries**: identity, typing and evolution
links are real; stats, abilities, size and dex text are not authored yet.
`[S]` marks a signature move, `→` an evolution.

| # | Name | Typing | |
|---|---|---|---|
| 01–03 | Candelite → Lanturnn → Ebberflame | Fire | Starter |
| 04–06 | Merling → Merful → MerKing | Water | Starter |
| 07–09 | Bouldur → Cliffkin → Fortruss | Earth | Starter |
| 10 | Gropper | Normal | Grasshopper with giant hind legs |
| 11 | VisBee `[S]` | Earth | → VisGarde |
| 12 | VisGarde | Earth/Dark | |
| 13 | VisBeeQueen | Dark/Psychic | Leads the VisBees — see §6.3 |
| 14 | Stilta `[S]` | Normal | Five little guys — they do not combine |
| 15 | Toll | Normal/Phantom | Corrupted, born from a virus |
| 16 | Jaxs `[S]` | Dark/Phantom | Jack-In-The-Box |
| 17 | Dusk | Dark | → DuskNoar |
| 18 | DuskNoar `[S]` | Dark/Steel | |
| 19 | Bane `[S]` | Light/Steel | The kind sword |
| 20 | DrillBee | Earth | Wants VisBee honey |
| 21 | TourqueTon | Steel | Turtle, vicious bite |
| 22 | BellDum | Phantom/Steel | → BellGarde |
| 23 | BellGarde | Phantom/Steel | |
| 24 | Sentry X/Y | Steel/Psychic | Construct out of the deep past |
| 25 | Pilliduns | Psychic/Normal | Combine to do large things |
| 26 | Miggoons | Normal | Mice |
| 27 | Frenfex | Fire | Flaming fox |
| 28 | Bloom | Dark/Water | → BloomGloom |
| 29 | BloomGloom | Dark/Water | → DoomBloom |
| 30 | DoomBloom `[S]` | Dark/Water | Evil blimp |

**Type spread:** Dark 8, Steel 6, Normal 5, Phantom 4, Earth 3, Water 3,
Psychic 3, Fire 1, Light 1, **Dragon 0**. Dragon having no creatures is
consistent with it being rare; Dark carrying eight is the concentration to watch,
since Dark is also the second-strongest type on the chart
([`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §1.3).

### 6.3 VisBeeQueen

**A separate creature, not a stage of the VisBee line.** That is what lets it be
Dark/Psychic and drop the Earth the others carry — the rule that an evolution
never loses a type stays intact.

Still undecided: whether it is *reachable* from VisBee under special conditions,
or is simply its own bee that happens to sit above them. Either way it **leads**
the VisBees and VisGardes, which is a standing relationship rather than an
evolution, and is recorded as such in `relatedMons` — the first real use of that
field, alongside DrillBee preying on VisBee.

## 7. Type stat defaults

Guides for authoring, **not rules**. A mon may deviate when its concept calls
for it; the defaults exist so that deviation reads as deliberate.

| Type | Default shape |
|---|---|
| Fire | Fast physical, frail. |
| Water | Balanced, special-leaning, sustain. |
| Earth | Bulky slow physical; field / area moves. |
| Normal | High HP, wide move access. |
| Steel | Max DEF, high ATK, very slow. |
| Psychic | Fast special, frail. |
| Dark | Mixed attacker; tricks and debuffs. |
| Light | Max SpD; healer / support. |
| Dragon | Even spread, rare. |
| Phantom | Evasive, low HP, high SpD. |

---

## 8. Abilities

Every mon has a **pool of 3–5** abilities, of which **one is active**.

### Starter signatures

| Ability | Type | Effect |
|---|---|---|
| **Aspect of Flame** | Fire | Contact moves have a 30% chance to apply BURN. Whenever BURN is applied to *any* creature, gain 0.25 SPD. |
| **Moving Waters** | Water | While WATER terrain is active, gain +2 SPD, and Water moves have a 30% chance to lower the target's S.DEF by 1. |
| **Layered Stone** | Earth | Gain +4 DEF at the start of battle. Lose 1 DEF from this ability each time a super-effective move connects. |

Three things these introduce that the design had not previously named: **BURN**
(the first defined status condition), **WATER terrain** (the first terrain), and
**stat modification in three different grains** — +4, +2, 0.25, and "lower by 1".
All three are tracked in [`data/mechanics.json`](data/mechanics.json) as
shape-only. Note that Moving Waters is currently a dead ability: nothing in the
game creates terrain yet.

`Kindling`, `Tidewater` and `Bedrock` were the previous roster's starter
signatures. They are now unassigned shared abilities.

### Shared pool

**Stat bumps** — `Brawny` +3 ATK · `Sharp Mind` +3 SpA · `Thick Hide` +3 DEF ·
`Steady` +3 SpD · `Quick Feet` +3 SPD · `Overgrown` +10% max HP

**Immunities** — `Fireproof` (no burn) · `Anchored` (cannot be switched or
moved) · `Clear Head` (no confusion, no stat drops) · `Cold Blood` (immune to
Dark intimidate effects) · `Grounded` (immune to Earth hazards)

**Absorbs** — `Drink Deep` (Water heals) · `Ember Heart` (Fire heals) ·
`Mind Sponge` (Psychic hits raise SpA instead)

**Tempo** — `Ambush` (moves first the turn it enters) · `Slow Burn` (moves last,
+20% damage) · `Windup` (−3 SPD; every 3rd turn moves first)

**Survival** — `Last Stand` (below 1/3 HP: ATK and SpA +50%) · `Thorns` (a
contact attacker takes 1/8 of its own max HP) · `Grudge` (on being KO'd, the
killing move loses all remaining uses)

**Hook** — these come with a body of rules attached:
`Built` (immune to poison, burn and sleep; takes 1.5× from Water) ·
`Unreal` (immune to Normal moves)

There is **no Swarm system**. A creature made of many bodies — Stilta's five
little guys, Pilliduns combining — is one creature with one HP pool, like
everything else. The concept is flavour, not a parallel damage model.

**Chaos** — `Lucky Day` (on any turn whose count is a multiple of 7: always
moves first, always crits)

Note that `Anchored` and `Ambush` are mutually contradictory, as are `Ambush`
and `Windup`; a single pool must not offer both of a contradictory pair. This is
enforced by the data tests.

Target for the full game: **~50–60 shared abilities**. 28 are specified here — 3 starter signatures and 25 shared.

---

## 9. Moves and bodies

### 9.1 Delivery classes

Every move has **exactly one** delivery class, and the class alone decides
whether the move makes contact. Contact is never declared separately, so an
ability and a move can never disagree about it.

| | Class | Contact | |
|---|---|---|---|
| **Contact** | Punch | yes | Struck with a limb or appendage. |
| | Kick | yes | Struck with the lower body. |
| | Body | yes | The whole creature is the weapon. Height and weight feed these. |
| **Non-contact** | Ranged | no | Projectile or emission. Usually special. |
| | Voice | no | Sound. Reaches things a projectile would not. |
| | Trap | no | Placed rather than aimed; resolves on a condition. |

`Thorns` ("a contact attacker takes 1/8 of its own max HP") reads this table and
nothing else. `Voice` reaching what a projectile cannot is the hook for getting
past shields, substitutes and summoned objects — see
[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §6.3.

### 9.2 Proxies

A **proxy** is anything that takes a mon's place: a summoned object, a decoy, a
substitute, Jaxs' Jack-In-The-Box. The rule is absolute:

> **While a proxy stands, every attack hits the proxy.** No delivery class gets
> past it — not Voice, not Trap, not Ranged. A proxy has its own HP, and lasts
> either a set number of turns or until it is destroyed.

The only counterplay to a proxy is **not attacking**. That is the point: a proxy
turns a turn into a fork — break it and pay whatever breaking it costs, or spend
the turn on something else and let the summoner have the tempo.

Because the rule is absolute and the reach is wide, four things it does *not*
settle are tracked in [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §6.3 — whether
non-damaging effects pass through, whether excess damage carries over when the
proxy breaks, whether a second proxy can be raised while one stands, and whether
a proxy can be healed.

### 9.3 Height and weight

Recorded per species in metres and kilograms. Flavour first, but `Body` moves
and some others read them.

Any weight-ratio term in a damage calculation is **capped at 4×**. The roster
already spans 4.5 kg to 410 kg — a 91× spread — so an uncapped ratio would be an
unbounded multiplier long before the roster is finished.

---

## 10. Status and terrain

### 10.1 Damage over time

Every damage-over-time effect uses one shape: **X damage per turn, scaling with
level, for Y turns**.

**BURN** is the first instance. Applied by Aspect of Flame's contact moves at
30%; `Fireproof` grants immunity.

| | |
|---|---|
| Damage | 5 per turn at L1, rising to **15 at L40**, flat thereafter |
| Duration | **3–4 turns**, rolled |
| Category | Special |

Levels run to 99, so the last 59 buy no extra burn — the same shape crit uses,
which caps at 60. Burn is an early- and mid-game threat by construction.

Duration ranges stay **narrow on purpose**. The roll is a coin flip neither
player controls, so a wide one makes the effect swingier than any decision in
the fight — at 2–5 turns the roll swung burn 2.5× at every level, more than the
entire level curve. At 3–4 it is 1.33×.

A full burn is worth roughly **two ordinary attacks** (2.0× at L1, 2.7× at L40,
1.5× at L99). See [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §9.8.

### 10.2 Terrain — PROPOSED

**One terrain per type; ten in total.** Each grants the buff its type most
needs, read straight off that type's stated weakness in §7. Fire is frail, so
Ashfield gives bulk. Steel is slow, so Forge gives speed.

| Type | Terrain | Answers | Grants |
|---|---|---|---|
| Normal | Steady Ground | no bonuses of its own | move energy costs −25% |
| Fire | **Ashfield** | frail | +0.5 DEF and S.DEF (×1.5) |
| Water | **Tide** | frail, needs setup | restore 1/8 max HP per turn |
| Earth | Rich Soil | low natural kill power | +0.5 ATK and S.ATK (×1.5) |
| Steel | Forge | hellah slow | +1 SPD (×2) |
| Psychic | Resonance | frail | +0.5 S.DEF; support moves hit both allies |
| Dark | Gloom | no recovery if setup fails | restore stamina to one move per turn |
| Light | Radiance | one note, low power | move power +25% |
| Dragon | Skyfall | low move variety | moves cost no stamina |
| Phantom | Veil | needs setups and luck | conditional effects always trigger |

**One terrain stands at a time**, for **5 turns**, and **buffs only its own
type** — which keeps Water and Dragon, the two terrain-setting roles, from
simply buffing whatever they brought. All three of those are proposed.

The buffs are mine; the principle is the design's. What is still missing is
anything that **sets** a terrain — so `Moving Waters` remains unreachable in
play even though WATER terrain now exists.

---

## 11. Energy and stamina

**Both persist between battles.** This is the decision that changes the shape of
the game: the unit of play stops being a battle and becomes a run of them. The
question during a fight is no longer "can I win this" but *"can I win this
cheaply enough to still win the next five"*.

They are two different axes, not one resource twice:

| | What it limits | Scope |
|---|---|---|
| **Stamina** | *which move* — each move has its own uses | Per move |
| **Energy** | *how long the mon can fight at all* | One pool per mon |

### 10.1 Energy tiers — PROPOSED

Numbers are a first cut; the shape is the part to argue with.

| Tier | Energy | Stats | Accuracy | Move cost | |
|---|---|---|---|---|---|
| Fresh | 61–100 | ×1.00 | ×1.00 | ×1.00 | |
| Worn | 31–60 | ×0.90 | ×0.95 | ×1.10 | |
| Spent | 11–30 | ×0.80 | ×0.90 | ×1.25 | |
| **Exhausted** | **1–10** | **×0.70** | **×0.85** | **×1.50** | **floor** |
| Empty | 0 | — | — | — | **knocked out** |

**Energy reaching 0 knocks the mon out.** Energy is a *second health bar*, not a
soft debuff: there are two ways to lose a mon, and Exhausted is a genuine
warning rather than an inconvenience — from Exhausted a mon has about **two
turns** before it drops, against 18 from full.

Energy scales the five fighting stats. **HP is never touched** — energy is its
own bar and should not move the other one.

**Exhausted is a hard floor and it is the load-bearing part.** Falling energy
lowers stats *and* accuracy *and* raises move cost — a feedback loop straight
into losing, and since the bottom of it is a KO, an uncapped loop would make the
last stretch vanish in a single turn. The floor is what keeps the endgame
playable instead of instant.

At 2 energy per turn plus a 3-cost move, a full mon has **18 turns of fighting**
— several battles, not one, and not endless.

### 10.2 Out of stamina: Struggle — PROPOSED

A mon with no stamina left on any move **Struggles**: a weak attack that deals
recoil damage to its user.

| | |
|---|---|
| Power | 25 |
| Recoil | 50% of the damage dealt |
| Type | **typeless** — no STAB, no type effectiveness |
| Delivery | Body, so it makes contact |
| Costs | Energy yes, stamina no |

Typeless is deliberate. A Normal-typed Struggle would deal **zero** to a Phantom
(§2: Normal → Phantom is 0), so a mon out of stamina could not touch a Phantom at
all and the two would stand there until energy killed them both. Typeless avoids
the dead end.

It still burns energy, so **running dry on stamina hastens the energy KO** — the
two resources fail into each other rather than independently.

### 10.3 Restoration — PROPOSED

Full rest at a base, partial restoration from items, **benched mons recover 5 per
battle they sit out**, and **support mons can restore both energy and stamina**.

Bench recovery makes **rotation** the management verb rather than item-spam, and
is why party size now matters to the combat math. Support restoration is the
in-battle answer to attrition — and it hands Light the always-live job it needed:
otherwise a pure counter-type, brilliant against rule-alteration and dead against
anything else.

---

## 12. Duels and decks

Creatures are captured onto **cards**. Anyone holding them is a **Deck Holder**;
those who battle competitively are **Duelists**.

| | |
|---|---|
| Creature cards held | up to **12** |
| Support cards held | up to **30** |
| Creatures taken into a duel | **6**, chosen from the 12 |
| Creatures on the field per side | **2** |
| Duel ends when | one side's 6 are exhausted |

**Both Duelists see each other's cards** before choosing their six. There is no
hidden information at team selection — the read is on what the opponent will
*bring* and *lead with*, not on what they own.

Two things this settles that were open:

- **Doubles.** Duels are **2v2**. The long-running question is answered: support
  archetypes are first-class in the competitive format, not a niche. Outside the
  arena the rules are lenient and battles are usually **singles**.
- **Party size.** Six, which the persistent-energy model in §11 needed — bench
  recovery only works if there is a bench.

**Support cards are a wholly new entity** and nothing about them is designed:
what they do, when they are played, whether they cost anything. Thirty of them
against twelve creatures suggests they are the larger half of the game.

---

## 13. Mon template

Every mon is authored as three tabs.

### Tab 1 — engine

`ID` · `Name` · `Type1` · `Type2` · `Origin` · `Body` · `HP` · `ATK` · `DEF` ·
`SpA` · `SpD` · `SPD` · `Total` · `Ability pool (3–5)` ·
`Learnset (move + unlock level)` · `Evolves from / into + method`

### Tab 2 — dex

Up to **7 lore entries**, unlocked by catch count · `Where found` ·
`Origin detail` (birth group / material / manifest condition) · `Evolution notes`

### Tab 3 — misc

`Gender ratio or castes` (optional) · `Catch thresholds for entries` ·
`Related mons` (prey / predator / rival / symbiont)

Tab 1 also carries **Height** and **Weight** (§9.2).

The JSON encoding of this template is documented in
[`data/README.md`](data/README.md) and enforced by
[`test/data.test.js`](test/data.test.js).

---

## 14. Targets

| Item | Target | Now |
|---|---|---|
| Creatures named | 60+ | 30 |
| Fully authored | 30 | 0 |
| Abilities | ~50–60 | 29 |
| Move pools | TBD | not started |
| Support cards | up to 30 held | not started |

Every creature is currently a **concept entry** — the name, typing and evolution
links are real and tested; stats, abilities, size and dex text are null until
authored. `data/mons.json` marks each with `status`.

## 15. Not yet designed

- **The damage formula itself.** This spec fixes the *multipliers* (type
  effectiveness, STAB) and states that level is not a term, but never states the
  core ATK/DEF-to-damage expression. A proposal now exists in
  [`lib/damage.js`](lib/damage.js), deliberately kept out of this document until
  it is accepted — see [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §2, and try it in
  the [Combat Lab](../game/index.html).
- **Moves.** Power, accuracy, PP, physical/special split, priority, and every
  learnset.
- **Status conditions.** Several abilities reference burn, poison, sleep and
  confusion; none of those are defined.
- **Catching**, switching, held items, and hazards (`Grounded` implies Earth
  hazards exist).
- **Affection.** How attached a mon is to its trainer, modifying stats by
  affection points and level with extra effects at maximum. Per-instance state,
  not species data. Persistence was never in doubt; what is open is whether it
  applies in competitive play. See [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) §6.2.
- **Per-move stamina and energy costs**, which are move data.
- **How much supports restore, and at what cost.** If a support can refill a
  pool freely, energy stops binding and §10 stops meaning anything.
- **Where a run resets**: towns, camps, a limited number of rests. The scarcity
  of restoration *is* the difficulty curve.
- **Party size**, which persistent energy makes load-bearing — rotation is the
  intended answer to a tiring team, and that only works if there is a bench.

See [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) for the decisions these block.
