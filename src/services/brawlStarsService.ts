
import { Brawler } from '@/data/types/brawler';
import { brawlers as localBrawlers } from '@/data/brawlers';

// Stelle sicher, dass alle Brawler ein gültiges lokales Bild haben
const addLocalImageUrls = (brawlers: Brawler[]): Brawler[] => {
  return brawlers.map(brawler => ({
    ...brawler,
    // Verwende bevorzugt lokale Bilder
    image: brawler.image?.startsWith('/') 
      ? brawler.image 
      : `/brawlers/${brawler.name.toLowerCase().replace(/\s+/g, '-')}.png`
  }));
};

export const fetchBrawlers = async (): Promise<Brawler[]> => {
  try {
    console.log("Attempting to fetch brawlers from API or cache...");
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if we have cached data first for faster loading
    const cachedBrawlers = localStorage.getItem('brawl-brawlers-cache');
    if (cachedBrawlers) {
      const cache = JSON.parse(cachedBrawlers);
      const { data, timestamp } = cache;
      
      // Check if cache is fresh (less than 1 hour)
      if (Date.now() - timestamp < 60 * 60 * 1000) {
        console.log('Using cached brawlers data');
        // Stelle sicher, dass die Bilder-URLs lokal sind
        return addLocalImageUrls(data);
      }
    }
    
    // Da die externe API nicht funktioniert, verwenden wir lokale Daten
    console.log('Using local brawler data with local image paths');
    const enhancedLocalBrawlers = addLocalImageUrls(localBrawlers);
    
    // Cache the enhanced local data
    localStorage.setItem('brawl-brawlers-cache', JSON.stringify({
      data: enhancedLocalBrawlers,
      timestamp: Date.now(),
    }));
    
    return enhancedLocalBrawlers;
  } catch (error) {
    console.error('Error in fetchBrawlers:', error);
    // Final fallback to local data with local image URLs
    return addLocalImageUrls(localBrawlers);
  }
};

// Restliche Funktionen bleiben unverändert
export const fetchMaps = async (): Promise<any[]> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
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
    
    // If cache is stale or doesn't exist, try the API
    try {
      const response = await fetch('https://api.example.com/maps', {
        signal: AbortSignal.timeout(3000) // Timeout after 3 seconds
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the response
      localStorage.setItem('brawl-maps-cache', JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
      
      // Type guard to check if data has a 'list' property and it's an array
      if (typeof data === 'object' && data !== null && 'list' in data && Array.isArray((data as {list: any[]}).list)) {
        return (data as {list: any[]}).list.map(map => ({
          id: map.id,
          name: map.name,
          // ... other map properties
        }));
      }
      
      return data || [];
    } catch (apiError) {
      // If API fails, return an empty array
      console.warn('API fetch failed for maps, returning empty array');
      return [];
    }
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
