
import React from "react";
import { PatchNoteSummary } from "@/components/patch-notes/PatchNoteSummary";

// Define the mockPatchNote with proper typing for the 'type' property
const mockPatchNote = {
  version: "61.0",
  date: "18. April 2025",
  highlights: [
    "Shelly erhält bedeutende Verbesserungen für mehr Präsenz in der Meta",
    "Nerfs für dominante Brawler wie Brock und Colt",
    "Neue Mechaniken für El Primo zur besseren Team-Unterstützung"
  ],
  changes: [
    {
      brawler: "Shelly",
      type: "buff" as const,  // Using 'as const' to tell TypeScript this is a literal type
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
    }
  ]
};

const PatchNotes = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
        Patch Notes Zusammenfassung
      </h1>
      <PatchNoteSummary patchNote={mockPatchNote} />
    </div>
  );
};

export default PatchNotes;
