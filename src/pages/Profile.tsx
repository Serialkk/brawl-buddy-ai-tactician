
import React from 'react';
import { PlayerProfile } from '@/components/profiles/PlayerProfile';
import { PersonalStats } from '@/components/performance-tracking/PersonalStats';

const Profile = () => {
  return (
    <div className="container mx-auto py-6 px-4 relative z-10">
      <div className="grid gap-6 grid-cols-1">
        <PlayerProfile />
        <PersonalStats />
      </div>
    </div>
  );
};

export default Profile;
