
import { toast } from "sonner";

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

export const fetchLatestPatchNotes = async (): Promise<BrawlifyPatchNote | null> => {
  try {
    const response = await fetch('https://api.brawlify.com/v1/events/balance-changes', {
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.list?.[0] || null;
  } catch (error) {
    console.error('Error fetching patch notes:', error);
    toast.error("Fehler beim Laden der Patch Notes");
    return null;
  }
};
