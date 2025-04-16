
interface AnalysisResult {
  brawlerUsed: string;
  gameMode: string;
  metrics: {
    accuracy: number;
    positioning: number;
    superUsage: number;
    mapControl: number;
  };
  strengths: string[];
  weaknesses: string[];
  timestamp: string;
}

// Collection of possible strengths for different brawlers and game modes
const brawlerStrengths: Record<string, string[]> = {
  "Shelly": [
    "Excellent use of Super to break enemy formations",
    "Good close-range combat control",
    "Effective bush checking with wide attack spread",
    "Smart use of walls for protection between attacks"
  ],
  "Colt": [
    "Great precision with long-range shots",
    "Effective use of Super to open up the map",
    "Good movement to maintain optimal attack distance",
    "Smart positioning to maximize damage output"
  ],
  "Poco": [
    "Excellent team healing timing",
    "Good use of wide attack to hit multiple opponents",
    "Effective support positioning behind teammates",
    "Smart Super usage to turn team fights"
  ],
  "default": [
    "Good positioning throughout the match",
    "Effective use of terrain to gain advantage",
    "Smart cooldown management",
    "Good awareness of enemy positions"
  ]
};

// Collection of possible weaknesses for different brawlers
const brawlerWeaknesses: Record<string, string[]> = {
  "Shelly": [
    "Overextending in open areas without cover",
    "Holding Super too long without using it",
    "Taking too many long-range engagements",
    "Not utilizing bushes for ambush opportunities"
  ],
  "Colt": [
    "Missing critical shots in key moments",
    "Poor Super usage without breaking important walls",
    "Standing still while attacking making you an easy target",
    "Engaging too close to shotgunners"
  ],
  "Poco": [
    "Wasting healing on full-health teammates",
    "Positioning too far from teammates to provide support",
    "Not using regular attacks to charge Super quickly",
    "Getting caught alone without teammates nearby"
  ],
  "default": [
    "Over-aggression at critical moments",
    "Poor positioning during the final countdown",
    "Not adapting to enemy team composition",
    "Missing opportunities to use Super for maximum value"
  ]
};

// Game mode specific feedback
const gameModeStrengths: Record<string, string[]> = {
  "Gem Grab": [
    "Excellent gem control throughout mid-game",
    "Good defensive position when carrying gems",
    "Smart rotations between lanes",
    "Effective countdown management in final seconds"
  ],
  "Brawl Ball": [
    "Great ball control under pressure",
    "Smart passing to teammates in better positions",
    "Good goal defense in critical moments",
    "Effective use of Super to clear path to goal"
  ],
  "Showdown": [
    "Smart power cube collection strategy",
    "Good bush checking to prevent ambushes",
    "Effective teaming/anti-teaming tactics",
    "Strategic positioning as the poison closes in"
  ],
  "Bounty": [
    "Excellent star collection efficiency",
    "Good retreat timing when carrying high stars",
    "Effective team support during star collection",
    "Smart positioning to avoid unnecessary deaths"
  ],
  "Heist": [
    "Strong safe defense positioning",
    "Effective team coordination during pushes",
    "Good use of Super for maximum safe damage",
    "Smart rotations between offense and defense"
  ]
};

const gameModeWeaknesses: Record<string, string[]> = {
  "Gem Grab": [
    "Overextending when carrying gems",
    "Poor countdown management in final seconds",
    "Not supporting gem carrier effectively",
    "Ignoring mine control during early game"
  ],
  "Brawl Ball": [
    "Holding the ball too long without passing or shooting",
    "Missing open goal opportunities",
    "Poor defensive positioning during enemy attacks",
    "Not using walls effectively for passes"
  ],
  "Showdown": [
    "Taking unnecessary early game fights",
    "Predictable movement patterns",
    "Poor poison management in late game",
    "Getting trapped between multiple opponents"
  ],
  "Bounty": [
    "Taking high-risk engagements with many stars",
    "Not retreating when low on health with stars",
    "Poor lane control",
    "Overextending for stars when team is ahead"
  ],
  "Heist": [
    "Not coordinating attacks with teammates",
    "Neglecting safe defense during enemy pushes",
    "Inefficient damage output on safe",
    "Poor Super usage for safe damage"
  ]
};

// Generic timestamp comments
const timestampComments = [
  "at 2:14",
  "during the final minute",
  "at 1:45",
  "early in the match",
  "at the 30-second mark",
  "during the team fight at mid",
  "in the final push",
  "when contesting the objective"
];

// Helper function to get random items from an array
function getRandomItems(array: string[], count: number): string[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper to add timestamps to some feedback items
function addTimestampsToFeedback(feedbackItems: string[]): string[] {
  return feedbackItems.map(item => {
    // Add timestamps to ~50% of items
    if (Math.random() > 0.5) {
      const timestamp = timestampComments[Math.floor(Math.random() * timestampComments.length)];
      return `${item} ${timestamp}`;
    }
    return item;
  });
}

export function generateMockAnalysisResults(selectedFile: File | null): AnalysisResult {
  // Determine brawler used based on filename
  let brawlerUsed = "Unknown";
  const brawlers = ["shelly", "colt", "poco", "bull", "jessie", "brock", "nita", "el primo", "rosa"];
  
  if (selectedFile) {
    const filename = selectedFile.name.toLowerCase();
    for (const brawler of brawlers) {
      if (filename.includes(brawler)) {
        brawlerUsed = brawler.charAt(0).toUpperCase() + brawler.slice(1);
        break;
      }
    }
  }
  
  // If no specific brawler found, choose randomly
  if (brawlerUsed === "Unknown") {
    const randomBrawler = brawlers[Math.floor(Math.random() * brawlers.length)];
    brawlerUsed = randomBrawler.charAt(0).toUpperCase() + randomBrawler.slice(1);
  }
  
  // Determine game mode - more variety now
  const gameModes = ["Gem Grab", "Brawl Ball", "Showdown", "Bounty", "Heist"];
  const gameMode = gameModes[Math.floor(Math.random() * gameModes.length)];
  
  // Generate more realistic metrics with some variability
  const generateMetric = (base: number) => Math.floor(base + Math.random() * 30);
  const accuracy = generateMetric(60);
  const positioning = generateMetric(50);
  const superUsage = generateMetric(65);
  const mapControl = generateMetric(45);
  
  // Get specific strengths for this brawler or use defaults
  const brawlerSpecificStrengths = brawlerStrengths[brawlerUsed] || brawlerStrengths["default"];
  const modeSpecificStrengths = gameModeStrengths[gameMode] || [];
  
  // Combine brawler and mode strengths, then pick 3 unique ones
  const combinedStrengths = [...brawlerSpecificStrengths, ...modeSpecificStrengths];
  const selectedStrengths = getRandomItems(combinedStrengths, 3);
  
  // Get specific weaknesses for this brawler or use defaults
  const brawlerSpecificWeaknesses = brawlerWeaknesses[brawlerUsed] || brawlerWeaknesses["default"];
  const modeSpecificWeaknesses = gameModeWeaknesses[gameMode] || [];
  
  // Combine brawler and mode weaknesses, then pick 3 unique ones
  const combinedWeaknesses = [...brawlerSpecificWeaknesses, ...modeSpecificWeaknesses];
  const selectedWeaknesses = getRandomItems(combinedWeaknesses, 3);
  
  // Add timestamps to make feedback more specific
  const strengthsWithTimestamps = addTimestampsToFeedback(selectedStrengths);
  const weaknessesWithTimestamps = addTimestampsToFeedback(selectedWeaknesses);
  
  return {
    brawlerUsed,
    gameMode,
    metrics: {
      accuracy,
      positioning,
      superUsage,
      mapControl
    },
    strengths: strengthsWithTimestamps,
    weaknesses: weaknessesWithTimestamps,
    timestamp: new Date().toISOString()
  };
}
