
import { Brawler } from "@/data/types/brawler";

// API endpoints
const BRAWL_API_URL = "https://api.brawlapi.com/v1";

// Interface für die API-Antwort
interface BrawlAPIResponse {
  list: BrawlApiBrawler[];
}

interface BrawlApiBrawler {
  id: number;
  name: string;
  hash: string;
  path: string;
  released: boolean;
  rarity: {
    id: number;
    name: string;
  };
  role?: {
    id: number;
    name: string;
  };
  class?: {
    id: number;
    name: string;
  };
  description: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
}

// API-Brawler in unser Brawler-Model konvertieren
const mapApiBrawlerToModel = (apiBrawler: BrawlApiBrawler): Brawler => {
  // Hole die Rolle entweder aus role oder class (API scheint beides zu verwenden)
  const roleName = apiBrawler.role?.name || apiBrawler.class?.name || "Unknown";
  
  return {
    id: apiBrawler.id,
    name: apiBrawler.name,
    role: roleName,
    rarity: apiBrawler.rarity?.name || "Unknown",
    image: apiBrawler.imageUrl || `/brawlers/${apiBrawler.name.toLowerCase().replace(/ /g, "-")}.png`,
    stats: {
      health: 0, // Diese Werte sind in der API nicht verfügbar
      damage: 0,
      speed: "Normal",
      range: "Medium"
    },
    abilities: {
      basic: "",
      super: "",
      gadget1: "",
      starPower1: ""
    }
  };
};

// Alle Brawler abrufen
export const fetchBrawlers = async (): Promise<Brawler[]> => {
  try {
    const response = await fetch(`${BRAWL_API_URL}/brawlers`);
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data: BrawlAPIResponse = await response.json();
    
    if (!data.list || !Array.isArray(data.list)) {
      console.error("Ungültiges API-Antwortformat:", data);
      throw new Error("Ungültiges API-Antwortformat");
    }
    
    console.log(`API returned ${data.list.length} brawlers`);
    
    return data.list
      .filter(b => b.released)
      .map(mapApiBrawlerToModel);
  } catch (error) {
    console.error("Fehler beim Abrufen der Brawler:", error);
    // Auf lokale Daten zurückfallen, wenn die API fehlschlägt
    const { brawlers } = await import('@/data/brawlers');
    return brawlers;
  }
};

// Maps von der API abrufen
export const fetchMaps = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${BRAWL_API_URL}/maps`);
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.list || !Array.isArray(data.list)) {
      console.error("Ungültiges API-Antwortformat für Karten:", data);
      throw new Error("Ungültiges API-Antwortformat für Karten");
    }
    
    console.log(`API returned ${data.list.length} maps`);
    
    return data.list.filter((map: any) => map.disabled !== true);
  } catch (error) {
    console.error("Fehler beim Abrufen der Karten:", error);
    return []; // Leeres Array zurückgeben, wenn die API fehlschlägt
  }
};
