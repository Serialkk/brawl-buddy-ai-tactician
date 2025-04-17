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

// Make sure we have access to all available brawlers
const getAllAvailableBrawlers = (): Brawler[] => {
  // Import all brawler categories from the modular structure
  const { 
    startingAndTrophyRoadBrawlers,
    rareBrawlers, 
    superRareBrawlers, 
    epicBrawlers, 
    mythicBrawlers, 
    legendaryBrawlers,
    chromaticBrawlers // Add chromatic brawlers to the import
  } = require('@/data/brawlers');
  
  // Combine all arrays to ensure we have all brawlers
  const allBrawlers = [
    ...startingAndTrophyRoadBrawlers,
    ...rareBrawlers,
    ...superRareBrawlers,
    ...epicBrawlers,
    ...mythicBrawlers,
    ...legendaryBrawlers,
    ...chromaticBrawlers // Include chromatic brawlers
  ];
  
  console.log(`Total brawlers available locally: ${allBrawlers.length}`);
  return enhanceBrawlersWithLocalImages(allBrawlers);
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
        
        // Always start with the complete set of local brawlers to ensure we have all 90
        const completeLocalBrawlers = getAllAvailableBrawlers();
        console.log(`Local brawlers available: ${completeLocalBrawlers.length}`);
        
        if (completeLocalBrawlers.length < 90) {
          console.warn(`Local data only has ${completeLocalBrawlers.length} brawlers, which is less than the expected 90`);
        }
        
        // Always use local data for reliability
        toast.info(`Lade alle ${completeLocalBrawlers.length} Brawler`);
        return completeLocalBrawlers;
      } catch (error) {
        console.error('Error fetching brawlers in context:', error);
        toast.error("Fehler beim Laden der Brawler, verwende lokale Brawler");
        
        // Return complete set of local brawlers as fallback
        return getAllAvailableBrawlers();
      }
    },
    staleTime: 1 * 60 * 1000, // Reduce cache time to 1 min for testing
    refetchOnWindowFocus: false,
    retry: 1, // Reduce retries to speed up fallback to local data
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
    queryFn: fetchMaps,
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
