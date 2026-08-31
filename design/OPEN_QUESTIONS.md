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

### 1.3 Dark is now the second-best type in the game

Making Dark↔Light mutual gave Light the second weakness it needed (Psychic and
Dark), but it moved Dark from an even attacker to a dominant one:

| | Offence | Defence | Notes |
|---|---|---|---|
| Dragon | +3 | +2 | 4 super-effective, resisted only by Steel |
| **Dark** | **+2** | **+2** | 4 super-effective, only *one* weakness, and 6 of the game's 18 3.0× pairings |
| Light | −1 | **−1** | 2 weaknesses, 1 resistance — now tied with Phantom as the softest type |

The problem is that Dark's designated answer is Light, and Light now loses the
exchange: mutual 2× makes it a race, and Dark is +2/+2 while Light is −1/−1 with
a role described as "one note, not much variety or power".

**Suggested fix, which the role already implies: denial acts first.** Give Light
priority on its denial moves specifically. Countering something reactively is
what denial *is*, and it turns the mutual 2× into a genuine race — Light's edge
is tempo, Dark's is raw power — instead of a race Dark simply wins. It costs
nothing on the chart.

### 1.5 The starter triangle is broken at final stage — needs a decision

The starters now gain a second type when they evolve:

| Line | Basic | Evolved | Final |
|---|---|---|---|
| Fire  | Emberkit | Cindermaw | Pyrelash **Fire/Phantom** |
| Water | Rillet | Tidecalf | Brinemoor **Water/Psychic** |
| Earth | Loambit | Cragmole | Terrabulk **Earth/Steel** |

At basic and evolved stage this is the clean Water → Fire → Earth → Water cycle.
At final stage it is not a cycle at all. Simulated at L50 with a 60-power STAB
move, each using its own better offensive stat:

| Matchup | Hits to KO | Winner |
|---|---|---|
| Pyrelash vs Brinemoor | 2 vs 2 | **Pyrelash** — tied on damage, and it is twice as fast (116 vs 57) |
| Brinemoor vs Terrabulk | 3 vs 2 | Terrabulk |
| Terrabulk vs Pyrelash | 5 vs 2 | **Pyrelash** |

**Pyrelash beats both of the others.** Two separate causes:

1. **Phantom hits Psychic for 2×.** So the Fire starter's second type happens to
   be super-effective against the Water starter's second type, cancelling the
   Water-beats-Fire leg of the cycle.
2. **Earth/Steel is the only dual typing in the entire game that Fire hits for
   3.0×** — Fire is 2× against both halves, so they stack. Meanwhile Terrabulk's
   own two types are *both* resisted by Fire/Phantom, so the best it can manage
   back is 0.5×. That is a 6× swing, and it is between two starters.

#### The cheapest fix: Water/Psychic → **Water/Light**

One type swap. Phantom is neutral into Light, so cause (1) disappears and the
cycle comes back:

| Matchup | Hits to KO | Winner |
|---|---|---|
| Pyrelash vs Brinemoor | 3 vs 2 | Brinemoor ✓ |
| Brinemoor vs Terrabulk | 3 vs 2 | Terrabulk ✓ |
| Terrabulk vs Pyrelash | 5 vs 2 | Pyrelash ✓ |

Water → Fire → Earth → Water, restored. Light also suits Brinemoor better than
Psychic does: §7 gives Light "max SpD, healer/support", and Brinemoor already
runs Tidewater and Steady. Its defensive spread becomes 2× to Earth/Psychic/Dragon
and 0.5× to five types — bulky without being oppressive.

#### Cause (2) is separate and survives the fix

Even with the cycle restored, Fire beats Earth at 3.0× while the other two legs
are 2.0×, and Terrabulk can only answer at 0.5×. Two mitigations, both of which
the design already half-contains:

- **Bedrock** ("cannot be KO'd from full HP in one hit; survives at 1") is
  precisely the insurance a 3× weakness needs, and is already in Terrabulk's
  ability pool. Making it the default active ability turns the matchup from
  "deleted" into "very bad".
- **Terrabulk's offence is the real problem, and it is a movepool problem.** A
  Water-type coverage move reaches Fire/Phantom for 2×. Move pools are unwritten
  anyway, so this costs nothing to fix later.

#### Other options considered

| Option | Effect |
|---|---|
| Fire/Phantom → **Fire/Light** | Also restores the cycle, but loses the ghost-fire concept, which looks like the more interesting design. |
| Earth/Steel → **Earth/Dragon** | Makes all three legs a clean symmetric 2×, and Terrabulk resists three types at 0.25×. But Dragon is meant to be rare, and Steel fits the "smelted, not gathered" flavour. |
| Accept a strict power ranking | Defensible — plenty of games do not keep a final-stage cycle. But a 6× swing between two starters is a lot to hand the player at character-select. |

**Recommendation: Water/Light, plus Bedrock as Terrabulk's default.** It is one
field in `data/mons.json` and it is reversible.

Note this whole analysis depends on the physical/special split, which the spec
still never states (§2). If special moves do not use SpA/SpD, these numbers change.

### 1.4 The 3.0× ceiling is rare, and that is working

Across all 450 attacker × dual-type combinations, exactly 15 reach 3.0×
(3.3%). Dragon accounts for 6 of them and Dark for 3. The additive rule is
doing what it was designed to do: a doubled weakness is a spike, not a
deletion.

---

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

## 6. Naming

Every mon name in the data is a working title. `Emberkit`, `Cindermaw`,
`Pyrelash`, `Rillet`, `Tidecalf`, `Brinemoor`, `Loambit`, `Cragmole`,
`Terrabulk`. The game's own title is also still `MONS`.

## 7. Smaller decisions taken as provisional defaults

Recorded here so they are visible rather than buried in the data:

| Decision | Default taken | Why |
|---|---|---|
| Starter evolution levels | 17 and 34 | 34 is where the growth curve hits exactly 2× base, so the second evolution lands on a real mechanical landmark. |
| Dex catch thresholds | 1, 3, 8, 15, 30, 50, 100 | Seven rungs for the seven allowed entries; front-loaded so the first entries are readable early. |
| Dex entries written | 3 of 7 per starter | The later four want lore the world does not have yet. |
| Starter gender ratio | 50/50 | Nothing in the spec suggests otherwise. |
| `relatedMons` | empty | There are only nine mons; predator/prey needs a real roster. |
| Ability pool inheritance | an evolution keeps its previous stage's whole pool and adds to it | Not stated in the spec, but the 3→4→5 pool sizes strongly imply it. **Confirm this is intended** — it is enforced by a test, so it is cheap to reverse now and expensive later. |

## 8. Questions for the next pass

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
