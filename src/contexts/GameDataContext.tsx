
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBrawlers, fetchMaps } from '@/services/brawlStarsService';
import { handleApiError } from '@/utils/apiUtils';
import { Brawler } from '@/data/types/brawler';
import { brawlers as localBrawlersFallback } from '@/data/brawlers';
import { toast } from 'sonner';

interface GameDataContextType {
  brawlers: Brawler[];
  maps: any[];
  isLoadingBrawlers: boolean;
  isLoadingMaps: boolean;
  refetchBrawlers: () => void;
  refetchMaps: () => void;
}

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

// Helper to enhance brawlers with consistent local images
const enhanceBrawlersWithLocalImages = (brawlers: Brawler[]): Brawler[] => {
  return brawlers.map(brawler => ({
    ...brawler,
    // Always use local image paths for reliability
    image: `/brawlers/${brawler.name.toLowerCase().replace(/\s+/g, '-')}.png`
  }));
};

export function GameDataProvider({ children }: { children: ReactNode }) {
  const { 
    data: brawlers = [], 
    isLoading: isLoadingBrawlers,
    refetch: refetchBrawlers
  } = useQuery({
    queryKey: ['brawlers'],
    queryFn: async () => {
      try {
        console.log("Fetching brawlers data...");
        
        // Try to fetch from Brawlify API
        const response = await fetch('https://api.brawlify.com/v1/brawlers');
        
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Received ${data.list ? data.list.length : 0} brawlers from Brawlify API`);
        
        if (data.list && Array.isArray(data.list) && data.list.length > 0) {
          // Map the API response to our Brawler type
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
          
          console.log(`Successfully mapped ${apiBrawlers.length} brawlers from API`);
          toast.success(`Lade alle ${apiBrawlers.length} Brawler von Brawlify API`);
          return apiBrawlers;
        } else {
          // If API doesn't return proper data, fallback to local data
          throw new Error("API didn't return valid brawlers data");
        }
      } catch (error) {
        console.error('Error fetching brawlers from API:', error);
        toast.error("Fehler beim Laden der Brawler von API, verwende lokale Brawler");
        
        // Import all local brawler data using ES module imports (not require)
        // This fixes the "require is not defined" error
        return localBrawlersFallback;
      }
    },
    staleTime: 1 * 60 * 1000, // Cache time of 1 min for testing
    refetchOnWindowFocus: false,
    retry: 1, // Reduce retries to speed up fallback
    meta: {
      onError: (error: Error) => handleApiError(error, 'Loading brawlers')
    }
  });

  const { 
    data: maps = [], 
    isLoading: isLoadingMaps,
    refetch: refetchMaps
  } = useQuery({
    queryKey: ['maps'],
    queryFn: async () => {
      try {
        console.log("Fetching maps data from Brawlify...");
        
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
          data,
          timestamp: Date.now(),
        }));
        
        // Type guard to check if data has a 'list' property and it's an array
        if (typeof data === 'object' && data !== null && 'list' in data && Array.isArray((data as {list: any[]}).list)) {
          return (data as {list: any[]}).list.map(map => ({
            id: map.id,
            name: map.name,
            gameMode: map.gameMode?.name || "Unknown",
            image: map.imageUrl || null,
            environment: map.environment?.name || "Unknown"
          }));
        }
        
        return data?.list || [];
      } catch (error) {
        console.error('Error fetching maps from Brawlify:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
    refetchOnWindowFocus: false,
    retry: 2, 
    meta: {
      onError: (error: Error) => handleApiError(error, 'Loading maps')
    }
  });

  return (
    <GameDataContext.Provider
      value={{
        brawlers,
        maps,
        isLoadingBrawlers,
        isLoadingMaps,
        refetchBrawlers,
        refetchMaps
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
}

export const useGameData = (): GameDataContextType => {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};
