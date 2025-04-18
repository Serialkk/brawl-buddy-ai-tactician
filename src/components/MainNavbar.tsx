import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Map, BarChart3, Clock, Cpu, Swords, BookOpen } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const MainNavbar = () => {
  return (
    <div className="w-full bg-background/80 backdrop-blur-sm border-b border-border z-40">
      <div className="container mx-auto flex items-center h-14 overflow-x-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-nowrap">
            <NavigationMenuItem>
              <Link to="/" className={`${navigationMenuTriggerStyle()} text-brawl-yellow/90 font-lilita`}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/patch-notes" className={`${navigationMenuTriggerStyle()} text-brawl-yellow/90 font-lilita`}>
                Patch Notes
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/maps" className={`${navigationMenuTriggerStyle()} text-brawl-yellow/90 font-lilita`}>
                <Map className="h-4 w-4 mr-2" />
                Maps
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/replay-analysis" className={`${navigationMenuTriggerStyle()} text-brawl-yellow/90 font-lilita`}>
                <Clock className="h-4 w-4 mr-2" />
                Replay Analysis
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/team-composition" className={`${navigationMenuTriggerStyle()} text-brawl-yellow/90 font-lilita`}>
                <Swords className="h-4 w-4 mr-2" />
                Team Composition
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/strategy" className={`${navigationMenuTriggerStyle()} text-brawl-yellow/90 font-lilita`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Strategy Guide
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/stats" className={`${navigationMenuTriggerStyle()} text-brawl-yellow/90 font-lilita`}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Stats
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/profile" className={navigationMenuTriggerStyle()}>
                Profile
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="ml-auto flex items-center gap-4">
          <Navigation className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
