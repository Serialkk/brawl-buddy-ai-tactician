
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

/**
 * Attempts to fetch the latest patch notes from the Brawlify API
 * Falls back to null if the API fails, which will trigger using the mock data
 */
export const fetchLatestPatchNotes = async (): Promise<BrawlifyPatchNote | null> => {
  try {
    // First try with the expected endpoint
    const response = await fetch('https://api.brawlify.com/v1/events/balance-changes', {
      signal: AbortSignal.timeout(5000),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.log(`Balance changes API returned status ${response.status}, falling back to mock data`);
      return null;
    }

    const data = await response.json();
    if (!data.list || data.list.length === 0) {
      console.log("No patch notes found in API response");
      return null;
    }
    
    return data.list[0];
  } catch (error) {
    handleApiError(error, "Patch Notes");
    return null;
  }
};
