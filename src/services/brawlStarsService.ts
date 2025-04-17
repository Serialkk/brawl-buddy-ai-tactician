
import { Brawler } from '@/data/types/brawler';
import { brawlers as localBrawlers } from '@/data/brawlers';

// Ensure all brawlers have valid local image paths
const addLocalImageUrls = (brawlers: Brawler[]): Brawler[] => {
  return brawlers.map(brawler => ({
    ...brawler,
    // Always use local images with consistent naming format
    image: `/brawlers/${brawler.name.toLowerCase().replace(/\s+/g, '-')}.png`
  }));
};

export const fetchBrawlers = async (): Promise<Brawler[]> => {
  try {
    console.log("Fetching brawlers from Brawlify API...");
    
    // Try to retrieve from cache first
    const cachedBrawlers = localStorage.getItem('brawl-brawlers-cache');
    if (cachedBrawlers) {
      const cache = JSON.parse(cachedBrawlers);
      const { data, timestamp } = cache;
      
      // Check if cache is fresh (less than 30 minutes)
      if (Date.now() - timestamp < 30 * 60 * 1000) {
        console.log('Using cached brawlers data');
        return data;
      }
    }
    
    // If cache is stale or doesn't exist, try the Brawlify API
    const response = await fetch('https://api.brawlify.com/v1/brawlers', {
      signal: AbortSignal.timeout(5000) // Timeout after 5 seconds
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.list && Array.isArray(data.list) && data.list.length > 0) {
      console.log(`Received ${data.list.length} brawlers from API`);
      
      // Map API response to our Brawler type
      const apiBrawlers = data.list.map((brawler: any) => ({
        id: brawler.id,
        name: brawler.name,
        role: brawler.class?.name || "Unknown",
        rarity: brawler.rarity?.name || "Unknown",
        image: `/brawlers/${brawler.name.toLowerCase().replace(/\s+/g, '-')}.png`, // Use local images
        stats: {
          health: brawler.stats?.health || 0,
          damage: brawler.stats?.damage || 0,
          speed: brawler.stats?.speed || "Normal",
          range: brawler.stats?.range || "Medium",
        },
        abilities: {
          basic: brawler.description || "Unknown",
          super: brawler.superDescription || "Unknown",
          gadget1: brawler.gadgets?.[0]?.name || "Unknown",
          gadget2: brawler.gadgets?.[1]?.name,
          starPower1: brawler.starPowers?.[0]?.name || "Unknown",
          starPower2: brawler.starPowers?.[1]?.name,
        }
      }));
      
      // Cache the enhanced data
      localStorage.setItem('brawl-brawlers-cache', JSON.stringify({
        data: apiBrawlers,
        timestamp: Date.now(),
      }));
      
      return apiBrawlers;
    }
    
    throw new Error("Invalid data format from API");
  } catch (error) {
    console.error('Error fetching from Brawlify API:', error);
    // Final fallback to local data with local image URLs
    return addLocalImageUrls(localBrawlers);
  }
};

export const fetchMaps = async (): Promise<any[]> => {
  try {
    // Try to retrieve from cache first
    const cachedMaps = localStorage.getItem('brawl-maps-cache');
    if (cachedMaps) {
      const cache = JSON.parse(cachedMaps);
      const { data, timestamp } = cache;
      
      // Check if cache is fresh (less than 1 hour)
      if (Date.now() - timestamp < 60 * 60 * 1000) {
        console.log('Using cached maps data');
        return data;
      }
    }
    
    // If cache is stale or doesn't exist, try the Brawlify API
    const response = await fetch('https://api.brawlify.com/v1/maps', {
      signal: AbortSignal.timeout(5000) // Timeout after 5 seconds
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the response
    localStorage.setItem('brawl-maps-cache', JSON.stringify({
      data: data.list || [],
      timestamp: Date.now(),
    }));
    
    if (typeof data === 'object' && data !== null && 'list' in data && Array.isArray((data as {list: any[]}).list)) {
      return (data as {list: any[]}).list.map(map => ({
        id: map.id,
        name: map.name,
        gameMode: map.gameMode?.name || "Unknown",
        image: map.imageUrl || null,
        environment: map.environment?.name || "Unknown"
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching maps:', error);
    return [];
  }
};

export const getBrawlerRecommendations = async (
  gameMode: string,
  map?: string,
  teamBrawlers: number[] = []
): Promise<Brawler[]> => {
  try {
    // In a real app, we'd call an API with these parameters
    // For now, we'll just return some mock data
    const allBrawlers = await fetchBrawlers();
    
    // Simulate some recommendation logic
    const recommendations = allBrawlers
      .filter(brawler => !teamBrawlers.includes(brawler.id))
      .map(brawler => ({
        ...brawler,
        compatibility: Math.floor(Math.random() * 100) // Random compatibility score
      }))
      .sort((a, b) => (b.compatibility || 0) - (a.compatibility || 0))
      .slice(0, 5);
    
    return recommendations;
  } catch (error) {
    console.error('Error getting brawler recommendations:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to get recommendations');
  }
};

export const getTeamSynergy = async (brawlerIds: number[]): Promise<number> => {
  try {
    // In a real app, we'd call an API to calculate team synergy
    // For now, we'll just return a random score
    
    // More brawlers should generally have better synergy up to a point
    const baseScore = Math.min(brawlerIds.length * 20, 60);
    
    // Add some randomness
    const randomFactor = Math.floor(Math.random() * 40);
    
    return Math.min(baseScore + randomFactor, 100);
  } catch (error) {
    console.error('Error calculating team synergy:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to calculate team synergy');
  }
};
