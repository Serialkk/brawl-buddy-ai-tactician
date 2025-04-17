
import type { Brawler } from "../types/brawler";
import { startingAndTrophyRoadBrawlers } from "./starting-trophy-brawlers";
import { rareBrawlers } from "./rare-brawlers";
import { superRareBrawlers } from "./super-rare-brawlers"; 
import { epicBrawlers } from "./epic-brawlers";
import { mythicBrawlers } from "./mythic-brawlers";
import { legendaryBrawlers } from "./legendary-brawlers";
import { chromaticBrawlers } from "./chromatic-brawlers"; // Add chromatic brawlers import

// Combine all brawlers into one array
export const brawlers: Brawler[] = [
  ...startingAndTrophyRoadBrawlers,
  ...rareBrawlers,
  ...superRareBrawlers,
  ...epicBrawlers,
  ...mythicBrawlers,
  ...legendaryBrawlers,
  ...chromaticBrawlers // Include chromatic brawlers
];

// Re-export brawler types and roles using export type
export type { Brawler, brawlerRoles } from "../types/brawler";

// Export individual category arrays
export {
  startingAndTrophyRoadBrawlers,
  rareBrawlers,
  superRareBrawlers,
  epicBrawlers,
  mythicBrawlers,
  legendaryBrawlers,
  chromaticBrawlers // Export chromatic brawlers
};
