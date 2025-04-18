import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const Index = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
        Willkommen zur Brawl Stars Balance Tracker App!
      </h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
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
    </div>
  );
};

export default Index;
