import { Brawler } from '@/data/types/brawler';

export const fetchBrawlers = async (): Promise<Brawler[]> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    // In a real app, we'd make an API call here
    const cachedBrawlers = localStorage.getItem('brawl-brawlers-cache');
    if (cachedBrawlers) {
      const cache = JSON.parse(cachedBrawlers);
      const { data, timestamp } = cache;
      
      // Check if cache is fresh (less than 1 hour)
      if (Date.now() - timestamp < 60 * 60 * 1000) {
        console.log('Using cached brawlers data');
        return data;
      }
    }
    
    const response = await fetch('https://api.example.com/brawlers');
    const data = await response.json();
    
    // Cache the response
    localStorage.setItem('brawl-brawlers-cache', JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
    
    return data.map((brawler: any) => ({
      id: brawler.id,
      name: brawler.name,
      role: brawler.role,
      rarity: brawler.rarity,
      image: brawler.image,
      // ... other brawler properties
    }));
  } catch (error) {
    console.error('Error fetching brawlers:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch brawlers');
  }
};

export const fetchMaps = async (): Promise<any[]> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    // In a real app, we'd make an API call here
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
    
    const response = await fetch('https://api.example.com/maps');
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
    
    // If the response doesn't have the expected structure, return an empty array
    return [];
  } catch (error) {
    console.error('Error fetching maps:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch maps');
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
