
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
