
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Brawler } from '@/data/types/brawler';
import { fetchBrawlers, fetchMaps } from '@/services/brawlStarsService';
import { toast } from 'sonner';

interface GameDataContextType {
  brawlers: Brawler[];
  maps: any[];
  isBrawlersLoading: boolean;
  isMapsLoading: boolean;
  refetchBrawlers: () => Promise<void>;
  refetchMaps: () => Promise<void>;
}

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export function GameDataProvider({ children }: { children: ReactNode }) {
  const { 
    data: brawlersData, 
    isLoading: isBrawlersLoading, 
    refetch: refetchBrawlersQuery 
  } = useQuery({
    queryKey: ['brawlers'],
    queryFn: fetchBrawlers,
    staleTime: 60 * 60 * 1000, // 1 hour
    onError: (error) => {
      console.error('Failed to fetch brawlers:', error);
      toast.error('Failed to load brawlers. Using local data.');
    }
  });

  const { 
    data: mapsData, 
    isLoading: isMapsLoading, 
    refetch: refetchMapsQuery 
  } = useQuery({
    queryKey: ['maps'],
    queryFn: fetchMaps,
    staleTime: 60 * 60 * 1000, // 1 hour
    onError: (error) => {
      console.error('Failed to fetch maps:', error);
      toast.error('Failed to load maps. Using local data.');
    }
  });

  const refetchBrawlers = async () => {
    try {
      await refetchBrawlersQuery();
      toast.success('Brawlers data refreshed!');
    } catch (error) {
      console.error('Error refreshing brawlers:', error);
      toast.error('Failed to refresh brawlers data');
    }
  };

  const refetchMaps = async () => {
    try {
      await refetchMapsQuery();
      toast.success('Maps data refreshed!');
    } catch (error) {
      console.error('Error refreshing maps:', error);
      toast.error('Failed to refresh maps data');
    }
  };

  return (
    <GameDataContext.Provider
      value={{
        brawlers: brawlersData || [],
        maps: mapsData || [],
        isBrawlersLoading,
        isMapsLoading,
        refetchBrawlers,
        refetchMaps,
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
