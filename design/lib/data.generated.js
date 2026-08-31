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
      "category": "tempo",
      "effect": "The first attack of the battle deals 1.5x damage.",
      "$note": "Was a starter signature in the v0.1 roster. Unassigned now, and still a good ability."
    },
    {
      "id": "tidewater",
      "name": "Tidewater",
      "category": "survival",
      "effect": "Heals 1/8 of max HP at end of turn while above half HP.",
      "$note": "Was a starter signature in the v0.1 roster. Unassigned now, and still a good ability."
    },
    {
      "id": "bedrock",
      "name": "Bedrock",
      "category": "survival",
      "effect": "Cannot be KO'd from full HP in one hit; survives at 1 HP.",
      "$note": "Was a starter signature in the v0.1 roster. Unassigned now, and still a good ability."
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
    },
    {
      "id": "aspect-of-flame",
      "name": "Aspect of Flame",
      "category": "signature",
      "signatureType": "Fire",
      "effect": "Contact moves have a 30% chance to apply BURN. Whenever BURN is applied to any creature, gain a +0.25 SPD modifier (+25% SPD).",
      "$note": "Starter signature: Candelite line. Reads other creatures' burns too, not just its own -- it gets faster as the whole field burns."
    },
    {
      "id": "moving-waters",
      "name": "Moving Waters",
      "category": "signature",
      "signatureType": "Water",
      "effect": "While WATER terrain is active, gain a +2 SPD modifier (x3 SPD), and Water moves have a 30% chance to apply a -1 S.DEF modifier to the target.",
      "$note": "Starter signature: Merling line. Conditional on terrain, which nothing yet creates."
    },
    {
      "id": "layered-stone",
      "name": "Layered Stone",
      "category": "signature",
      "signatureType": "Earth",
      "effect": "Gain a +4 DEF modifier (x5 DEF) at the start of battle. Lose 1 from this modifier each time a super-effective move connects, so four super-effective hits strip it entirely.",
      "$note": "Starter signature: Bouldur line. Erodes rather than expiring -- four super-effective hits strip it entirely."
    }
  ]
};

export const monData = {
  "$comment": "Roster v0.2. Starters carry their signature abilities; every entry is status 'concept' -- identity, typing and evolution links are real, stats/abilities/size are null until authored.",
  "version": "0.2",
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
        "name": "Candelite",
        "type1": "Fire",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "basic",
        "stats": null,
        "total": null,
        "abilityPool": [
          "aspect-of-flame"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 2,
          "method": "level",
          "level": 17
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "Fire starter line."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 2,
        "name": "Lanturnn",
        "type1": "Fire",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "evolved",
        "stats": null,
        "total": null,
        "abilityPool": [
          "aspect-of-flame"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 1,
          "method": "level",
          "level": 17
        },
        "evolvesInto": {
          "id": 3,
          "method": "level",
          "level": 34
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 3,
        "name": "Ebberflame",
        "type1": "Fire",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "final",
        "stats": null,
        "total": null,
        "abilityPool": [
          "aspect-of-flame"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 2,
          "method": "level",
          "level": 34
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "Final typing not yet stated. An earlier roster had starters gaining a second type at final stage; unconfirmed here."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 4,
        "name": "Merling",
        "type1": "Water",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "basic",
        "stats": null,
        "total": null,
        "abilityPool": [
          "moving-waters"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 5,
          "method": "level",
          "level": 17
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "Water starter line."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 5,
        "name": "Merful",
        "type1": "Water",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "evolved",
        "stats": null,
        "total": null,
        "abilityPool": [
          "moving-waters"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 4,
          "method": "level",
          "level": 17
        },
        "evolvesInto": {
          "id": 6,
          "method": "level",
          "level": 34
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 6,
        "name": "MerKing",
        "type1": "Water",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "final",
        "stats": null,
        "total": null,
        "abilityPool": [
          "moving-waters"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 5,
          "method": "level",
          "level": 34
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "Final typing not yet stated."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 7,
        "name": "Bouldur",
        "type1": "Earth",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "basic",
        "stats": null,
        "total": null,
        "abilityPool": [
          "layered-stone"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 8,
          "method": "level",
          "level": 17
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "Earth starter line."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 8,
        "name": "Cliffkin",
        "type1": "Earth",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "evolved",
        "stats": null,
        "total": null,
        "abilityPool": [
          "layered-stone"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 7,
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
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 9,
        "name": "Fortruss",
        "type1": "Earth",
        "type2": null,
        "origin": "Natural",
        "body": null,
        "height": null,
        "weight": null,
        "stage": "final",
        "stats": null,
        "total": null,
        "abilityPool": [
          "layered-stone"
        ],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 8,
          "method": "level",
          "level": 34
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "Final typing not yet stated."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 10,
        "name": "Gropper",
        "type1": "Normal",
        "type2": null,
        "origin": "Natural",
        "body": "Grasshopper-like, with giant hind legs.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "Retyped from Earth to Normal. A grasshopper built around giant hind legs reads as mobility, which fits Normal's wide access better than Earth's slow, low-kill-power default."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 11,
        "name": "VisBee",
        "type1": "Earth",
        "type2": null,
        "origin": "Natural",
        "body": "A bee. Fond.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": true,
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 12,
          "method": "unspecified",
          "level": null
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "Evolves into VisGarde; method not stated."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": [
          {
            "id": 13,
            "relation": "led-by"
          },
          {
            "id": 20,
            "relation": "predator"
          }
        ]
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 12,
        "name": "VisGarde",
        "type1": "Earth",
        "type2": "Dark",
        "origin": "Natural",
        "body": "A bee, angry.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 11,
          "method": "unspecified",
          "level": null
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": [
          {
            "id": 13,
            "relation": "led-by"
          }
        ]
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 13,
        "name": "VisBeeQueen",
        "type1": "Dark",
        "type2": "Psychic",
        "origin": "Spirit",
        "body": "A bee. Royalty.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": "A separate creature, not a stage of the VisBee line -- which is why it can be Dark/Psychic and drop the Earth the others carry. Still undecided whether it is reachable from VisBee under special conditions or is simply its own bee. Either way it LEADS the VisBees and VisGardes, which is a standing relationship rather than an evolution."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": [
          {
            "id": 11,
            "relation": "leads"
          },
          {
            "id": 12,
            "relation": "leads"
          }
        ]
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 14,
        "name": "Stilta",
        "type1": "Normal",
        "type2": null,
        "origin": "Natural",
        "body": "Five little guys, acting together. They do not combine into anything.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": true,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": "The five are flavour and staging, not a merge -- Stilta never becomes one larger creature. With Swarm gone they share one HP pool like everything else."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 15,
        "name": "Toll",
        "type1": "Normal",
        "type2": "Phantom",
        "origin": "Natural",
        "body": "A corrupted creature, born from a virus.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 16,
        "name": "Jaxs",
        "type1": "Dark",
        "type2": "Phantom",
        "origin": "Spirit",
        "body": "An evil jack-in-the-box.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": true,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": "Signature: Jack-In-The-Box. Summons a proxy at 35% HP; the proxy blocks all attacks."
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 17,
        "name": "Dusk",
        "type1": "Dark",
        "type2": null,
        "origin": "Spirit",
        "body": "An evil sword.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 18,
          "method": "unspecified",
          "level": null
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 18,
        "name": "DuskNoar",
        "type1": "Dark",
        "type2": "Steel",
        "origin": "Spirit",
        "body": "An evil sword, with teeth.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": true,
        "evolvesFrom": {
          "id": 17,
          "method": "unspecified",
          "level": null
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 19,
        "name": "Bane",
        "type1": "Light",
        "type2": "Steel",
        "origin": "Spirit",
        "body": "A kind sword.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": true,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 20,
        "name": "DrillBee",
        "type1": "Earth",
        "type2": null,
        "origin": "Natural",
        "body": "Wants the VisBee honey at any cost to itself. It survives.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": [
          {
            "id": 11,
            "relation": "prey"
          }
        ]
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 21,
        "name": "TourqueTon",
        "type1": "Steel",
        "type2": null,
        "origin": "Made",
        "body": "A large turtle with a vicious bite.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "material",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 22,
        "name": "BellDum",
        "type1": "Phantom",
        "type2": "Steel",
        "origin": "Spirit",
        "body": "A small, silly bell.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 23,
          "method": "unspecified",
          "level": null
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 23,
        "name": "BellGarde",
        "type1": "Phantom",
        "type2": "Steel",
        "origin": "Spirit",
        "body": "Bells joined together, and no longer silly.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 22,
          "method": "unspecified",
          "level": null
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 24,
        "name": "Sentry X/Y",
        "type1": "Steel",
        "type2": "Psychic",
        "origin": "Made",
        "body": "A horrific construct out of the deep past.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "material",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 25,
        "name": "Pilliduns",
        "type1": "Psychic",
        "type2": "Normal",
        "origin": "Spirit",
        "body": "Tiny creatures that combine to do large things.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 26,
        "name": "Miggoons",
        "type1": "Normal",
        "type2": null,
        "origin": "Natural",
        "body": "Small mice.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 27,
        "name": "Frenfex",
        "type1": "Fire",
        "type2": null,
        "origin": "Natural",
        "body": "A flaming fox.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "birth-group",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 28,
        "name": "Bloom",
        "type1": "Dark",
        "type2": "Water",
        "origin": "Spirit",
        "body": "An evil balloon.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": null,
        "evolvesInto": {
          "id": 29,
          "method": "unspecified",
          "level": null
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 29,
        "name": "BloomGloom",
        "type1": "Dark",
        "type2": "Water",
        "origin": "Spirit",
        "body": "A larger, more evil balloon.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": false,
        "evolvesFrom": {
          "id": 28,
          "method": "unspecified",
          "level": null
        },
        "evolvesInto": {
          "id": 30,
          "method": "unspecified",
          "level": null
        }
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
    },
    {
      "engine": {
        "id": 30,
        "name": "DoomBloom",
        "type1": "Dark",
        "type2": "Water",
        "origin": "Spirit",
        "body": "A genuinely evil blimp.",
        "height": null,
        "weight": null,
        "stage": null,
        "stats": null,
        "total": null,
        "abilityPool": [],
        "learnset": [],
        "learnsetStatus": "pending - move pools TBD",
        "hasSignatureMove": true,
        "evolvesFrom": {
          "id": 29,
          "method": "unspecified",
          "level": null
        },
        "evolvesInto": null
      },
      "dex": {
        "entries": [],
        "whereFound": null,
        "originDetail": {
          "kind": "manifest-condition",
          "value": null
        },
        "evolutionNotes": null
      },
      "misc": {
        "genderRatio": null,
        "castes": null,
        "relatedMons": []
      },
      "status": "concept"
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
    "status": "proposed",
    "$comment": "PROPOSED, not stated by the design. Energy persists between battles, so this is a resource-management system, not a pacing one. Numbers are a first cut; the shape is the part to argue with.",
    "persistsBetweenBattles": true,
    "max": 100,
    "drainPerTurn": 2,
    "defaultMoveCost": 3,
    "$moveCostNote": "Per-move energy cost is move data and does not exist yet; defaultMoveCost stands in.",
    "tiers": [
      {
        "id": "fresh",
        "name": "Fresh",
        "aboveFraction": 0.6,
        "statMultiplier": 1,
        "accuracyMultiplier": 1,
        "moveCostMultiplier": 1
      },
      {
        "id": "worn",
        "name": "Worn",
        "aboveFraction": 0.3,
        "statMultiplier": 0.9,
        "accuracyMultiplier": 0.95,
        "moveCostMultiplier": 1.1
      },
      {
        "id": "spent",
        "name": "Spent",
        "aboveFraction": 0.1,
        "statMultiplier": 0.8,
        "accuracyMultiplier": 0.9,
        "moveCostMultiplier": 1.25
      },
      {
        "id": "exhausted",
        "name": "Exhausted",
        "aboveFraction": 0,
        "statMultiplier": 0.7,
        "accuracyMultiplier": 0.85,
        "moveCostMultiplier": 1.5
      },
      {
        "id": "empty",
        "name": "Empty",
        "aboveFraction": -1,
        "statMultiplier": 0.7,
        "accuracyMultiplier": 0.85,
        "moveCostMultiplier": 1.5,
        "knockedOut": true
      }
    ],
    "$floorNote": "Exhausted is the FLOOR -- penalties stop deepening there, and Empty is no worse except that the mon cannot battle at all. Without this, low energy lowering stats and accuracy while raising cost is a positive feedback loop into losing.",
    "restoration": {
      "status": "proposed",
      "fullRestAtBase": true,
      "itemsRestorePartial": true,
      "benchRegenPerBattle": 5,
      "$benchNote": "A mon not in the active slot recovers a little each battle. This makes ROTATION the core management verb rather than item-spam.",
      "supportsRestoreBoth": true,
      "$supportNote": "Support mons can restore energy AND stamina. This is the in-battle answer to attrition and gives Light and Psychic a job that is always live, which Light in particular needed."
    },
    "emptyResult": "knockout",
    "$emptyNote": "Energy reaching 0 KNOCKS THE MON OUT. Energy is therefore a second health bar, not a soft debuff -- there are two ways to lose a mon, and the Exhausted tier is genuinely dangerous rather than merely inconvenient."
  },
  "affection": {
    "status": "unspecified",
    "$comment": "How attached a mon is to its trainer. Modifies stats by affection points and level, with extra effects at maximum. Per-instance state, not species data.",
    "blockedOn": "Does affection apply in competitive play? A grindable stat bonus breaks any competitive format; the usual answer is that it applies in casual play and is normalised out of ranked.",
    "min": null,
    "max": null,
    "statEffect": null,
    "maxLevelEffects": [],
    "$note": "Persistence was never in doubt; the open question is competitive play, and it is still open."
  },
  "proxy": {
    "status": "specified",
    "$comment": "A proxy is anything that takes a mon's place: Jack-In-The-Box, a decoy, a summon, a substitute. The rule is deliberately absolute.",
    "blocksAllAttacks": true,
    "$blocksNote": "ALL attacks hit the proxy, with no exceptions. Voice does not reach past it; neither does Trap, Ranged or anything else. The only counterplay to a proxy is not attacking.",
    "durations": [
      "turns",
      "untilDestroyed"
    ],
    "hasOwnHP": true,
    "openRules": [
      "Do non-damaging effects (status, stat drops, hazards) pass through to the mon behind it, or are those blocked too? 'Blocks all attacks' does not settle this.",
      "When a hit breaks the proxy, does the excess damage carry through to the mon, or is it absorbed? Absorbed is the safer default.",
      "Can a second proxy be summoned while one is standing? If yes, an untilDestroyed proxy is an unbounded stall engine.",
      "Can a proxy be healed, and does it benefit from the summoner's abilities?"
    ]
  },
  "stamina": {
    "status": "shape-only",
    "$comment": "Per-move uses. Persists between battles, like energy. Distinct axis: stamina limits WHICH move, energy limits HOW LONG the mon can fight at all.",
    "persistsBetweenBattles": true,
    "perMove": true,
    "maxUses": null,
    "$maxUsesNote": "Per-move data. Moves do not exist yet, so there is nothing to put here.",
    "restoration": "Same channels as energy: rest at base, items, and bench recovery.",
    "emptyResult": "struggle"
  },
  "struggle": {
    "status": "proposed",
    "$comment": "What a mon does when every move is out of stamina. PROPOSED -- the design says 'a weak attack that deals recoil damage'; the numbers and the typing question are mine.",
    "power": 25,
    "recoilFractionOfDamageDealt": 0.5,
    "type": null,
    "$typeNote": "PROPOSED TYPELESS -- no STAB, no type effectiveness. If Struggle were Normal-typed it would deal ZERO to Phantom (Normal -> Phantom is 0), so a mon out of stamina could not touch a Phantom at all and both would sit there until energy killed them. Typeless avoids that dead end.",
    "delivery": "body",
    "$deliveryNote": "Contact, so Thorns punishes a flailing mon. A desperate lunge should hurt to make.",
    "costsStamina": false,
    "costsEnergy": true,
    "$costNote": "Struggle still burns energy, so running out of stamina accelerates the run toward the energy KO."
  },
  "statusConditions": {
    "status": "shape-only",
    "$comment": "BURN is the first status condition the design has actually named (Aspect of Flame). The others are referenced by abilities but never defined.",
    "named": [
      {
        "id": "burn",
        "name": "BURN",
        "definedBy": "Aspect of Flame applies it; what it DOES is not stated anywhere.",
        "effect": null
      }
    ],
    "referencedButUndefined": [
      "poison (Built)",
      "sleep (Built)",
      "confusion (Clear Head)"
    ],
    "blockedOn": "What does BURN do? Chip damage, an ATK cut, both? Fireproof already grants immunity to it, so the immunity exists before the condition does."
  },
  "terrain": {
    "status": "proposed",
    "$comment": "One terrain per type -- ten in total. Each grants the buff its type most needs, read straight off that type's stated weakness. PROPOSED: the principle is the design's, the specific buffs are mine.",
    "principle": "A terrain patches exactly the flaw its type's role statement names. Fire is frail, so its terrain gives bulk; Steel is slow, so its terrain gives speed.",
    "activeAtOnce": 1,
    "$activeNote": "PROPOSED. Setting a terrain replaces the one standing. If several could co-exist, terrain-setting types would stack buffs rather than compete for the field.",
    "durationTurns": 5,
    "buffsOnlyItsOwnType": true,
    "$buffNote": "PROPOSED. A terrain buffs creatures of its own type only, which makes it a team tool rather than a neutral field effect -- and keeps Water and Dragon, the two terrain-setting roles, from simply buffing whatever they brought.",
    "terrains": [
      {
        "type": "Normal",
        "id": "steady-ground",
        "name": "Steady Ground",
        "need": "no bonuses of its own",
        "grants": "Move energy costs are reduced 25%",
        "kind": "efficiency"
      },
      {
        "type": "Fire",
        "id": "ashfield",
        "name": "Ashfield",
        "need": "frail",
        "grants": "+0.5 DEF and +0.5 S.DEF modifier (x1.5 each)",
        "kind": "resistance"
      },
      {
        "type": "Water",
        "id": "tide",
        "name": "Tide",
        "need": "frail, usually needs set up",
        "grants": "Restore 1/8 max HP at end of turn",
        "kind": "healing"
      },
      {
        "type": "Earth",
        "id": "rich-soil",
        "name": "Rich Soil",
        "need": "low natural kill power",
        "grants": "+0.5 ATK and +0.5 S.ATK modifier (x1.5 each)",
        "kind": "damage"
      },
      {
        "type": "Steel",
        "id": "forge",
        "name": "Forge",
        "need": "hellah slow",
        "grants": "+1 SPD modifier (x2)",
        "kind": "speed"
      },
      {
        "type": "Psychic",
        "id": "resonance",
        "name": "Resonance",
        "need": "frail",
        "grants": "+0.5 S.DEF modifier, and support moves affect both allies",
        "kind": "resistance"
      },
      {
        "type": "Dark",
        "id": "gloom",
        "name": "Gloom",
        "need": "no recovery if setup fails",
        "grants": "Restore stamina to one move at end of turn",
        "kind": "recovery"
      },
      {
        "type": "Light",
        "id": "radiance",
        "name": "Radiance",
        "need": "one note, not much variety or power",
        "grants": "Move power +25%",
        "kind": "power"
      },
      {
        "type": "Dragon",
        "id": "skyfall",
        "name": "Skyfall",
        "need": "low variety in moves",
        "grants": "Moves cost no stamina",
        "kind": "efficiency"
      },
      {
        "type": "Phantom",
        "id": "veil",
        "name": "Veil",
        "need": "needs set ups and luck",
        "grants": "Conditional effects and procs always trigger",
        "kind": "consistency"
      }
    ],
    "openRules": [
      "Who sets terrain? Water and Dragon are the two 'terrain setup' roles, but nothing in the roster or ability list creates one yet.",
      "Does a terrain persist between battles like energy and stamina, or clear with the battle?",
      "Can a terrain be removed rather than replaced? Light is the denial type and this looks like its job."
    ]
  },
  "statModification": {
    "status": "proposed",
    "$comment": "Abilities and moves apply MODIFIERS to a stat for the duration of a battle. They are multipliers, not permanent stat changes, and they do not touch the creature's stored stats.",
    "rule": "multiplier = max(floor, 1 + sum of active modifiers on that stat)",
    "floor": 0.25,
    "$floorNote": "PROPOSED. The stated rule gives -1 a multiplier of exactly 0, which would zero a stat. The floor is 0.25, matching the type chart's floor, so the worst case is a quarter of the stat rather than none of it. The alternative shape for negatives is 1/(1+|sum|), which makes -1 a halving instead; unconfirmed either way.",
    "examples": [
      {
        "modifier": 0.25,
        "multiplier": 1.25,
        "source": "Aspect of Flame, per BURN applied",
        "reading": "+25% SPD"
      },
      {
        "modifier": 2,
        "multiplier": 3,
        "source": "Moving Waters in WATER terrain",
        "reading": "+200% SPD"
      },
      {
        "modifier": 4,
        "multiplier": 5,
        "source": "Layered Stone at battle start",
        "reading": "+400% DEF, eroding by 1 per super-effective hit"
      },
      {
        "modifier": -1,
        "multiplier": 0.25,
        "source": "Moving Waters' Water-move proc",
        "reading": "floored; the unfloored rule would give 0"
      }
    ],
    "$scope": "Battle-only. Modifiers clear when the battle ends and never alter stored stats."
  },
  "damageOverTime": {
    "status": "specified",
    "$comment": "The general shape for every damage-over-time effect: X damage per turn scaling with level, for Y turns. BURN is the first instance.",
    "rule": "per-turn damage scales linearly from minDamage at level 1 to maxDamage at capLevel, then stays flat; duration is rolled in [minTurns, maxTurns]",
    "$capNote": "Levels run to 99. BURN caps at level 40, so the last 59 levels buy no extra burn -- the same shape crit uses, which caps at 60.",
    "effects": [
      {
        "id": "burn",
        "name": "BURN",
        "category": "special",
        "minDamage": 5,
        "maxDamage": 15,
        "capLevel": 40,
        "minTurns": 3,
        "maxTurns": 4,
        "$note": "Applied by Aspect of Flame's contact moves at 30%. Fireproof grants immunity.",
        "$durationNote": "Narrowed from 2-5. At 2-5 the duration roll swung the result 2.5x at every level, which was a bigger factor than 39 levels of growth; 3-4 makes it 1.33x."
      }
    ],
    "openRules": [
      "Is the per-turn damage reduced by S.DEF, or is 'special damage' only saying it is not physical? Flat is assumed here.",
      "Does re-applying BURN refresh the duration, stack a second instance, or do nothing?",
      "Does the damage tick at end of turn, and can it knock a creature out?"
    ],
    "$durationNote": "Duration ranges should stay narrow. The roll is a coin flip neither player controls, so a wide one makes the effect swingier than any decision in the fight."
  }
};
