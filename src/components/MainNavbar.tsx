
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, BarChart3, Clock, Swords, BookOpen, Search, Settings, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const MainNavbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-full bg-background/95 backdrop-blur-md border-b border-brawl-purple/20 z-40 fixed top-12 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Linker Bereich (Logo oder Branding) */}
        <div className="flex items-center">
          <Link to="/" className="font-lilita text-xl text-brawl-yellow flex items-center gap-2">
            Brawl-Buddy
          </Link>
        </div>
        
        {/* Zentraler Bereich - Hauptnavigation */}
        <div className="hidden md:flex mx-auto relative">
          <div className="bg-black/40 backdrop-blur-sm rounded-full border border-brawl-purple/30 relative">
            {/* Menu Titel - Adjusted positioning */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-brawl-purple/80 text-white px-3 py-1 rounded-full text-xs font-bold">
                Menu
              </span>
            </div>
            
            <nav className="flex">
              <Link to="/maps" className={`px-4 py-2 flex items-center gap-1.5 font-medium transition-colors ${isActive('/maps') ? 'text-brawl-yellow' : 'text-white/80 hover:text-white'}`}>
                <Map className="h-4 w-4" />
                <span>Maps</span>
              </Link>
              
              <Link to="/replay-analysis" className={`px-4 py-2 flex items-center gap-1.5 font-medium transition-colors ${isActive('/replay-analysis') ? 'text-brawl-yellow' : 'text-white/80 hover:text-white'}`}>
                <Clock className="h-4 w-4" />
                <span>Replay</span>
              </Link>
              
              <Link to="/team-composition" className={`px-4 py-2 flex items-center gap-1.5 font-medium transition-colors ${isActive('/team-composition') ? 'text-brawl-yellow' : 'text-white/80 hover:text-white'}`}>
                <Swords className="h-4 w-4" />
                <span>Teams</span>
              </Link>
              
              <Link to="/strategy" className={`px-4 py-2 flex items-center gap-1.5 font-medium transition-colors ${isActive('/strategy') ? 'text-brawl-yellow' : 'text-white/80 hover:text-white'}`}>
                <BookOpen className="h-4 w-4" />
                <span>Strategie</span>
              </Link>
              
              <Link to="/stats" className={`px-4 py-2 flex items-center gap-1.5 font-medium transition-colors ${isActive('/stats') ? 'text-brawl-yellow' : 'text-white/80 hover:text-white'}`}>
                <BarChart3 className="h-4 w-4" />
                <span>Statistiken</span>
              </Link>
              
              <Link to="/patch-notes" className={`px-4 py-2 flex items-center gap-1.5 font-medium transition-colors ${isActive('/patch-notes') ? 'text-brawl-yellow' : 'text-white/80 hover:text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                  <line x1="9" y1="9" x2="10" y2="9" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="15" y2="17" />
                </svg>
                <span>Patch Notes</span>
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Rechter Bereich - Benutzeraktionen */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
            <Search className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          
          <Link to="/profile">
            {user ? (
              <div className="w-8 h-8 rounded-full bg-brawl-purple flex items-center justify-center text-white">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <User className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            )}
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation (nur angezeigt auf kleineren Bildschirmen) */}
      <div className="md:hidden container mx-auto overflow-x-auto pb-2">
        <div className="flex space-x-1 w-max">
          <Link to="/maps" className={`px-3 py-1.5 flex items-center gap-1.5 font-medium text-sm rounded-full transition-colors ${isActive('/maps') ? 'bg-brawl-purple/20 text-brawl-yellow' : 'text-white/80'}`}>
            <Map className="h-3.5 w-3.5" />
            <span>Maps</span>
          </Link>
          
          <Link to="/replay-analysis" className={`px-3 py-1.5 flex items-center gap-1.5 font-medium text-sm rounded-full transition-colors ${isActive('/replay-analysis') ? 'bg-brawl-purple/20 text-brawl-yellow' : 'text-white/80'}`}>
            <Clock className="h-3.5 w-3.5" />
            <span>Replay</span>
          </Link>
          
          <Link to="/team-composition" className={`px-3 py-1.5 flex items-center gap-1.5 font-medium text-sm rounded-full transition-colors ${isActive('/team-composition') ? 'bg-brawl-purple/20 text-brawl-yellow' : 'text-white/80'}`}>
            <Swords className="h-3.5 w-3.5" />
            <span>Teams</span>
          </Link>
          
          <Link to="/strategy" className={`px-3 py-1.5 flex items-center gap-1.5 font-medium text-sm rounded-full transition-colors ${isActive('/strategy') ? 'bg-brawl-purple/20 text-brawl-yellow' : 'text-white/80'}`}>
            <BookOpen className="h-3.5 w-3.5" />
            <span>Strategie</span>
          </Link>
          
          <Link to="/stats" className={`px-3 py-1.5 flex items-center gap-1.5 font-medium text-sm rounded-full transition-colors ${isActive('/stats') ? 'bg-brawl-purple/20 text-brawl-yellow' : 'text-white/80'}`}>
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Statistiken</span>
          </Link>
          
          <Link to="/patch-notes" className={`px-3 py-1.5 flex items-center gap-1.5 font-medium text-sm rounded-full transition-colors ${isActive('/patch-notes') ? 'bg-brawl-purple/20 text-brawl-yellow' : 'text-white/80'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
              <line x1="9" y1="9" x2="10" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            <span>Patch</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
