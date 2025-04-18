
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Calendar, Users, Map, BarChart, Clock, Search, Brain, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@brawlbuddy.app',
        password: 'demo123',
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Logged in successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Error signing in');
    }
  };

  // Extract user's email and get the first letter for avatar fallback
  const userEmail = user?.email || '';
  const userInitial = userEmail ? userEmail[0].toUpperCase() : '?';

  // Get user's name from user_metadata if available
  const userName = user?.user_metadata?.username || userEmail || 'User';

  return (
    <nav className="w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Brawl Stats</h1>
        </div>
        
        <div className="flex-1 px-3">
          <Button
            variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <Button
            variant={activeTab === 'events' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('events')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Events
          </Button>

          <Button
            variant={activeTab === 'team' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('team')}
          >
            <Users className="mr-2 h-4 w-4" />
            Team Composition
          </Button>

          <Button
            variant={activeTab === 'maps' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('maps')}
          >
            <Map className="mr-2 h-4 w-4" />
            Maps
          </Button>

          <Button
            variant={activeTab === 'strategy' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('strategy')}
          >
            <Brain className="mr-2 h-4 w-4" />
            Strategy Guide
          </Button>

          <Button
            variant={activeTab === 'stats' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('stats')}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Real Time Stats
          </Button>

          <Button
            variant={activeTab === 'replay' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('replay')}
          >
            <Clock className="mr-2 h-4 w-4" />
            Replay Analysis
          </Button>

          <Button
            variant={activeTab === 'opponent' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('opponent')}
          >
            <Search className="mr-2 h-4 w-4" />
            Opponent Prediction
          </Button>

          <Button
            variant={activeTab === 'analysis' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab('analysis')}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Advanced Team Analysis
          </Button>
        </div>
        
        <div className="p-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 w-full justify-start">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <span>{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={handleSignIn}
              variant="default" 
              className="w-full justify-start gap-2"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
