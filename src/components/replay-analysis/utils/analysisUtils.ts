
export function generateMockAnalysisResults(selectedFile: File | null) {
  // In a real app, this would come from the backend analysis
  const brawlerUsed = selectedFile?.name.includes('shelly') ? 'Shelly' : 
                     selectedFile?.name.includes('colt') ? 'Colt' : 'Poco';
  
  const gameMode = Math.random() > 0.5 ? 'Gem Grab' : 'Brawl Ball';
  const accuracy = Math.floor(60 + Math.random() * 30);
  const positioning = Math.floor(50 + Math.random() * 40);
  const superUsage = Math.floor(65 + Math.random() * 30);
  const mapControl = Math.floor(45 + Math.random() * 45);
  
  return {
    brawlerUsed,
    gameMode,
    metrics: {
      accuracy,
      positioning,
      superUsage,
      mapControl
    },
    strengths: [
      "Excellent use of cover during team fights",
      "Great super timing when pushing the enemy team",
      `Effective ${gameMode === 'Gem Grab' ? 'gem control' : 'ball control'} throughout mid-game`
    ],
    weaknesses: [
      "Over-aggression at 2:14 led to unnecessary death",
      "Super was wasted at 1:45 when no enemies were nearby",
      "Poor lane positioning during the final countdown"
    ],
    timestamp: new Date().toISOString()
  };
}
