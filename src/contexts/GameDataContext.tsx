
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

// Helper to enhance brawlers with consistent local image URLs
const enhanceBrawlersWithLocalImages = (brawlers: Brawler[]): Brawler[] => {
  return brawlers.map(brawler => ({
    ...brawler,
    // Verwende lokale Bild-URLs für bessere Zuverlässigkeit
    image: brawler.image?.startsWith('/') 
      ? brawler.image 
      : `/brawlers/${brawler.name.toLowerCase().replace(/\s+/g, '-')}.png`
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
        
        // Always enhance local brawlers with image URLs as a backup
        const enhancedLocalBrawlers = enhanceBrawlersWithLocalImages(localBrawlersFallback);

        // Try to fetch from API
        const loadedBrawlers = await fetchBrawlers();
        
        if (!loadedBrawlers || loadedBrawlers.length === 0) {
          console.log("No brawlers returned from API, using local data");
          toast.error("Keine Brawlers gefunden, verwende lokale Daten");
          return enhancedLocalBrawlers;
        }
        
        console.log(`Fetched ${loadedBrawlers.length} brawlers successfully`);
        // Make sure all fetched brawlers have proper local image URLs
        return enhanceBrawlersWithLocalImages(loadedBrawlers);
      } catch (error) {
        console.error('Error fetching brawlers in context:', error);
        toast.error("Fehler beim Laden der Brawler, verwende lokale Daten");
        
        // Return enhanced local brawlers as fallback
        return enhanceBrawlersWithLocalImages(localBrawlersFallback);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
    refetchOnWindowFocus: false,
    retry: 2,
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
