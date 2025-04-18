
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
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-black/50 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-center font-lilita text-brawl-yellow/90">
          Patch Notes Zusammenfassung
        </h1>
      </div>
      <PatchNoteSummary patchNote={mockPatchNote} />
    </div>
  );
};

export default PatchNotes;
