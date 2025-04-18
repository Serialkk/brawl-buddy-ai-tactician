
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PatchNoteSummary } from "@/components/patch-notes/PatchNoteSummary";
import { fetchLatestPatchNotes } from "@/services/patchNotesService";
import { Bell, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback mock data in case API fails
const mockPatchNote = {
  version: "61.0",
  date: "18. April 2025",
  highlights: [
    "Shelly erhält bedeutende Verbesserungen für mehr Präsenz in der Meta",
    "Nerfs für dominante Brawler wie Brock und Colt",
    "Neue Mechaniken für El Primo zur besseren Team-Unterstützung",
    "Breaking News: Rico erhält bedeutende Nerfs"  // Added breaking news highlight
  ],
  changes: [
    {
      brawler: "Shelly",
      type: "buff" as const,
      description: "Basis-Schaden erhöht von 420 auf 460, Super lädt sich 10% schneller auf"
    },
    {
      brawler: "Brock",
      type: "nerf" as const,
      description: "Schaden pro Rakete reduziert von 1600 auf 1520"
    },
    {
      brawler: "El Primo",
      type: "rework" as const,
      description: "Neue Passiv-Fähigkeit: Gewährt nahegelegenen Verbündeten einen kleinen Geschwindigkeitsboost"
    },
    {
      brawler: "Colt",
      type: "nerf" as const,
      description: "Aufladerate seiner Super um 15% reduziert"
    },
    {
      brawler: "Rico",
      type: "nerf" as const,
      description: "Reichweite und Schaden der Standardattacke um 10% reduziert"
    }
  ]
};

const PatchNotes = () => {
  const { data: patchNote, isLoading, error } = useQuery({
    queryKey: ['patchNotes'],
    queryFn: fetchLatestPatchNotes,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const transformedPatchNote = React.useMemo(() => {
    if (!patchNote) return mockPatchNote;

    return {
      version: patchNote.name,
      date: new Date(patchNote.time).toLocaleDateString('de-DE'),
      highlights: patchNote.description,
      changes: patchNote.balance.map(change => ({
        brawler: change.brawler,
        type: change.type,
        description: change.changes.join(", ")
      }))
    };
  }, [patchNote]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-black/50 rounded-lg" />
          <div className="h-96 bg-black/30 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-black/50 rounded-lg p-4 mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-center font-lilita text-brawl-yellow/90">
          Patch Notes Zusammenfassung
        </h1>
        {error && (
          <div className="flex items-center text-amber-400 gap-1">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">Offline Modus</span>
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-400 mb-1">API Verbindungsfehler</h3>
            <p className="text-sm text-muted-foreground">
              Die aktuellen Patch Notes konnten nicht geladen werden. Es werden die zuletzt bekannten Änderungen angezeigt.
            </p>
          </div>
        </div>
      )}
      
      <PatchNoteSummary patchNote={transformedPatchNote} />
    </div>
  );
};

export default PatchNotes;
