
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

export function GameDataProvider({ children }: { children: ReactNode }) {
  const { 
    data: brawlers = [], 
    isLoading: isLoadingBrawlers,
    refetch: refetchBrawlers
  } = useQuery({
    queryKey: ['brawlers'],
    queryFn: async () => {
      try {
        // Add CDN-based image URLs to local brawlers as a backup
        const enhancedLocalBrawlers = localBrawlersFallback.map(brawler => ({
          ...brawler,
          image: `https://cdn.brawlstats.com/brawlers/${brawler.id}.png`
        }));

        const loadedBrawlers = await fetchBrawlers();
        
        if (loadedBrawlers.length === 0) {
          toast.error("Keine Brawlers gefunden, verwende lokale Daten");
          return enhancedLocalBrawlers;
        }
        
        return loadedBrawlers;
      } catch (error) {
        console.error('Error fetching brawlers in context:', error);
        toast.error("Fehler beim Laden der Brawler, verwende lokale Daten");
        
        // Return local brawlers with enhanced images as fallback
        return localBrawlersFallback.map(brawler => ({
          ...brawler,
          image: `https://cdn.brawlstats.com/brawlers/${brawler.id}.png`
        }));
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
