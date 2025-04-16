
import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { useMobile } from '@/hooks/use-mobile';
import { Trophy, Users, Map, ChevronRight, BarChart, PlayCircle, Brain, Layout, Info } from 'lucide-react';
import { ProfileMenu } from './ProfileMenu';
import { LanguageToggle } from './LanguageToggle';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { isMobile } = useMobile();
  
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Layout className="w-5 h-5" /> },
    { id: 'team', label: 'Team Builder', icon: <Users className="w-5 h-5" /> },
    { id: 'maps', label: 'Maps', icon: <Map className="w-5 h-5" /> },
    { id: 'strategy', label: 'Strategy Guide', icon: <Info className="w-5 h-5" /> },
    { id: 'stats', label: 'Statistics', icon: <BarChart className="w-5 h-5" /> },
    { id: 'replay', label: 'Replay Analysis', icon: <PlayCircle className="w-5 h-5" /> },
    { id: 'opponent', label: 'Counter Picks', icon: <Brain className="w-5 h-5" /> },
  ];

  return (
    <Sidebar className="flex flex-col border-r border-r-border">
      <div className="p-4 flex items-center gap-2">
        <Trophy className="h-6 w-6 text-brawl-blue" />
        <h1 className="text-xl font-semibold">Brawl Buddy</h1>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-2 text-left transition-colors
              ${activeTab === item.id ? 'text-brawl-blue bg-muted' : 'text-muted-foreground hover:bg-muted/50'}
            `}
          >
            {item.icon}
            <span className={`${isMobile ? 'hidden' : 'block'}`}>{item.label}</span>
            {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-border flex items-center justify-between">
        <LanguageToggle />
        <ProfileMenu />
      </div>
    </Sidebar>
  );
};

export default Navigation;
