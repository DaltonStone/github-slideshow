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
    },
    {
      "id": "aspect-of-flame",
      "name": "Aspect of Flame",
      "category": "signature",
      "signatureType": "Fire",
      "effect": "Contact moves have a 30% chance to apply BURN. Whenever BURN is applied to any creature, gain 0.25 SPD.",
      "$note": "Starter signature: Candelite line. Reads other creatures' burns too, not just its own -- it gets faster as the whole field burns."
    },
    {
      "id": "moving-waters",
      "name": "Moving Waters",
      "category": "signature",
      "signatureType": "Water",
      "effect": "While WATER terrain is active, gain +2 SPD, and Water moves have a 30% chance to lower the target's S.DEF by 1.",
      "$note": "Starter signature: Merling line. Conditional on terrain, which nothing yet creates."
    },
    {
      "id": "layered-stone",
      "name": "Layered Stone",
      "category": "signature",
      "signatureType": "Earth",
      "effect": "Gain +4 DEF at the start of battle. Lose 1 DEF from this ability each time a super-effective move connects.",
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
        "type1": "Earth",
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
        "relatedMons": []
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
        "relatedMons": []
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
        "evolutionNotes": "UNRESOLVED: not marked as an evolution, and its typing drops the Earth the rest of the line carries. Likely a caste rather than a stage."
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
        "id": 14,
        "name": "Stilta",
        "type1": "Normal",
        "type2": null,
        "origin": "Natural",
        "body": "A group of five little guys.",
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
        "relatedMons": []
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
    "status": "shape-only",
    "$comment": "WATER terrain is the first terrain the design has named (Moving Waters). Water and Dragon are both 'terrain setup' roles, so this system is load-bearing for two types.",
    "named": [
      {
        "id": "water",
        "name": "WATER",
        "definedBy": "Moving Waters reads it.",
        "effect": null,
        "setBy": null
      }
    ],
    "blockedOn": "Nothing in the roster or ability list CREATES terrain yet, so Moving Waters is currently a dead ability. What sets WATER terrain, how long does it last, and can more than one terrain be active?"
  },
  "statModification": {
    "status": "shape-only",
    "$comment": "The new starter abilities modify stats in three different grains: +4 DEF, +2 SPD, 0.25 SPD, and 'lower S.DEF by 1'.",
    "blockedOn": "Are these flat points on the stat, or stages on a multiplier ladder? v0.1 abilities used flat points (+3 ATK), which suggests flat -- but 'lower S.DEF by 1' reads like a stage, and 0.25 only makes sense as a fraction of something.",
    "$why": "With base stats this small (13-27 SPD on a basic), +2 flat is a large bonus and 0.25 flat is nearly nothing until it stacks. The two readings give very different balance."
  }
};
