// GENERATED FILE -- DO NOT EDIT.
// Source: design/data/*.json. Regenerate with: npm run build
// This exists so the same rules module runs in Node and in the browser.

export const typeData = {
  "$comment": "Canonical type chart. Mirrors SPEC.md sections 1-4. Values are attacker -> defender multipliers; any pair omitted from 'chart' is 1 (normal).",
  "version": "0.1",
  "types": [
    "Normal",
    "Fire",
    "Water",
    "Earth",
    "Steel",
    "Psychic",
    "Dark",
    "Light",
    "Dragon",
    "Phantom"
  ],
  "origins": {
    "Natural": [
      "Fire",
      "Water",
      "Earth",
      "Normal",
      "Dragon"
    ],
    "Made": [
      "Steel"
    ],
    "Spirit": [
      "Psychic",
      "Dark",
      "Light",
      "Phantom"
    ]
  },
  "chart": {
    "Normal": {
      "Steel": 0.5,
      "Phantom": 0
    },
    "Fire": {
      "Earth": 2,
      "Steel": 2,
      "Fire": 0.5,
      "Water": 0.5,
      "Dragon": 0.5
    },
    "Water": {
      "Fire": 2,
      "Steel": 2,
      "Water": 0.5,
      "Earth": 0.5,
      "Dragon": 0.5
    },
    "Earth": {
      "Water": 2,
      "Steel": 2,
      "Earth": 0.5,
      "Fire": 0.5,
      "Dragon": 0.5
    },
    "Steel": {
      "Normal": 2,
      "Fire": 0.5,
      "Water": 0.5,
      "Earth": 0.5,
      "Steel": 0.5,
      "Dragon": 0.5
    },
    "Psychic": {
      "Dragon": 2,
      "Steel": 2,
      "Psychic": 0.5,
      "Dark": 0.5,
      "Normal": 0
    },
    "Dark": {
      "Psychic": 2,
      "Normal": 2,
      "Phantom": 2,
      "Light": 2,
      "Dark": 0.5,
      "Steel": 0.5
    },
    "Light": {
      "Dark": 2,
      "Phantom": 2,
      "Psychic": 0.5,
      "Steel": 0.5
    },
    "Dragon": {
      "Fire": 2,
      "Water": 2,
      "Earth": 2,
      "Dragon": 2,
      "Steel": 0.5
    },
    "Phantom": {
      "Psychic": 2,
      "Phantom": 2,
      "Dark": 0.5,
      "Normal": 0
    }
  },
  "stacking": {
    "mode": "additive",
    "$comment": "Each defending type contributes a percentage; sum, then look up. Immunity on either type short-circuits to 0 and is checked before the sum.",
    "contribution": {
      "1": 0,
      "2": 100,
      "0.5": -50
    },
    "table": {
      "0": 1,
      "50": 1.5,
      "100": 2,
      "200": 3,
      "-50": 0.5,
      "-100": 0.25
    },
    "floorPercent": -100,
    "immunityMultiplier": 0
  },
  "stab": {
    "mono": 1.5,
    "dual": 1.25
  }
};

export const abilityData = {
  "$comment": "Shared ability pool. Mirrors SPEC.md section 8. 'effect' is design intent in prose; there is no engine yet to encode it against.",
  "version": "0.1",
  "target": "50-60 shared abilities",
  "abilities": [
    {
      "id": "kindling",
      "name": "Kindling",
      "category": "signature",
      "signatureType": "Fire",
      "effect": "The first attack of the battle deals 1.5x damage."
    },
    {
      "id": "tidewater",
      "name": "Tidewater",
      "category": "signature",
      "signatureType": "Water",
      "effect": "Heals 1/8 of max HP at end of turn while above half HP."
    },
    {
      "id": "bedrock",
      "name": "Bedrock",
      "category": "signature",
      "signatureType": "Earth",
      "effect": "Cannot be KO'd from full HP in one hit; survives at 1 HP."
    },
    {
      "id": "brawny",
      "name": "Brawny",
      "category": "stat-bump",
      "effect": "+3 ATK."
    },
    {
      "id": "sharp-mind",
      "name": "Sharp Mind",
      "category": "stat-bump",
      "effect": "+3 SpA."
    },
    {
      "id": "thick-hide",
      "name": "Thick Hide",
      "category": "stat-bump",
      "effect": "+3 DEF."
    },
    {
      "id": "steady",
      "name": "Steady",
      "category": "stat-bump",
      "effect": "+3 SpD."
    },
    {
      "id": "quick-feet",
      "name": "Quick Feet",
      "category": "stat-bump",
      "effect": "+3 SPD."
    },
    {
      "id": "overgrown",
      "name": "Overgrown",
      "category": "stat-bump",
      "effect": "+10% max HP."
    },
    {
      "id": "fireproof",
      "name": "Fireproof",
      "category": "immunity",
      "effect": "Cannot be burned."
    },
    {
      "id": "anchored",
      "name": "Anchored",
      "category": "immunity",
      "effect": "Cannot be switched out or moved.",
      "conflictsWith": [
        "ambush"
      ]
    },
    {
      "id": "clear-head",
      "name": "Clear Head",
      "category": "immunity",
      "effect": "Immune to confusion and to stat drops."
    },
    {
      "id": "cold-blood",
      "name": "Cold Blood",
      "category": "immunity",
      "effect": "Immune to Dark intimidate effects."
    },
    {
      "id": "grounded",
      "name": "Grounded",
      "category": "immunity",
      "effect": "Immune to Earth hazards."
    },
    {
      "id": "drink-deep",
      "name": "Drink Deep",
      "category": "absorb",
      "effect": "Water moves heal instead of damaging."
    },
    {
      "id": "ember-heart",
      "name": "Ember Heart",
      "category": "absorb",
      "effect": "Fire moves heal instead of damaging."
    },
    {
      "id": "mind-sponge",
      "name": "Mind Sponge",
      "category": "absorb",
      "effect": "Psychic hits raise SpA instead of damaging."
    },
    {
      "id": "ambush",
      "name": "Ambush",
      "category": "tempo",
      "effect": "Moves first on the turn it enters.",
      "conflictsWith": [
        "anchored",
        "windup"
      ]
    },
    {
      "id": "slow-burn",
      "name": "Slow Burn",
      "category": "tempo",
      "effect": "Always moves last; deals +20% damage."
    },
    {
      "id": "windup",
      "name": "Windup",
      "category": "tempo",
      "effect": "-3 SPD; moves first on every 3rd turn.",
      "conflictsWith": [
        "ambush"
      ]
    },
    {
      "id": "last-stand",
      "name": "Last Stand",
      "category": "survival",
      "effect": "Below 1/3 HP, ATK and SpA are raised 50%."
    },
    {
      "id": "thorns",
      "name": "Thorns",
      "category": "survival",
      "effect": "An attacker making contact takes 1/8 of its own max HP."
    },
    {
      "id": "grudge",
      "name": "Grudge",
      "category": "survival",
      "effect": "On being KO'd, the killing move loses all remaining uses."
    },
    {
      "id": "colony",
      "name": "Colony",
      "category": "hook",
      "effect": "Has bodies instead of HP; each body lost is one fewer hit it can make."
    },
    {
      "id": "royal",
      "name": "Royal",
      "category": "hook",
      "effect": "Allied Swarm mons regain one body at end of turn."
    },
    {
      "id": "built",
      "name": "Built",
      "category": "hook",
      "effect": "Immune to poison, burn and sleep; takes 1.5x damage from Water."
    },
    {
      "id": "unreal",
      "name": "Unreal",
      "category": "hook",
      "effect": "Immune to Normal moves."
    },
    {
      "id": "lucky-day",
      "name": "Lucky Day",
      "category": "chaos",
      "effect": "On any turn whose count is a multiple of 7, always moves first and always crits."
    }
  ]
};

export const monData = {
  "$comment": "Mon roster. Each entry is the JSON encoding of the three-tab template in SPEC.md section 9. Names are working titles. Learnsets are empty because move pools are TBD in v0.1 -- see OPEN_QUESTIONS.md section 3.",
  "version": "0.1",
  "catchThresholds": [
    1,
    3,
    8,
    15,
    30,
    50,
    100
  ],
  "mons": [
    {
      "engine": {
        "id": 1,
        "name": "Emberkit",
        "type1": "Fire",
        "type2": null,
        "origin": "Natural",
        "body": "Quadruped, hand-sized. Coat of fine ash that lifts when it runs.",
        "height": 0.3,
        "weight": 4.5,
        "stage": "basic",
        "stats": {
          "hp": 15,
          "atk": 22,
          "def": 13,
          "spa": 15,
          "spd": 13,
          "spe": 27
        },
        "total": 105,
        "abilityPool": [
          "kindling",
          "quick-feet",
          "brawny"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 4,
          "method": "level",
          "level": 17
        }
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "Runs before it can stand. Trainers find them by the scorch-line of pawprints, never by the animal itself."
          },
          {
            "threshold": 3,
            "text": "The ash on its coat is spent fuel. A healthy Emberkit sheds a fingerprint's worth every hour and is always faintly warm to hold."
          },
          {
            "threshold": 8,
            "text": "It strikes hardest the moment it is loosed and softens thereafter. Old handlers say the trick is to make the first exchange the only one that matters."
          }
        ],
        "whereFound": "Dry scrub and burn scars, in the first season after a fire.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Litters of two to four, born in the ash bed of a spent fire."
        },
        "evolutionNotes": "Evolves as its coat thickens past what it can shed, forcing the heat inward."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    },
    {
      "engine": {
        "id": 4,
        "name": "Cindermaw",
        "type1": "Fire",
        "type2": null,
        "origin": "Natural",
        "body": "Long-limbed, knee-high. Jaw vents heat when it breathes out.",
        "height": 0.6,
        "weight": 14,
        "stage": "evolved",
        "stats": {
          "hp": 18,
          "atk": 30,
          "def": 16,
          "spa": 18,
          "spd": 16,
          "spe": 37
        },
        "total": 135,
        "abilityPool": [
          "kindling",
          "quick-feet",
          "brawny",
          "last-stand"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": {
          "id": 1,
          "method": "level",
          "level": 17
        },
        "evolvesInto": {
          "id": 5,
          "method": "level",
          "level": 34
        }
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "It no longer sheds. Everything it used to give off to the air now goes down its throat and stays there."
          },
          {
            "threshold": 3,
            "text": "Fast enough to open and close a fight before the other animal has turned to face it. It has no plan for a fight that lasts."
          },
          {
            "threshold": 8,
            "text": "Cornered and hurt, it burns hotter -- which is the whole problem with it, and the reason it rarely reaches its third year in the wild."
          }
        ],
        "whereFound": "Evolves from Emberkit. Wild specimens hold territory along ridgelines.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Does not breed at this stage."
        },
        "evolutionNotes": "The jaw vents open at maturity. Handlers file the change under 'the animal deciding what to do with what it can no longer let go of'."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    },
    {
      "engine": {
        "id": 5,
        "name": "Pyrelash",
        "type1": "Fire",
        "type2": "Phantom",
        "origin": "Natural",
        "body": "Shoulder-height, whip-tailed. Leaves a standing line of heat behind a charge.",
        "height": 1.4,
        "weight": 52,
        "stage": "final",
        "stats": {
          "hp": 22,
          "atk": 40,
          "def": 20,
          "spa": 22,
          "spd": 19,
          "spe": 47
        },
        "total": 170,
        "abilityPool": [
          "kindling",
          "quick-feet",
          "brawny",
          "last-stand",
          "ember-heart"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": {
          "id": 4,
          "method": "level",
          "level": 34
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "The fastest thing on four legs in its range, and it knows the number exactly. It will not start a chase it has already lost."
          },
          {
            "threshold": 3,
            "text": "The line of heat behind a charge hangs in the air long enough to read. Trackers follow it the way they would follow a wake."
          },
          {
            "threshold": 8,
            "text": "It drinks fire. A Pyrelash walked into a burning stand of scrub will come out of it heavier than it went in."
          }
        ],
        "whereFound": "Evolves from Cindermaw. Not found wild at this stage.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Breeding pairs hold a burn scar between them for as long as it stays open ground."
        },
        "evolutionNotes": "Final stage of the Fire starter line. Gains Phantom: what the line spent two stages swallowing does not stay wholly in the body. The standing line of heat behind a charge is the visible part of it."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    },
    {
      "engine": {
        "id": 2,
        "name": "Rillet",
        "type1": "Water",
        "type2": null,
        "origin": "Natural",
        "body": "Otter-shaped, forearm-length. Fur sheds water so completely it is dry the moment it surfaces.",
        "height": 0.4,
        "weight": 6,
        "stage": "basic",
        "stats": {
          "hp": 18,
          "atk": 15,
          "def": 17,
          "spa": 20,
          "spd": 20,
          "spe": 15
        },
        "total": 105,
        "abilityPool": [
          "tidewater",
          "drink-deep",
          "steady"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 6,
          "method": "level",
          "level": 17
        }
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "Keeps to water shallow enough to stand in. It is a poor swimmer and an excellent waiter."
          },
          {
            "threshold": 3,
            "text": "It mends while it is still winning and stops the moment it starts losing, which is either very sensible or exactly backwards depending on who you ask."
          },
          {
            "threshold": 8,
            "text": "Water thrown at a Rillet is water given to it. Every handler learns this once, usually in front of other handlers."
          }
        ],
        "whereFound": "Streams, drainage ditches, and the slow ends of rivers.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Single pups, born in a bank hollow above the waterline."
        },
        "evolutionNotes": "Evolves once it can hold its own weight against a current."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    },
    {
      "engine": {
        "id": 6,
        "name": "Tidecalf",
        "type1": "Water",
        "type2": null,
        "origin": "Natural",
        "body": "Barrel-chested, knee-high. Moves on land like something that would rather not.",
        "height": 0.7,
        "weight": 38,
        "stage": "evolved",
        "stats": {
          "hp": 23,
          "atk": 19,
          "def": 22,
          "spa": 26,
          "spd": 26,
          "spe": 19
        },
        "total": 135,
        "abilityPool": [
          "tidewater",
          "drink-deep",
          "steady",
          "sharp-mind"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": {
          "id": 2,
          "method": "level",
          "level": 17
        },
        "evolvesInto": {
          "id": 7,
          "method": "level",
          "level": 34
        }
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "Slow on every axis and hard to move off any of them. It wins by still being there."
          },
          {
            "threshold": 3,
            "text": "It can hold a stretch of shallow water against animals twice its weight, and does so without ever appearing to have decided to."
          },
          {
            "threshold": 8,
            "text": "Bulls call across open water at dusk. The sound carries far enough that two Tidecalves who have never met can agree on a boundary."
          }
        ],
        "whereFound": "Evolves from Rillet. Wild specimens hold estuary shallows.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Loose herds of six to ten, without hierarchy."
        },
        "evolutionNotes": "Gains the depth to hunt below the surface rather than from it."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    },
    {
      "engine": {
        "id": 7,
        "name": "Brinemoor",
        "type1": "Water",
        "type2": "Psychic",
        "origin": "Natural",
        "body": "Bulk of a small boat. Carries a standing swell around itself in still water.",
        "height": 2.6,
        "weight": 340,
        "stage": "final",
        "stats": {
          "hp": 29,
          "atk": 24,
          "def": 28,
          "spa": 33,
          "spd": 33,
          "spe": 23
        },
        "total": 170,
        "abilityPool": [
          "tidewater",
          "drink-deep",
          "steady",
          "sharp-mind",
          "overgrown"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": {
          "id": 6,
          "method": "level",
          "level": 34
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "It has no fast answer to anything and does not need one. Fights against a Brinemoor are lost slowly."
          },
          {
            "threshold": 3,
            "text": "The swell it carries is not decoration. It is the animal keeping a working depth of water around itself at all times."
          },
          {
            "threshold": 8,
            "text": "Mending faster than it is being hurt is its whole strategy, and against a patient opponent it is not enough. Against an impatient one it has never once failed."
          }
        ],
        "whereFound": "Evolves from Tidecalf. Not found wild at this stage.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Pairs hold a stretch of coast for life and tolerate juveniles of any line within it."
        },
        "evolutionNotes": "Final stage of the Water starter line. Gains Psychic: the call a Tidecalf uses to agree a boundary becomes, at this size, something closer to a conversation held across open water."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    },
    {
      "engine": {
        "id": 3,
        "name": "Loambit",
        "type1": "Earth",
        "type2": null,
        "origin": "Natural",
        "body": "Squat digger, two hands' span. Plated across the shoulders and back.",
        "height": 0.3,
        "weight": 9,
        "stage": "basic",
        "stats": {
          "hp": 22,
          "atk": 23,
          "def": 22,
          "spa": 10,
          "spd": 15,
          "spe": 13
        },
        "total": 105,
        "abilityPool": [
          "bedrock",
          "thick-hide",
          "grounded"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 8,
          "method": "level",
          "level": 17
        }
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "Digs before it fights and fights only where it has already dug."
          },
          {
            "threshold": 3,
            "text": "A healthy Loambit cannot be taken down in one blow from full health. It will be standing at the end of it, badly, and that is generally enough."
          },
          {
            "threshold": 8,
            "text": "It reads ground the way other animals read weather. Nothing buried in soil has ever caught one."
          }
        ],
        "whereFound": "Turned earth, riverbanks, and the spoil heaps outside quarries.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Clutches of three to six, in a chamber a body-length down."
        },
        "evolutionNotes": "Evolves when its shoulder plates fuse into a single working shield."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    },
    {
      "engine": {
        "id": 8,
        "name": "Cragmole",
        "type1": "Earth",
        "type2": null,
        "origin": "Natural",
        "body": "Thigh-high, front-heavy. Forelimbs ending in single fused blades.",
        "height": 0.9,
        "weight": 62,
        "stage": "evolved",
        "stats": {
          "hp": 28,
          "atk": 30,
          "def": 29,
          "spa": 12,
          "spd": 19,
          "spe": 17
        },
        "total": 135,
        "abilityPool": [
          "bedrock",
          "thick-hide",
          "grounded",
          "thorns"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": {
          "id": 3,
          "method": "level",
          "level": 17
        },
        "evolvesInto": {
          "id": 9,
          "method": "level",
          "level": 34
        }
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "The blades are for rock. It has learned they work on other things and has not thought much further about it."
          },
          {
            "threshold": 3,
            "text": "Its plates are edged. Anything that closes with a Cragmole pays for the contact whether the Cragmole does anything about it or not."
          },
          {
            "threshold": 8,
            "text": "Quarry crews have followed Cragmole workings to seams they had missed. The animal is a better surveyor than most surveyors."
          }
        ],
        "whereFound": "Evolves from Loambit. Wild specimens work the same tunnel system for years.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Solitary once the plates fuse."
        },
        "evolutionNotes": "Trades the last of its speed for the forelimbs."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    },
    {
      "engine": {
        "id": 9,
        "name": "Terrabulk",
        "type1": "Earth",
        "type2": "Steel",
        "origin": "Natural",
        "body": "Shoulder-height and twice as long. Carries a course of set stone across its back.",
        "height": 1.6,
        "weight": 410,
        "stage": "final",
        "stats": {
          "hp": 35,
          "atk": 38,
          "def": 37,
          "spa": 15,
          "spd": 24,
          "spe": 21
        },
        "total": 170,
        "abilityPool": [
          "bedrock",
          "thick-hide",
          "grounded",
          "thorns",
          "slow-burn"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "evolvesFrom": {
          "id": 8,
          "method": "level",
          "level": 34
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [
          {
            "threshold": 1,
            "text": "It moves last in almost every exchange and hits hardest in almost every exchange. The two facts are the same fact."
          },
          {
            "threshold": 3,
            "text": "The stone on its back is set, not grown, and it sets it itself. No two are alike and none of them are structurally unsound."
          },
          {
            "threshold": 8,
            "text": "It cannot be taken out of a fight from full health, cannot be hurried, and cannot be gone around. Handlers describe working with one as negotiating with a hillside."
          }
        ],
        "whereFound": "Evolves from Cragmole. Not found wild at this stage.",
        "originDetail": {
          "kind": "birth-group",
          "value": "Solitary. Meets others only to breed, and returns to its own workings after."
        },
        "evolutionNotes": "Final stage of the Earth starter line. Gains Steel: the course of stone it sets across its back is smelted, not gathered. It is the only thing in the line that makes rather than moves material."
      },
      "misc": {
        "genderRatio": {
          "male": 0.5,
          "female": 0.5
        },
        "castes": null,
        "relatedMons": []
      }
    }
  ]
};

export const mechanicsData = {
  "$comment": "Systems that are not types, stats or creatures. Mirrors SPEC.md sections 4.2 (crit), 9 (move delivery) and 12 (energy, affection). Anything marked status 'unspecified' has a shape but no numbers yet, deliberately -- see OPEN_QUESTIONS.md.",
  "version": "0.1",
  "crit": {
    "status": "specified",
    "$comment": "Crit chance rises with level and then stops. Moves and abilities modify chance and damage separately.",
    "baseChance": 0.05,
    "maxChance": 0.15,
    "capLevel": 60,
    "$capNote": "Levels run to 99; chance is flat at maxChance from capLevel onward.",
    "damageMultiplier": 1.5,
    "$damageNote": "PROVISIONAL. Placeholder inherited from lib/damage.js; never stated in the design."
  },
  "moveDelivery": {
    "status": "specified",
    "$comment": "Every move has exactly one delivery class. The class decides contact, which is what abilities like Thorns key off.",
    "classes": [
      {
        "id": "punch",
        "name": "Punch",
        "contact": true,
        "note": "Struck with a limb or appendage."
      },
      {
        "id": "kick",
        "name": "Kick",
        "contact": true,
        "note": "Struck with the lower body."
      },
      {
        "id": "body",
        "name": "Body",
        "contact": true,
        "note": "The whole creature is the weapon. Height and weight feed these."
      },
      {
        "id": "ranged",
        "name": "Ranged",
        "contact": false,
        "note": "Projectile or emission. Usually special."
      },
      {
        "id": "voice",
        "name": "Voice",
        "contact": false,
        "note": "Sound. Reaches things a projectile would not."
      },
      {
        "id": "trap",
        "name": "Trap",
        "contact": false,
        "note": "Placed rather than aimed; resolves on a condition."
      }
    ]
  },
  "size": {
    "status": "specified",
    "$comment": "Flavour first, but some moves read them. Metric, per species.",
    "heightUnit": "m",
    "weightUnit": "kg",
    "weightRatioCap": 4,
    "$capNote": "PROPOSED. Ceiling on any weight-ratio term in a damage calc, so a very heavy mon against a very light one cannot produce an unbounded multiplier."
  },
  "energy": {
    "status": "unspecified",
    "$comment": "A pool separate from stamina (which is per-move uses). Falls over time; as it falls it degrades stats, accuracy, and raises move cost. Shape is recorded here so it can be filled in; the numbers are NOT invented because they depend on a decision that has not been made -- see OPEN_QUESTIONS.md section 6.1.",
    "blockedOn": "Does energy persist between battles, or reset each battle? That decides whether this is a combat mechanic or a resource-management one, and every number below follows from it.",
    "max": null,
    "drainPerTurn": null,
    "thresholds": [],
    "$thresholdShape": {
      "atOrBelow": "fraction of max",
      "statMultiplier": null,
      "accuracyMultiplier": null,
      "moveCostMultiplier": null
    },
    "floor": null,
    "$floorNote": "A floor is required. Low energy lowering stats AND accuracy AND raising cost is a positive feedback loop into losing; without a floor the loser cannot recover."
  },
  "affection": {
    "status": "unspecified",
    "$comment": "How attached a mon is to its trainer. Modifies stats by affection points and level, with extra effects at maximum. Per-instance state, not species data.",
    "blockedOn": "Does affection apply in competitive play? A grindable stat bonus breaks any competitive format; the usual answer is that it applies in casual play and is normalised out of ranked.",
    "min": null,
    "max": null,
    "statEffect": null,
    "maxLevelEffects": []
  }
};
