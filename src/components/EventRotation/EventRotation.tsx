
import React from 'react';
import { useGameData } from '@/contexts/GameDataContext';
import { EventCard } from './EventCard';
import { Skeleton } from '@/components/ui/skeleton';

const EventRotation = () => {
  const { events, isLoadingEvents } = useGameData();

  if (isLoadingEvents) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[300px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Aktuelle Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <EventCard key={`${event.slot.name}-${index}`} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventRotation;
