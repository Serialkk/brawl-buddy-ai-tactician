
import { toast } from "sonner";
import { handleApiError } from "@/utils/apiUtils";

export interface BrawlifyPatchNote {
  name: string;
  time: string;
  description: string[];
  balance: {
    brawler: string;
    changes: string[];
    type: "buff" | "nerf" | "rework";
  }[];
}

// Official Brawl Stars API equivalent structure
export interface OfficialPatchNote {
  version: string;
  releaseDate: string;
  notes: string[];
  changes: {
    characterName: string;
    changeType: string;
    modifications: string[];
  }[];
}

/**
 * Attempts to fetch the latest patch notes from multiple sources
 * Falls back to null if all APIs fail, which will trigger using the mock data
 */
export const fetchLatestPatchNotes = async (): Promise<BrawlifyPatchNote | null> => {
  // Try multiple sources in order of preference
  const result = await tryBrawlStarsAPI() || await tryBrawlifyAPI() || await tryBrawlApiInfo();
  return result;
};

/**
 * Try to fetch from the primary Brawlify API
 */
async function tryBrawlifyAPI(): Promise<BrawlifyPatchNote | null> {
  try {
    console.log("Trying Brawlify API...");
    const response = await fetch('https://api.brawlify.com/v1/events/balance-changes', {
      signal: AbortSignal.timeout(3000),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.log(`Brawlify API returned status ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (!data.list || data.list.length === 0) {
      console.log("No patch notes found in Brawlify API response");
      return null;
    }
    
    console.log("Successfully fetched data from Brawlify API");
    return data.list[0];
  } catch (error) {
    console.log("Error with Brawlify API:", error);
    return null;
  }
}

/**
 * Try to fetch from the official Brawl Stars API (if it were available)
 * Currently this is a placeholder since no official API exists
 */
async function tryBrawlStarsAPI(): Promise<BrawlifyPatchNote | null> {
  try {
    // Note: No official API exists, this is just a placeholder
    // We could replace this with actual implementation if Supercell releases an API
    return null;
  } catch (error) {
    console.log("Error with Brawl Stars API:", error);
    return null;
  }
}

/**
 * Try alternative Brawl Stars info API
 */
async function tryBrawlApiInfo(): Promise<BrawlifyPatchNote | null> {
  try {
    console.log("Trying Brawl API Info...");
    const response = await fetch('https://bsproxy.royaleapi.dev/v1/events', {
      signal: AbortSignal.timeout(3000),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.log(`Brawl API Info returned status ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    // This API doesn't directly provide patch notes, but we could extract some game info
    // Convert to our expected format if needed
    console.log("Received data from alternative API, but format doesn't match needed patch notes");
    return null;
  } catch (error) {
    console.log("Error with Brawl API Info:", error);
    return null;
  }
}

/**
 * Handle all API errors and provide appropriate fallbacks
 */
export const handlePatchNotesError = (error: unknown): void => {
  handleApiError(error, "Patch Notes");
  toast.error("Konnte keine aktuellen Patch Notes laden", {
    description: "Offline-Modus aktiviert"
  });
};
