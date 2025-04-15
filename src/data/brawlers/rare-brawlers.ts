
import { Brawler } from "../types/brawler";

// Rare brawlers
export const rareBrawlers: Brawler[] = [
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
  }
];
