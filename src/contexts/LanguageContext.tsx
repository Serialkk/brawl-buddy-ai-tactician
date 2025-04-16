import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultLanguage: Language = 'en';

// Simple translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    // Common
    'app.title': 'Brawl Buddy AI Tactician',
    'app.loading': 'Loading...',
    'app.error': 'Error loading data',
    'app.reset': 'Reset',
    'app.save': 'Save',
    'app.cancel': 'Cancel',
    'app.confirm': 'Confirm',
    
    // Team Builder
    'team.title': 'Team Composition Analysis',
    'team.description': 'Build the perfect team for any game mode or discover which brawlers work best together.',
    'team.gameMode': 'Game Mode',
    'team.selectGameMode': 'Select the game mode you want to play',
    'team.selectTeam': 'Select Your Team',
    'team.chooseTeam': 'Choose up to 3 Brawlers for your team',
    'team.selectedCount': 'Selected {count}/3 Brawlers',
    'team.compatibleBrawlers': 'Show Compatible Brawlers',
    'team.resetSelection': 'Reset Selection',
    'team.allRoles': 'All Roles',
    'team.allRarities': 'All Rarities',
    'team.searchBrawlers': 'Search brawlers...',
    'team.noMatches': 'No brawlers match your filters.',
    'team.clearFilters': 'Clear all filters',
    'team.loadingBrawlers': 'Loading brawlers...',
    'team.topTeams': 'Top Teams for {gameMode}',
    'team.metaTeams': 'Meta-analyzed team compositions with the highest win rates',
    'team.yourTeam': 'Your Selected Team',
    'team.teamDetails': 'Details of your selected brawlers',
    
    // Map modes
    'gameMode.gemGrab': 'Gem Grab',
    'gameMode.brawlBall': 'Brawl Ball',
    'gameMode.heist': 'Heist',
    'gameMode.bounty': 'Bounty',
    'gameMode.siege': 'Siege',
    'gameMode.hotZone': 'Hot Zone',
    'gameMode.knockout': 'Knockout',
    'gameMode.showdown': 'Showdown',
    'gameMode.duels': 'Duels',
    'gameMode.wipeout': 'Wipeout'
  },
  de: {
    // Common
    'app.title': 'Brawl Buddy KI-Taktiker',
    'app.loading': 'Wird geladen...',
    'app.error': 'Fehler beim Laden der Daten',
    'app.reset': 'Zurücksetzen',
    'app.save': 'Speichern',
    'app.cancel': 'Abbrechen',
    'app.confirm': 'Bestätigen',
    
    // Team Builder
    'team.title': 'Team-Zusammenstellungs-Analyse',
    'team.description': 'Stelle das perfekte Team für jeden Spielmodus zusammen oder finde heraus, welche Brawler am besten zusammenarbeiten.',
    'team.gameMode': 'Spielmodus',
    'team.selectGameMode': 'Wähle den Spielmodus aus, in dem du spielen möchtest',
    'team.selectTeam': 'Wähle dein Team',
    'team.chooseTeam': 'Wähle bis zu 3 Brawler für dein Team',
    'team.selectedCount': '{count}/3 Brawler ausgewählt',
    'team.compatibleBrawlers': 'Kompatible Brawler anzeigen',
    'team.resetSelection': 'Auswahl zurücksetzen',
    'team.allRoles': 'Alle Rollen',
    'team.allRarities': 'Alle Seltenheiten',
    'team.searchBrawlers': 'Brawler suchen...',
    'team.noMatches': 'Keine Brawler entsprechen deinen Filtern.',
    'team.clearFilters': 'Alle Filter löschen',
    'team.loadingBrawlers': 'Brawler werden geladen...',
    'team.topTeams': 'Top Teams für {gameMode}',
    'team.metaTeams': 'Meta-analysierte Team-Zusammensetzungen mit den höchsten Gewinnraten',
    'team.yourTeam': 'Dein ausgewähltes Team',
    'team.teamDetails': 'Details zu deinen ausgewählten Brawlern',
    
    // Map modes
    'gameMode.gemGrab': 'Gem Grab',
    'gameMode.brawlBall': 'Brawl Ball',
    'gameMode.heist': 'Tresor',
    'gameMode.bounty': 'Kopfgeld',
    'gameMode.siege': 'Belagerung',
    'gameMode.hotZone': 'Heiße Zone',
    'gameMode.knockout': 'Knockout',
    'gameMode.showdown': 'Showdown',
    'gameMode.duels': 'Duelle',
    'gameMode.wipeout': 'Wipeout'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get from localStorage first
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'en' || savedLanguage === 'de') {
      return savedLanguage;
    }
    
    // Otherwise try to detect from browser
    const browserLang = navigator.language.substring(0, 2);
    return browserLang === 'de' ? 'de' : defaultLanguage;
  });

  useEffect(() => {
    // Save language preference to localStorage when it changes
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Translate function
  const t = (key: string): string => {
    const translation = translations[language]?.[key];
    
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      // Try to fallback to English
      return translations['en']?.[key] || key;
    }
    
    return translation;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
