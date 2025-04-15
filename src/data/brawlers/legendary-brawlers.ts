
import { Brawler } from "../types/brawler";

// Legendary brawlers
export const legendaryBrawlers: Brawler[] = [
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
