
import { Brawler } from "../types/brawler";

// Super Rare brawlers
export const superRareBrawlers: Brawler[] = [
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
  }
];
