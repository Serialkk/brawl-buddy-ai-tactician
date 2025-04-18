
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';

interface EventCardProps {
  event: {
    slot: {
      name: string;
      emoji: string;
    };
    startTime: string;
    endTime: string;
    map: {
      name: string;
      imageUrl: string;
      gameMode: {
        name: string;
        color: string;
      };
    };
  };
}

export const EventCard = ({ event }: EventCardProps) => {
  const timeRemaining = formatDistance(new Date(event.endTime), new Date(), {
    addSuffix: true,
    locale: de,
  });

  return (
    <Card className="w-full bg-white/10 backdrop-blur-sm border-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {event.slot.emoji} {event.map.gameMode.name}
          </h3>
          <span className="text-sm text-white/80">Endet {timeRemaining}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={event.map.imageUrl}
              alt={event.map.name}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-white/90 font-medium">{event.map.name}</p>
        </div>
      </CardContent>
    </Card>
  );
};
