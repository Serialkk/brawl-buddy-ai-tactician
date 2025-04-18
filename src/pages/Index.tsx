
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { GradientText } from '@/components/ui/brawl-classes';
import { ChatArea } from '@/components/chat/ChatArea';
import { LoginBox } from '@/components/auth/LoginBox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Index = () => {
  const { user, isLoading } = useAuth();
  
  // Debug-Logging für Authentifizierungsstatus
  useEffect(() => {
    console.log("Auth state on Index page:", { user, isLoading });
  }, [user, isLoading]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-black/50 rounded-lg p-4 mb-6">
        <GradientText 
          from="from-white" 
          to="to-brawl-yellow" 
          className="text-3xl font-bold text-center block"
        >
          Willkommen zur Brawl-Buddy-AI-Tactician!
        </GradientText>
      </div>
      
      <p className="text-lg text-center text-white/90 mb-8">
        Bleibe immer auf dem Laufenden mit den neuesten Änderungen und Trends in Brawl Stars.
      </p>

      {/* Login-Box mit Debugging */}
      {isLoading ? (
        <div className="mb-8 text-center text-white">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-brawl-purple mx-auto"></div>
          <p className="mt-2">Authentifizierungsstatus wird geladen...</p>
        </div>
      ) : !user ? (
        <div className="mb-8">
          <LoginBox />
        </div>
      ) : (
        <div className="mb-8 p-4 bg-black/30 rounded-lg text-center">
          <p className="text-white">Willkommen zurück, {user.email || 'Benutzer'}!</p>
        </div>
      )}
      
      {/* Breaking news banner */}
      <div className="mt-6 p-4 bg-gradient-to-r from-brawl-red to-brawl-purple rounded-lg shadow-lg animate-pulse">
        <Link 
          to="/patch-notes" 
          className="flex items-center justify-center gap-2 text-white font-bold p-3 hover:opacity-90 transition-opacity"
        >
          <AlertTriangle className="h-5 w-5" />
          <span>BREAKING NEWS: Rico erhält bedeutende Nerfs! Patch Notes Ansehen</span>
          <AlertTriangle className="h-5 w-5" />
        </Link>
      </div>
      
      {/* Chat Area */}
      <ChatArea />
    </div>
  );
};

export default Index;
