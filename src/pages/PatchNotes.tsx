
import React from "react";
import { PatchNoteSummary } from "@/components/patch-notes/PatchNoteSummary";
import { Bell, AlertTriangle } from "lucide-react";

// Update mockPatchNote with Rico's nerf
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
  return (
    <>
      {/* Fixed Banner - Made more prominent */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-brawl-red via-brawl-purple to-brawl-blue p-4 text-white shadow-lg z-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <AlertTriangle className="h-5 w-5 text-brawl-yellow animate-pulse" />
              <span className="font-bold text-lg">Patch {mockPatchNote.version}</span>
              <span className="text-sm bg-black/30 px-2 py-1 rounded">{mockPatchNote.date}</span>
            </div>
            
            <div className="flex-1 max-w-2xl mx-4 overflow-hidden">
              <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite]">
                <span className="text-brawl-yellow font-bold">BREAKING NEWS:</span> Rico erhält bedeutende Nerfs - Reichweite und Schaden der Standardattacke um 10% reduziert!
              </div>
            </div>
            
            <Bell className="h-5 w-5 text-brawl-yellow hidden md:block" />
          </div>
        </div>
      </div>

      {/* Main content with padding to account for fixed banner */}
      <div className="container mx-auto p-6 max-w-4xl mt-28">
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Patch Notes Zusammenfassung
        </h1>
        <PatchNoteSummary patchNote={mockPatchNote} />
      </div>
    </>
  );
};

export default PatchNotes;
