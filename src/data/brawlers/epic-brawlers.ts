
import { Brawler } from "../types/brawler";

// Epic brawlers
export const epicBrawlers: Brawler[] = [
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
  }
];
