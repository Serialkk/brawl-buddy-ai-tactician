
export interface TeamRecommendation {
  comp: number[];
  score: number;
  synergy: string;
}

export const compatibilityData: Record<string, TeamRecommendation[]> = {
  "gemGrab": [
    { comp: [2, 5, 10], score: 92, synergy: "High damage + healing + turret defense" },
    { comp: [3, 7, 11], score: 87, synergy: "Area control + tankiness" },
    { comp: [1, 6, 12], score: 83, synergy: "Bear + ricochet shots + close range power" }
  ],
  "brawlBall": [
    { comp: [4, 8, 10], score: 95, synergy: "Tank duo with healing support" },
    { comp: [1, 11, 12], score: 89, synergy: "Lane control + goal scoring potential" },
    { comp: [5, 6, 8], score: 84, synergy: "Turret defense with aggressive tanks" }
  ],
  "heist": [
    { comp: [2, 3, 7], score: 94, synergy: "High damage output + wall breaking" },
    { comp: [4, 9, 12], score: 88, synergy: "Tank rush + area denial" },
    { comp: [5, 7, 8], score: 82, synergy: "Turret defense + aggressive push" }
  ],
  "bounty": [
    { comp: [2, 3, 12], score: 96, synergy: "Long range trio with high damage" },
    { comp: [1, 9, 10], score: 85, synergy: "Area control + healing" },
    { comp: [5, 6, 7], score: 79, synergy: "Pet + turret + area denial" }
  ],
  "siege": [
    { comp: [4, 5, 9], score: 91, synergy: "Turret defense + tank for bolt collection" },
    { comp: [2, 8, 11], score: 86, synergy: "Bolt collection + siege push" },
    { comp: [3, 6, 12], score: 81, synergy: "Area control + bolt collection" }
  ],
  "hotZone": [
    { comp: [6, 9, 10], score: 93, synergy: "Area control + healing for zone dominance" },
    { comp: [1, 4, 11], score: 88, synergy: "Tank duo with zone control" },
    { comp: [2, 5, 7], score: 83, synergy: "Zone denial + turret control" }
  ]
};
