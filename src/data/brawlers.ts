
// This file now re-exports from the new modular structure
// to maintain backward compatibility with existing imports

export type { 
  Brawler, 
  brawlerRoles
} from "./brawlers/index";

export { brawlers } from "./brawlers/index";
