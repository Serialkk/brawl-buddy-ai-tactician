
export interface Brawler {
  id: number;
  name: string;
  role: string;
  rarity: string;
  image: string;
  stats: {
    health: number;
    damage: number;
    speed: string;
    range: string;
  };
  abilities: {
    basic: string;
    super: string;
    gadget1: string;
    gadget2?: string;
    starPower1: string;
    starPower2?: string;
  };
}

export const brawlerRoles = [
  "Damage Dealer", 
  "Tank", 
  "Assassin", 
  "Support", 
  "Controller", 
  "Marksman", 
  "Thrower", 
  "Hybrid"
];

// Data sourced from brawltime.ninja
export const brawlers: Brawler[] = [
  {
    id: 1,
    name: "Shelly",
    role: "Damage Dealer",
    rarity: "Starting Brawler",
    image: "/brawlers/shelly.png", 
    stats: {
      health: 5600,
      damage: 1680,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "Buckshot",
      super: "Super Shell",
      gadget1: "Clay Pigeons",
      gadget2: "Shell Shock",
      starPower1: "Band-Aid",
      starPower2: "Shell Shock"
    }
  },
  {
    id: 2,
    name: "Colt",
    role: "Damage Dealer",
    rarity: "Trophy Road",
    image: "/brawlers/colt.png",
    stats: {
      health: 3600,
      damage: 420,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Six-Shooters",
      super: "Bullet Storm",
      gadget1: "Speedloader",
      gadget2: "Silver Bullet",
      starPower1: "Slick Boots",
      starPower2: "Magnum Special"
    }
  },
  {
    id: 3,
    name: "Brock",
    role: "Marksman",
    rarity: "Trophy Road",
    image: "/brawlers/brock.png",
    stats: {
      health: 3600,
      damage: 1540,
      speed: "Normal",
      range: "Very Long"
    },
    abilities: {
      basic: "Rocket Launcher",
      super: "Rocket Rain",
      gadget1: "Rocket Laces",
      gadget2: "Rocket Fuel",
      starPower1: "Incendiary",
      starPower2: "Rocket No.4"
    }
  },
  {
    id: 4,
    name: "Bull",
    role: "Tank",
    rarity: "Trophy Road",
    image: "/brawlers/bull.png",
    stats: {
      health: 7000,
      damage: 2100,
      speed: "Normal",
      range: "Short"
    },
    abilities: {
      basic: "Double-Barrel",
      super: "Bulldozer",
      gadget1: "T-Bone Injector",
      gadget2: "Stomper",
      starPower1: "Berserker",
      starPower2: "Tough Guy"
    }
  },
  {
    id: 5,
    name: "Jessie",
    role: "Damage Dealer",
    rarity: "Trophy Road",
    image: "/brawlers/jessie.png",
    stats: {
      health: 4200,
      damage: 1200,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Shock Rifle",
      super: "Scrappy!",
      gadget1: "Spark Plug",
      gadget2: "Recoil Spring",
      starPower1: "Energize",
      starPower2: "Shocky"
    }
  },
  {
    id: 6,
    name: "Nita",
    role: "Hybrid",
    rarity: "Trophy Road",
    image: "/brawlers/nita.png",
    stats: {
      health: 5600,
      damage: 1160,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "Rupture",
      super: "Bear",
      gadget1: "Bear Paws",
      gadget2: "Faux Fur",
      starPower1: "Bear With Me",
      starPower2: "Hyper Bear"
    }
  },
  {
    id: 7,
    name: "Dynamike",
    role: "Thrower",
    rarity: "Trophy Road",
    image: "/brawlers/dynamike.png",
    stats: {
      health: 3800,
      damage: 1060,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Short Fuse",
      super: "Barrel O' Boom",
      gadget1: "Fidget Spinner",
      gadget2: "Satchel Charge",
      starPower1: "Dyna-Jump",
      starPower2: "Demolition"
    }
  },
  {
    id: 8,
    name: "El Primo",
    role: "Tank",
    rarity: "Rare",
    image: "/brawlers/el-primo.png",
    stats: {
      health: 8400,
      damage: 2160,
      speed: "Fast",
      range: "Very Short"
    },
    abilities: {
      basic: "Fists of Fury",
      super: "Flying Elbow Drop",
      gadget1: "Suplex Supplement",
      gadget2: "Asteroid Belt",
      starPower1: "El Fuego",
      starPower2: "Meteor Rush"
    }
  },
  {
    id: 9,
    name: "Barley",
    role: "Thrower",
    rarity: "Rare",
    image: "/brawlers/barley.png",
    stats: {
      health: 3600,
      damage: 970,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Undiluted",
      super: "Last Call",
      gadget1: "Sticky Syrup Mixer",
      gadget2: "Herbal Tonic",
      starPower1: "Medical Use",
      starPower2: "Extra Noxious"
    }
  },
  {
    id: 10,
    name: "Poco",
    role: "Support",
    rarity: "Rare",
    image: "/brawlers/poco.png",
    stats: {
      health: 5600,
      damage: 980,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Power Chord",
      super: "Encore",
      gadget1: "Tuning Fork",
      gadget2: "Protective Tunes",
      starPower1: "Da Capo!",
      starPower2: "Screeching Solo"
    }
  },
  {
    id: 11,
    name: "Rosa",
    role: "Tank",
    rarity: "Rare",
    image: "/brawlers/rosa.png",
    stats: {
      health: 7700,
      damage: 690,
      speed: "Normal",
      range: "Short"
    },
    abilities: {
      basic: "Hands of Stone",
      super: "Strong Stuff",
      gadget1: "Grow Light",
      gadget2: "Unfriendly Bushes",
      starPower1: "Plant Life",
      starPower2: "Thorny Gloves"
    }
  },
  {
    id: 12,
    name: "Rico",
    role: "Damage Dealer",
    rarity: "Super Rare",
    image: "/brawlers/rico.png",
    stats: {
      health: 3800,
      damage: 420,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Bouncy Bullets",
      super: "Trick Shot",
      gadget1: "Multiball Launcher",
      gadget2: "Bouncy Castle",
      starPower1: "Super Bouncy",
      starPower2: "Robo Retreat"
    }
  },
  {
    id: 13,
    name: "Darryl",
    role: "Hybrid",
    rarity: "Super Rare",
    image: "/brawlers/darryl.png",
    stats: {
      health: 7000,
      damage: 3080,
      speed: "Normal",
      range: "Short"
    },
    abilities: {
      basic: "Double Barrel",
      super: "Barrel Roll",
      gadget1: "Recoiling Rotator",
      gadget2: "Tar Barrel",
      starPower1: "Steel Hoops",
      starPower2: "Rolling Reload"
    }
  },
  {
    id: 14,
    name: "Penny",
    role: "Controller",
    rarity: "Super Rare",
    image: "/brawlers/penny.png",
    stats: {
      health: 4200,
      damage: 1260,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Plunderbuss",
      super: "Old Lobber",
      gadget1: "Pocket Detonator",
      gadget2: "Captain's Compass",
      starPower1: "Heavy Coffers",
      starPower2: "Master Blaster"
    }
  },
  {
    id: 15,
    name: "Carl",
    role: "Damage Dealer",
    rarity: "Super Rare",
    image: "/brawlers/carl.png",
    stats: {
      health: 6300,
      damage: 920,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Pickaxe",
      super: "Tailspin",
      gadget1: "Heat Ejector",
      gadget2: "Flying Hook",
      starPower1: "Power Throw",
      starPower2: "Protective Pirouette"
    }
  },
  {
    id: 16,
    name: "Jacky",
    role: "Tank",
    rarity: "Super Rare",
    image: "/brawlers/jacky.png",
    stats: {
      health: 7000,
      damage: 1680,
      speed: "Normal",
      range: "Short"
    },
    abilities: {
      basic: "Ground Pound",
      super: "Pneumatic Booster",
      gadget1: "Pneumatic Booster",
      gadget2: "Counter Crush",
      starPower1: "Counter Crush",
      starPower2: "Hardy Hard Hat"
    }
  },
  {
    id: 17,
    name: "Piper",
    role: "Marksman",
    rarity: "Epic",
    image: "/brawlers/piper.png",
    stats: {
      health: 3360,
      damage: 2300,
      speed: "Normal",
      range: "Very Long"
    },
    abilities: {
      basic: "Gunbrella",
      super: "Poppin'",
      gadget1: "Auto Aimer",
      gadget2: "Homemade Recipe",
      starPower1: "Ambush",
      starPower2: "Snappy Sniping"
    }
  },
  {
    id: 18,
    name: "Pam",
    role: "Support",
    rarity: "Epic",
    image: "/brawlers/pam.png",
    stats: {
      health: 6720,
      damage: 360,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Scrapstorm",
      super: "Mama's Squeeze",
      gadget1: "Pulse Modulator",
      gadget2: "Scrapsucker",
      starPower1: "Mama's Hug",
      starPower2: "Mama's Squeeze"
    }
  },
  {
    id: 19,
    name: "Bibi",
    role: "Hybrid",
    rarity: "Epic",
    image: "/brawlers/bibi.png",
    stats: {
      health: 6020,
      damage: 1820,
      speed: "Very Fast",
      range: "Short"
    },
    abilities: {
      basic: "Home Run",
      super: "Spitball",
      gadget1: "Vitamin Booster",
      gadget2: "Batting Stance",
      starPower1: "Home Run",
      starPower2: "Batting Stance"
    }
  },
  {
    id: 20,
    name: "Bea",
    role: "Marksman",
    rarity: "Epic",
    image: "/brawlers/bea.png",
    stats: {
      health: 3360,
      damage: 1120,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Bee Sting",
      super: "Bea Swarm",
      gadget1: "Honey Molasses",
      gadget2: "Rattled Hive",
      starPower1: "Insta Beaload",
      starPower2: "Honey Coat"
    }
  },
  {
    id: 21,
    name: "Nani",
    role: "Damage Dealer",
    rarity: "Epic",
    image: "/brawlers/nani.png",
    stats: {
      health: 4200,
      damage: 2800,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Tri-bolt",
      super: "Peep",
      gadget1: "Warp Blast",
      gadget2: "Return to Sender",
      starPower1: "Autofocus",
      starPower2: "Tempered Steel"
    }
  },
  {
    id: 22,
    name: "Frank",
    role: "Tank",
    rarity: "Epic",
    image: "/brawlers/frank.png",
    stats: {
      health: 10000,
      damage: 1680,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "Power Swing",
      super: "Active Noise Cancelling",
      gadget1: "Active Noise Cancelling",
      gadget2: "Irresistible Attraction",
      starPower1: "Power Grab",
      starPower2: "Sponge"
    }
  },
  {
    id: 23,
    name: "Mortis",
    role: "Assassin",
    rarity: "Mythic",
    image: "/brawlers/mortis.png",
    stats: {
      health: 5600,
      damage: 1260,
      speed: "Very Fast",
      range: "Short"
    },
    abilities: {
      basic: "Shovel Swing",
      super: "Life Blood",
      gadget1: "Combo Spinner",
      gadget2: "Survival Shovel",
      starPower1: "Creepy Harvest",
      starPower2: "Coiled Snake"
    }
  },
  {
    id: 24,
    name: "Tara",
    role: "Support",
    rarity: "Mythic",
    image: "/brawlers/tara.png",
    stats: {
      health: 4200,
      damage: 660,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Triple Tarot",
      super: "Gravity",
      gadget1: "Psychic Enhancer",
      gadget2: "Support From Beyond",
      starPower1: "Black Portal",
      starPower2: "Healing Shade"
    }
  },
  {
    id: 25,
    name: "Gene",
    role: "Support",
    rarity: "Mythic",
    image: "/brawlers/gene.png",
    stats: {
      health: 5600,
      damage: 1440,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Smoke Blast",
      super: "Magic Hand",
      gadget1: "Lamp Blowout",
      gadget2: "Vengeful Spirits",
      starPower1: "Magic Puffs",
      starPower2: "Spirit Slap"
    }
  },
  {
    id: 26,
    name: "Max",
    role: "Damage Dealer",
    rarity: "Mythic",
    image: "/brawlers/max.png",
    stats: {
      health: 5040,
      damage: 420,
      speed: "Very Fast",
      range: "Long"
    },
    abilities: {
      basic: "Super Shot",
      super: "Run n' Gun",
      gadget1: "Phase Shifter",
      gadget2: "Sneaky Sneakers",
      starPower1: "Run n' Gun",
      starPower2: "Supercharged"
    }
  },
  {
    id: 27,
    name: "Mr. P",
    role: "Controller",
    rarity: "Mythic",
    image: "/brawlers/mr-p.png",
    stats: {
      health: 4200,
      damage: 1120,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Your Suitcase Sir!",
      super: "Porter Reinforcements",
      gadget1: "Service Bell",
      gadget2: "Porter Reinforcements",
      starPower1: "Handle With Care",
      starPower2: "Revolving Door"
    }
  },
  {
    id: 28,
    name: "Spike",
    role: "Damage Dealer",
    rarity: "Legendary",
    image: "/brawlers/spike.png",
    stats: {
      health: 3360,
      damage: 700,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Needle Grenade",
      super: "Stick Around!",
      gadget1: "Popping Pincushion",
      gadget2: "Life Plant",
      starPower1: "Fertilize",
      starPower2: "Curveball"
    }
  },
  {
    id: 29,
    name: "Crow",
    role: "Assassin",
    rarity: "Legendary",
    image: "/brawlers/crow.png",
    stats: {
      health: 3920,
      damage: 480,
      speed: "Very Fast",
      range: "Long"
    },
    abilities: {
      basic: "Triple Threat",
      super: "Swoop",
      gadget1: "Defense Booster",
      gadget2: "Slowing Toxin",
      starPower1: "Extra Toxic",
      starPower2: "Carrion Crow"
    }
  },
  {
    id: 30,
    name: "Leon",
    role: "Assassin",
    rarity: "Legendary",
    image: "/brawlers/leon.png",
    stats: {
      health: 4480,
      damage: 620,
      speed: "Very Fast",
      range: "Long"
    },
    abilities: {
      basic: "Spinner Blades",
      super: "Smoke Bomb",
      gadget1: "Clone Projector",
      gadget2: "Lollipop Drop",
      starPower1: "Smoke Trails",
      starPower2: "Invisiheal"
    }
  }
];
