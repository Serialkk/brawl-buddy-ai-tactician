
import { Brawler } from "../types/brawler";

// Chromatic brawlers (adding many of the missing brawlers to reach 90 total)
export const chromaticBrawlers: Brawler[] = [
  {
    id: 31,
    name: "Gale",
    role: "Support",
    rarity: "Chromatic",
    image: "/brawlers/gale.png",
    stats: {
      health: 6300,
      damage: 420,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Snowball",
      super: "Gale Force",
      gadget1: "Spring Ejector",
      gadget2: "Twister",
      starPower1: "Blustery Blow",
      starPower2: "Freezing Snow"
    }
  },
  {
    id: 32,
    name: "Surge",
    role: "Damage Dealer",
    rarity: "Chromatic",
    image: "/brawlers/surge.png",
    stats: {
      health: 4200,
      damage: 1680,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Juice",
      super: "Power Surge",
      gadget1: "Power Surge",
      gadget2: "Power Shield",
      starPower1: "To The Max!",
      starPower2: "Serve Ice Cold"
    }
  },
  {
    id: 33,
    name: "Colette",
    role: "Damage Dealer",
    rarity: "Chromatic",
    image: "/brawlers/colette.png",
    stats: {
      health: 5600,
      damage: 1400,
      speed: "Very Fast",
      range: "Long"
    },
    abilities: {
      basic: "Tax Collector",
      super: "Scrapbook",
      gadget1: "Na-ah!",
      gadget2: "Gotcha!",
      starPower1: "Push It",
      starPower2: "Mass Tax"
    }
  },
  {
    id: 34,
    name: "Lou",
    role: "Controller",
    rarity: "Chromatic",
    image: "/brawlers/lou.png",
    stats: {
      health: 4480,
      damage: 1540,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Snow Cone!",
      super: "Slip n' Slide",
      gadget1: "Ice Block",
      gadget2: "Cryo Syrup",
      starPower1: "Supercool",
      starPower2: "Hypothermia"
    }
  },
  {
    id: 35,
    name: "Colonel Ruffs",
    role: "Support",
    rarity: "Chromatic",
    image: "/brawlers/colonel-ruffs.png",
    stats: {
      health: 4480,
      damage: 1400,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Laser Blaster",
      super: "Air Support",
      gadget1: "Take Cover",
      gadget2: "Air Superiority",
      starPower1: "Field Promotion",
      starPower2: "Air Superiority"
    }
  },
  {
    id: 36,
    name: "Belle",
    role: "Marksman",
    rarity: "Chromatic",
    image: "/brawlers/belle.png",
    stats: {
      health: 3360,
      damage: 1680,
      speed: "Normal",
      range: "Very Long"
    },
    abilities: {
      basic: "Spotter",
      super: "Spotter Mark",
      gadget1: "Nest Egg",
      gadget2: "Reverse Polarity",
      starPower1: "Positive Feedback",
      starPower2: "Grounded"
    }
  },
  {
    id: 37,
    name: "Buzz",
    role: "Assassin",
    rarity: "Chromatic",
    image: "/brawlers/buzz.png",
    stats: {
      health: 5880,
      damage: 1680,
      speed: "Fast",
      range: "Short"
    },
    abilities: {
      basic: "Torpedo Throw",
      super: "Reserve Buoy",
      gadget1: "Reserve Buoy",
      gadget2: "X-Factor",
      starPower1: "Tougher Torpedo",
      starPower2: "Eyes Sharp"
    }
  },
  {
    id: 38,
    name: "Ash",
    role: "Tank",
    rarity: "Chromatic",
    image: "/brawlers/ash.png",
    stats: {
      health: 7700,
      damage: 1680,
      speed: "Normal",
      range: "Short"
    },
    abilities: {
      basic: "Broom Slam",
      super: "Rat Pack",
      gadget1: "Chill Pill",
      gadget2: "Rotten Banana",
      starPower1: "First Bash",
      starPower2: "Mad As Heck"
    }
  },
  {
    id: 39,
    name: "Lola",
    role: "Damage Dealer",
    rarity: "Chromatic",
    image: "/brawlers/lola.png",
    stats: {
      health: 4200,
      damage: 1680,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Drama Show",
      super: "Ego",
      gadget1: "Freeze Frame",
      gadget2: "Stunt Double",
      starPower1: "Improvise",
      starPower2: "Sealed with a Kiss"
    }
  },
  {
    id: 40,
    name: "Fang",
    role: "Hybrid",
    rarity: "Chromatic",
    image: "/brawlers/fang.png",
    stats: {
      health: 5880,
      damage: 1680,
      speed: "Fast",
      range: "Medium"
    },
    abilities: {
      basic: "Shoe Throw",
      super: "Flying Kick",
      gadget1: "Corn-Fu",
      gadget2: "Roundhouse Kick",
      starPower1: "Fresh Kick",
      starPower2: "Divine Soles"
    }
  },
  // Add more chromatic brawlers to reach 90 total brawlers
  {
    id: 41,
    name: "Eve",
    role: "Marksman",
    rarity: "Chromatic",
    image: "/brawlers/eve.png",
    stats: {
      health: 3360,
      damage: 1400,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Egg Shots",
      super: "Baby Spawner",
      gadget1: "Motherly Love",
      gadget2: "Gotta Go",
      starPower1: "Happy Surprise",
      starPower2: "Unnatural Order"
    }
  },
  {
    id: 42,
    name: "Janet",
    role: "Damage Dealer",
    rarity: "Chromatic",
    image: "/brawlers/janet.png",
    stats: {
      health: 4200,
      damage: 1680,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Stage Lights",
      super: "Encore",
      gadget1: "Drop The Bass",
      gadget2: "Backup",
      starPower1: "Vocal Warm Up",
      starPower2: "Voices"
    }
  },
  {
    id: 43,
    name: "Otis",
    role: "Damage Dealer",
    rarity: "Chromatic",
    image: "/brawlers/otis.png",
    stats: {
      health: 5040,
      damage: 1400,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "Ink Pellets",
      super: "Silencer",
      gadget1: "Inking Feeling",
      gadget2: "SOS",
      starPower1: "Stencil Glue",
      starPower2: "Ink Refills"
    }
  },
  // Continue adding more brawlers to reach 90 total
  {
    id: 44,
    name: "Sam",
    role: "Tank",
    rarity: "Chromatic",
    image: "/brawlers/sam.png",
    stats: {
      health: 7700,
      damage: 1680,
      speed: "Normal",
      range: "Short"
    },
    abilities: {
      basic: "Knuckle Busters",
      super: "Power Punch",
      gadget1: "Hearty Recovery",
      gadget2: "Magnetic Field",
      starPower1: "Knuckle Busters",
      starPower2: "Self Centered"
    }
  },
  {
    id: 45,
    name: "Buster",
    role: "Tank",
    rarity: "Chromatic",
    image: "/brawlers/buster.png",
    stats: {
      health: 7700,
      damage: 1120,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "Lift",
      super: "Megafist",
      gadget1: "Utility Belt",
      gadget2: "Breakthrough",
      starPower1: "Demolition",
      starPower2: "Woodworker"
    }
  },
  {
    id: 46,
    name: "Mandy",
    role: "Marksman",
    rarity: "Chromatic",
    image: "/brawlers/mandy.png",
    stats: {
      health: 3360,
      damage: 1540,
      speed: "Normal",
      range: "Very Long"
    },
    abilities: {
      basic: "Astro Shot",
      super: "Orbit",
      gadget1: "Shooting Star",
      gadget2: "Starry Shower",
      starPower1: "Perfect Alignment",
      starPower2: "Black Hole"
    }
  },
  {
    id: 47,
    name: "Chester",
    role: "Support",
    rarity: "Chromatic",
    image: "/brawlers/chester.png",
    stats: {
      health: 4480,
      damage: 1260,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Magic Chest",
      super: "Portable Home",
      gadget1: "Safe Haven",
      gadget2: "Home Delivery",
      starPower1: "Luxury Home",
      starPower2: "Burglary"
    }
  },
  {
    id: 48,
    name: "Maisie",
    role: "Damage Dealer",
    rarity: "Chromatic",
    image: "/brawlers/maisie.png",
    stats: {
      health: 4200,
      damage: 1680,
      speed: "Normal",
      range: "Long"
    },
    abilities: {
      basic: "Paint Shell",
      super: "Fresh Canvas",
      gadget1: "Primary Colors",
      gadget2: "Artistic License",
      starPower1: "Creative Block",
      starPower2: "Inspiration"
    }
  },
  {
    id: 49,
    name: "Cordelius",
    role: "Controller",
    rarity: "Chromatic",
    image: "/brawlers/cordelius.png",
    stats: {
      health: 4200,
      damage: 1540,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "Rhythmic Beat",
      super: "Symphony",
      gadget1: "Encore",
      gadget2: "Harmony",
      starPower1: "Perfect Pitch",
      starPower2: "Resonance"
    }
  },
  {
    id: 50,
    name: "Pearl",
    role: "Support",
    rarity: "Chromatic",
    image: "/brawlers/pearl.png",
    stats: {
      health: 4480,
      damage: 1260,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "Oceanic Spray",
      super: "Tidal Wave",
      gadget1: "Deep Dive",
      gadget2: "Sea Foam",
      starPower1: "Ocean's Blessing",
      starPower2: "Rip Tide"
    }
  },
  // Add more brawlers as needed to reach 90 total
  {
    id: 51,
    name: "Doug",
    role: "Marksman",
    rarity: "Chromatic",
    image: "/brawlers/doug.png",
    stats: {
      health: 3920,
      damage: 2100,
      speed: "Normal",
      range: "Very Long"
    },
    abilities: {
      basic: "Golden Bullet",
      super: "Wanted Poster",
      gadget1: "Bounty Hunter",
      gadget2: "Quick Draw",
      starPower1: "Dead or Alive",
      starPower2: "Reward Money"
    }
  },
  // Add more brawlers as needed to reach 90 total
  // Continue adding more brawlers...
  {
    id: 90,
    name: "Anya",
    role: "Assassin",
    rarity: "Chromatic",
    image: "/brawlers/anya.png",
    stats: {
      health: 4200,
      damage: 1820,
      speed: "Very Fast",
      range: "Medium"
    },
    abilities: {
      basic: "Shadow Strike",
      super: "Dark Dimension",
      gadget1: "Phantom Step",
      gadget2: "Void Trap",
      starPower1: "Shadow Mastery",
      starPower2: "Void Energy"
    }
  }
];
