# Open questions — v0.1

Things the spec does not yet settle, and things it does settle that look like
they will need a second pass. Numbers in §1 are computed from
[`data/types.json`](data/types.json) by `node tools/analyze.js`, not estimated.

---

## 1. Type chart balance

The chart is internally consistent — both cycles are clean, every type has at
least one weakness, and no dual-type pairing comes out weakness-free. Four
things stand out anyway.

### 1.1 Dragon is the best type on both axes

Defensive and offensive scores across all ten types (`resist + 2·immune − weak`
and `2× − 0.5× − 2·immune`):

| Type | Weak | Resist | Immune | Def score | 2× | 0.5× | 0× | Off score |
|---|---|---|---|---|---|---|---|---|
| Steel   | 3 | 6 | 0 | **+3** | 1 | 5 | 0 | **−4** |
| Dragon  | 2 | 4 | 0 | **+2** | 4 | 1 | 0 | **+3** |
| Dark    | 1 | 3 | 0 | +2 | 3 | 3 | 0 | 0 |
| Normal  | 2 | 0 | 2 | +2 | 0 | 1 | 1 | −3 |
| Fire    | 2 | 3 | 0 | +1 | 2 | 3 | 0 | −1 |
| Water   | 2 | 3 | 0 | +1 | 2 | 3 | 0 | −1 |
| Earth   | 2 | 3 | 0 | +1 | 2 | 3 | 0 | −1 |
| Light   | 1 | 2 | 0 | +1 | 2 | 3 | 0 | −1 |
| Psychic | 2 | 2 | 0 |  0 | 2 | 3 | 1 | −3 |
| Phantom | 3 | 0 | 1 | **−1** | 2 | 1 | 1 | −1 |

Steel pays for the best defense with the worst offense, and Normal pays for its
immunities with no super-effective matchup anywhere. Those are legible trades.
Dragon does not make a trade: it is top-two defensively *and* clearly the best
offensively, resisted by only one type and checked by only two.

**The only thing balancing Dragon is the one-word note "rare" in §7 of the
spec.** That is a load-bearing word doing a lot of work. Either it becomes a
real, written rule (how many Dragon lines exist, at what stage they are
obtainable, whether they are late-game only), or Dragon needs a second
weakness. Decide before the roster is authored, because it changes how many
Dragon slots the 60 are allowed to spend.

### 1.2 Phantom is the weakest defensive type, against its own flavor

Phantom is "evasive, low HP, high SpD" — a defensive concept — but is the only
type with three weaknesses and no resistances. Its Normal immunity is worth
little, because Normal has no super-effective matchup to be immune *to*. So
Phantom's survivability rests entirely on evasion and stat defaults, which are
guides rather than rules. If evasion is not a strong mechanic, Phantom is a
trap type. Options: give Phantom a resistance (Earth reads well — nothing to
stand on), or accept it as a glass-cannon type and rewrite the §7 default.

### 1.3 The Dark / Light rivalry, and what it cost Steel

**Settled.** Dark and Light hit each other for 2× and are each other's only
weakness — a closed rivalry nothing else in the game can interfere with. Light is
otherwise **even**: nothing is super-effective into it, nothing resists it. Its
power comes from **denial acting first** (SPEC §4.1), not from the chart.

Three edits made this work:

| Edit | Why |
|---|---|
| `Dark → Light` 0.5 → 2 | Makes the rivalry mutual. |
| `Psychic → Light` 2 → 1 | Light goes even on defence. |
| `Psychic → Steel` 0.5 → 2 | Pays Psychic back — Light was its only target besides Dragon. |

#### The bill landed on Steel, harder than expected

Flipping `Psychic → Steel` from 0.5 to 2 is a two-notch swing: Steel did not just
lose a resistance, it gained a weakness.

| | Before | After |
|---|---|---|
| Steel defensive score | **+3, best in the game** | **+1, joint fourth** |
| Steel weaknesses | 3 (Fire, Water, Earth) | **4 (+ Psychic) — most of any type** |
| Steel resistances | 6 | 5 (still the most) |
| Best defensive types | Steel | Normal, Dark, Dragon (all +2) |

Steel keeps the most resistances in the game, and "soft to the three elements and
to mind-attacks, tough against everything else" is a coherent heavy-armour
profile. But **Steel is no longer the defensive anchor**, which sits awkwardly
with its role ("Durability and Damage"). Its chart offence is also the worst in
the game at −4. Steel now has to get *both* halves of its role from raw stats,
with the chart actively working against it.

**If the durability crown matters, the cheap fix is `Phantom → Steel` 1 → 0.5**
— a ghost gets no purchase on solid plate. That returns Steel to six resistances
and +2, level with the other tanks, without undoing anything above.

#### Still open

- Do **all** Light moves get priority, or only the denial subset? It should be
  the subset, or Light becomes a universal first-striker.
- How do two priority moves resolve against each other?
- Can anything out-prioritise denial? Something probably should.
- Dark remains the second-best type on the chart (+2/+2, four super-effective
  targets, one weakness). Light is now its only check, and that check is a
  tempo mechanic rather than a stat one — which is the intent, but it means the
  priority rule is load-bearing for the whole Spirit balance.

### 1.4 The 3.0× ceiling is rare, and that is working

Across all 450 attacker × dual-type combinations, exactly 15 reach 3.0×
(3.3%). Dragon accounts for 6 of them and Dark for 3. The additive rule is
doing what it was designed to do: a doubled weakness is a spike, not a
deletion.

---

### 1.5 The starter triangle is broken at final stage — needs a decision

*(This section was accidentally deleted while §1.3 was being rewritten and has
been restored with numbers re-run against the current chart.)*

The starters gain a second type when they evolve:

| Line | Basic | Evolved | Final |
|---|---|---|---|
| Fire  | Emberkit | Cindermaw | Pyrelash **Fire/Phantom** |
| Water | Rillet | Tidecalf | Brinemoor **Water/Psychic** |
| Earth | Loambit | Cragmole | Terrabulk **Earth/Steel** |

At basic and evolved stage this is the clean Water → Fire → Earth → Water cycle.
At final stage it is not. Simulated at L50 with a 60-power STAB move, each using
its own better offensive stat:

| Matchup | Hits to KO | Winner | Cycle wants |
|---|---|---|---|
| Pyrelash vs Brinemoor | 2 vs 2 | **Pyrelash** — tied, and twice as fast (116 vs 57) | Brinemoor |
| Brinemoor vs Terrabulk | 2 vs 2 | **Brinemoor** — tied, marginally faster (57 vs 52) | Terrabulk |
| Terrabulk vs Pyrelash | 5 vs 2 | Pyrelash ✓ | Pyrelash |

**Two of three legs are wrong, and both are decided by a speed tiebreak rather
than by type** — which is exactly what the cycle is supposed to prevent.

Three causes, and one of them is new:

1. **Phantom hits Psychic for 2×.** The Fire starter's second type counters the
   Water starter's second type, cancelling the Water-beats-Fire leg.
2. **Earth/Steel is the only dual typing in the game Fire reaches 3.0× on** —
   Fire is 2× into both halves. Fire/Phantom meanwhile resists both of
   Terrabulk's types, so it answers at 0.5×. A 6× swing between two starters.
3. **`Psychic → Steel` (§1.3) broke the Earth-beats-Water leg.** Brinemoor is
   Water/**Psychic** and Terrabulk is Earth/**Steel**, so the edit handed the
   Water starter a 2× answer it did not have before — it went from losing that
   matchup 3 hits to 2, to tying it and winning on speed. This was not
   anticipated when the change was made.

#### The fix is the same one, and it now fixes more

**Water/Psychic → Water/Light** repairs *both* broken legs at once. Phantom is
neutral into Light, and Light has no answer to Steel, so cause 1 and cause 3 both
disappear:

| Matchup | Hits to KO | Winner |
|---|---|---|
| Pyrelash vs Brinemoor | 3 vs 2 | Brinemoor ✓ |
| Brinemoor vs Terrabulk | 3 vs 2 | Terrabulk ✓ |
| Terrabulk vs Pyrelash | 5 vs 2 | Pyrelash ✓ |

A clean cycle, decided by type rather than by speed. Light also suits Brinemoor
better than Psychic does — §7 gives Light "max SpD, healer/support", and
Brinemoor already runs Tidewater and Steady, while Psychic's default is "fast
special, frail", which is the opposite of what it is built as.

#### Cause 2 survives the fix

Fire still beats Earth at 3.0× while the other legs are 2.0×, and Terrabulk still
answers at 0.5×. Two mitigations the design already half-contains:

- **Bedrock** ("cannot be KO'd from full HP in one hit") is exactly the insurance
  a 3× weakness needs and is already in Terrabulk's pool. Making it the default
  turns the matchup from *deleted* into *very bad*.
- **Terrabulk's offence is a movepool problem.** A Water-type coverage move
  reaches Fire/Phantom for 2×. Move pools are unwritten, so this is free to fix.

#### Other options considered

| Option | Effect |
|---|---|
| Fire/Phantom → **Fire/Light** | Also restores the cycle, but loses the ghost-fire concept. |
| Earth/Steel → **Earth/Dragon** | All three legs a symmetric 2×, but Dragon is meant to be rare and Steel fits the "smelted, not gathered" flavour. |
| Accept a power ranking | Defensible, but a 6× swing plus two speed-decided legs is a lot to hand the player at character select. |

**Recommendation: Water/Light, plus Bedrock as Terrabulk's default.** One field
in `data/mons.json`, and reversible.

This analysis depends on the physical/special split, which the spec still never
states (§2).

## 2. The damage formula — PROPOSED, needs your call

v0.1 fixed every multiplier and ruled level *out* of the formula, but never
stated the formula those multiply. There is now a proposal in
[`lib/damage.js`](lib/damage.js), kept in its own module so it can be retuned or
replaced without touching anything else:

```
damage = power × ATK² / (ATK + DEF) / SCALE × STAB × effectiveness × modifiers
```

### Why this shape

The deciding constraint is that HP grows ~6.6× across the level range (the
curve plus its flat `+L`) while every other stat grows ~3.97×. If damage does
not grow with the stats, battles get longer and longer as levels rise.

| Candidate | Damage growth L1→L99 | Verdict |
|---|---|---|
| `ATK / DEF` (ratio) | ×1.00 | **Rejected.** Flat damage against 6.6× HP — a L99 battle takes ~6× the turns of a L1 one. |
| `ATK − DEF/2` (difference) | ×3.95 | **Rejected.** Correct scaling, but goes negative whenever DEF > 2×ATK and needs an arbitrary floor bolted on. |
| `ATK² / (ATK + DEF)` | ×3.95 | **Adopted.** Never negative, smooth diminishing returns on DEF. |

`SCALE = 100` was tuned against the real roster: at L50 a final-stage attacker
needs 3 neutral STAB hits to drop a final-stage tank, and the tank needs 2 to
drop the frail one. Frail-and-fast wins on tempo, bulky wins on attrition.

### Still yours to decide

1. **Is SCALE right?** It sets battle length and nothing else. The
   [Combat Lab](../game/index.html) has a live slider for it.
2. **Should the modifier stack cap?** This is the real problem. Kindling (1.5)
   × mono STAB (1.5) × 3.0× effectiveness = **6.75× before the formula runs**,
   and with a crit it reaches 10.1×. Measured in the sandbox: that one-shots a
   full-health final-stage tank (208 damage into 136 HP). Additive type stacking
   was adopted specifically to avoid 4× cliffs — a 6.75× modifier stack puts one
   straight back. Options: cap the product, make ability modifiers additive with
   each other, or accept it as the reward for setting up a read.
   Note `Bedrock` ("cannot be KO'd from full HP in one hit") is already a
   partial answer to this, which suggests the tension was anticipated.
3. **The crit multiplier**, currently a 1.5 placeholder, and whether crits
   should ignore DEF boosts.
4. **The physical/special split.** Six stats imply one and the sandbox assumes
   it (ATK↔DEF, SpA↔SpD), but no document states it. It should be written down.

## 3. Moves

Not started. Blocks every `learnset` in [`data/mons.json`](data/mons.json),
which is why they are empty arrays with a `learnsetStatus` note rather than
invented placeholder content. Needed: the physical/special split (six stats
imply one, but it is never stated), power/accuracy/PP scales, priority, and how
many moves a mon knows at once.

## 4. Status conditions

`Fireproof`, `Built`, and `Clear Head` grant immunity to burn, poison, sleep and
confusion. None of those four conditions is defined anywhere. An immunity to an
undefined condition cannot be balanced or implemented.

## 5. Hook abilities imply whole systems

- `Colony` replaces HP with "bodies". That is a parallel damage model, not an
  ability — how do bodies interact with the damage formula, with healing, with
  a 3.0× hit?
- `Royal` refers to "allied Swarm mons", but **Swarm is never defined**. It is
  the only reference to the concept in the spec. Is Swarm a tag, an origin, a
  caste, a type?
- `Built` gives 1.5× damage taken from Water. This is the only damage modifier
  in the spec that is neither type effectiveness nor STAB — it needs a slot in
  the multiplier order, which does not exist yet.
- `Grounded` implies Earth hazards; hazards are otherwise undefined.

## 6. The new systems

### 6.1 Energy — blocked on one question

Energy is a pool separate from stamina: it falls over time, and as it falls it
degrades stats and accuracy and raises move cost. The shape is in
[`data/mechanics.json`](data/mechanics.json) with `status: "unspecified"`, and no
numbers are invented, because they all follow from one unanswered question:

> **Does energy persist between battles, or reset each battle?**

- **Resets each battle** — a pacing mechanic. It makes long fights different
  from short ones and rewards closing quickly. Self-contained and easy to tune.
- **Persists** — a resource-management mechanic. Now the player is managing a
  team across a day, deciding which mon to spend. Much richer, much bigger:
  it needs restoration items, rest, and an overworld loop to matter.

These are different games. Every number below depends on which one it is.

**Two design hazards worth building around either way:**

1. **The death spiral.** Low energy lowering stats *and* accuracy *and* raising
   move cost is a positive feedback loop into losing. The player who falls
   behind falls further behind through no further decision of their own. A
   **floor** is required — below some threshold, the penalties stop deepening.
   `mechanics.json` reserves a `floor` field for exactly this.
2. **Two depleting resources is a lot.** Stamina (per-move uses) and energy
   (global pool) both count down, and the player tracks both every turn. That
   can be the game's identity — battles as attrition — but it is bookkeeping,
   and it is worth being sure the second resource earns its place rather than
   duplicating the first. If stamina limits *which move*, and energy limits
   *how long you can fight at all*, they are genuinely different axes. If both
   just mean "you run out", merge them.

### 6.2 Affection — blocked on whether it is competitive

Affection modifies stats by affection points and level, with extra effects at
maximum. Per-instance state, not species data.

> **Does affection apply in competitive play?**

If it does, it is a **stat bonus you get by grinding**, and any competitive
format built on it is decided partly by time spent rather than decisions made.
The standard answer in the genre is that affection applies in casual and
single-player, and is normalised out of ranked. Worth deciding now, because it
also settles whether affection effects can be strong (casual-only) or must stay
cosmetic-adjacent (universal).

The "additional effects at maximum" are the interesting part and the risky part:
effects like surviving a lethal hit or shrugging off status are exactly what a
competitive format cannot tolerate but a story mode loves.

### 6.3 What the new systems fix, and what they open

**Fixed.** `Thorns` finally has a definition of contact to key off, and it comes
from the move's delivery class rather than a separate flag, so the two cannot
drift apart.

**Opened.**

- **Voice vs. summoned objects.** `Voice` is non-contact and "reaches things a
  projectile would not". That is the natural counterplay to Jaxs' Jack-In-The-Box
  and to shields generally — a Voice move hits the mon behind the box. If that
  is intended, it should be a stated rule, because it changes how the box's
  mind-game plays out.
- **Crit chance now interacts with the modifier stack.** Crit is no longer a
  toggle but a real probability, and moves and abilities push it. `Lucky Day`
  ("on turns divisible by 7, always crit") is now a guaranteed top-end roll that
  stacks with Kindling and a 3.0× type hit: 1.5 × 1.25 × 3.0 × 1.5 = **8.4×**
  before the formula runs. §2's cap question gets sharper, not softer.
- **The crit damage multiplier is still a placeholder.** The design specifies
  the chance curve and says moves modify "crit damage", but never says what crit
  damage *is*. It sits at 1.5.
- **Crit stops at L60 but levels run to 99.** Deliberate, per the design — worth
  confirming that the last 39 levels buying no crit is intended rather than an
  artefact of picking 60.
- **Stamina is named but undefined.** Energy is "separate from stamina", which
  means stamina now needs a definition too.
- **Which moves read height and weight?** The cap is proposed at 4×; the moves
  that use it do not exist yet.

## 7. Naming

Every mon name in the data is a working title. `Emberkit`, `Cindermaw`,
`Pyrelash`, `Rillet`, `Tidecalf`, `Brinemoor`, `Loambit`, `Cragmole`,
`Terrabulk`. The game's own title is also still `MONS`.

## 8. Smaller decisions taken as provisional defaults

Recorded here so they are visible rather than buried in the data:

| Decision | Default taken | Why |
|---|---|---|
| Starter evolution levels | 17 and 34 | 34 is where the growth curve hits exactly 2× base, so the second evolution lands on a real mechanical landmark. |
| Dex catch thresholds | 1, 3, 8, 15, 30, 50, 100 | Seven rungs for the seven allowed entries; front-loaded so the first entries are readable early. |
| Dex entries written | 3 of 7 per starter | The later four want lore the world does not have yet. |
| Starter gender ratio | 50/50 | Nothing in the spec suggests otherwise. |
| `relatedMons` | empty | There are only nine mons; predator/prey needs a real roster. |
| Ability pool inheritance | an evolution keeps its previous stage's whole pool and adds to it | Not stated in the spec, but the 3→4→5 pool sizes strongly imply it. **Confirm this is intended** — it is enforced by a test, so it is cheap to reverse now and expensive later. |

## 9. Questions for the next pass

1. Is Dragon's rarity a written rule, or does Dragon need a second weakness?
2. What is the damage formula?
3. Do modifiers stack multiplicatively, and is a ~6.75× stack acceptable?
4. Is Swarm a type, a tag, or a caste?
5. Is the ability-pool inheritance rule in §7 above correct?
6. Do all 60 base creatures use the 105/135/170 budgets, or do single-stage and
   two-stage lines get different totals? Right now a one-stage mon would be
   stuck at 105 forever.
7. Water/Psychic or Water/Light for Brinemoor? The current typing means the Fire
   starter beats both of the others. (§1.5)
