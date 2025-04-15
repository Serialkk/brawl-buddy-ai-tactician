
import { Brawler } from "../types/brawler";

// Starting and Trophy Road brawlers
export const startingAndTrophyRoadBrawlers: Brawler[] = [
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
  }
];
