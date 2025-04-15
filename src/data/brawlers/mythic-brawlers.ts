
import { Brawler } from "../types/brawler";

// Mythic brawlers
export const mythicBrawlers: Brawler[] = [
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
  }
];
