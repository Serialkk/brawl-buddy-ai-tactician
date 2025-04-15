
import { Brawler } from "@/data/types/brawler";
import { handleApiError } from "@/utils/apiUtils";

// API endpoints
const BRAWL_API_URL = "https://api.brawlapi.com/v1";
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// API response interfaces
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
  role?: {
    id: number;
    name: string;
  };
  class?: {
    id: number;
    name: string;
  };
  description: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
}

// Simple in-memory cache
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<any>> = {};

// Generic function to fetch with caching
async function fetchWithCache<T>(
  url: string,
  cacheKey: string,
  fetchOptions?: RequestInit,
  cacheDuration: number = CACHE_DURATION
): Promise<T> {
  // Check cache first
  const cachedItem = cache[cacheKey];
  const now = Date.now();
  
  // Return cached data if valid
  if (cachedItem && now - cachedItem.timestamp < cacheDuration) {
    console.log(`Using cached data for ${cacheKey}`);
    return cachedItem.data;
  }
  
  try {
    // Fetch fresh data
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the result
    cache[cacheKey] = {
      data,
      timestamp: now
    };
    
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

// Convert API brawler to our model
const mapApiBrawlerToModel = (apiBrawler: BrawlApiBrawler): Brawler => {
  // Get role from either role or class (API seems to use both)
  const roleName = apiBrawler.role?.name || apiBrawler.class?.name || "Unknown";
  
  return {
    id: apiBrawler.id,
    name: apiBrawler.name,
    role: roleName,
    rarity: apiBrawler.rarity?.name || "Unknown",
    image: apiBrawler.imageUrl || `/brawlers/${apiBrawler.name.toLowerCase().replace(/ /g, "-")}.png`,
    stats: {
      health: 0, // These values aren't available in the API
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

// Fetch all brawlers
export const fetchBrawlers = async (): Promise<Brawler[]> => {
  try {
    const data: BrawlAPIResponse = await fetchWithCache(
      `${BRAWL_API_URL}/brawlers`,
      'brawlers',
      undefined,
      CACHE_DURATION
    );
    
    if (!data.list || !Array.isArray(data.list)) {
      console.error("Invalid API response format:", data);
      throw new Error("Invalid API response format");
    }
    
    console.log(`API returned ${data.list.length} brawlers`);
    
    return data.list
      .filter(b => b.released)
      .map(mapApiBrawlerToModel);
  } catch (error) {
    handleApiError(error, "Brawler fetch");
    // Fall back to local data when API fails
    const { brawlers } = await import('@/data/brawlers');
    return brawlers;
  }
};

// Fetch maps from the API
export const fetchMaps = async (): Promise<any[]> => {
  try {
    const data = await fetchWithCache(
      `${BRAWL_API_URL}/maps`,
      'maps',
      undefined,
      CACHE_DURATION
    );
    
    if (!data.list || !Array.isArray(data.list)) {
      console.error("Invalid API response format for maps:", data);
      throw new Error("Invalid API response format for maps");
    }
    
    console.log(`API returned ${data.list.length} maps`);
    
    return data.list.filter((map: any) => map.disabled !== true);
  } catch (error) {
    handleApiError(error, "Maps fetch");
    return []; // Return empty array when API fails
  }
};

// Clear cache (useful for manual refreshes)
export const clearCache = (key?: string) => {
  if (key) {
    delete cache[key];
    console.log(`Cleared cache for ${key}`);
  } else {
    Object.keys(cache).forEach(k => delete cache[k]);
    console.log("Cleared all cache");
  }
};
