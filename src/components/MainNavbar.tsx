
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'lucide-react';
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
      <div className="container mx-auto flex items-center h-14">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/patch-notes" className={navigationMenuTriggerStyle()}>
                Patch Notes
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/profile" className={navigationMenuTriggerStyle()}>
                Profil
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
