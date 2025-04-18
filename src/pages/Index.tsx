
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { GradientText } from '@/components/ui/brawl-classes';
import { ChatArea } from '@/components/chat/ChatArea';

const Index = () => {
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
      
      {/* Add a prominent link to patch notes */}
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
