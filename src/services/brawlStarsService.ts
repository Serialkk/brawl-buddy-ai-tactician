
import { Brawler } from "@/data/brawlers";

// API endpoints
const BRAWL_API_URL = "https://api.brawlapi.com/v1";

// Interface for the API response
interface BrawlAPIResponse {
  list: BrawlApiBrawler[];
}

interface BrawlApiBrawler {
  id: number;
  name: string;
  hash: string;
  path: string;
  released: boolean;
  rarity: {
    id: number;
    name: string;
  };
  role: {
    id: number;
    name: string;
  };
  description: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  class: {
    id: number;
    name: string;
  };
}

// Convert API brawler to our Brawler type
const mapApiBrawlerToModel = (apiBrawler: BrawlApiBrawler): Brawler => {
  return {
    id: apiBrawler.id,
    name: apiBrawler.name,
    role: apiBrawler.role.name || "Unknown",
    rarity: apiBrawler.rarity.name || "Unknown",
    image: apiBrawler.imageUrl || `/brawlers/${apiBrawler.name.toLowerCase().replace(/ /g, "-")}.png`,
    stats: {
      health: 0,
      damage: 0,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "",
      super: "",
      gadget1: "",
      starPower1: ""
    }
  };
};

// Get all brawlers
export const fetchBrawlers = async (): Promise<Brawler[]> => {
  try {
    const response = await fetch(`${BRAWL_API_URL}/brawlers`);
    const data: BrawlAPIResponse = await response.json();
    
    if (!data.list || !Array.isArray(data.list)) {
      console.error("Invalid API response format:", data);
      throw new Error("Invalid API response format");
    }
    
    return data.list
      .filter(b => b.released)
      .map(mapApiBrawlerToModel);
  } catch (error) {
    console.error("Error fetching brawlers:", error);
    // Fall back to local data if API fails
    const { brawlers } = await import('@/data/brawlers');
    return brawlers;
  }
};
