
import React from "react";

interface PositioningMapProps {
  brawlerName: string;
}

export const PositioningMap: React.FC<PositioningMapProps> = ({ brawlerName }) => {
  // Default positions
  let playerPosition = { x: 50, y: 50 }; // center
  let teammatePositions = [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 25, y: 75 },
    { x: 75, y: 75 }
  ];
  let obstacles = [
    { x: 25, y: 50, width: 10, height: 25, rotation: 0 },
    { x: 75, y: 50, width: 10, height: 25, rotation: 0 },
    { x: 50, y: 25, width: 25, height: 10, rotation: 0 },
    { x: 50, y: 75, width: 25, height: 10, rotation: 0 }
  ];
  
  // Brawler-specific positions
  switch (brawlerName) {
    case "Shelly":
      // Bush camper position
      playerPosition = { x: 30, y: 70 };
      break;
    case "Colt":
      // Long-range position
      playerPosition = { x: 20, y: 50 };
      break;
    case "Brock":
      // Sniper position
      playerPosition = { x: 20, y: 20 };
      break;
    case "Bull":
      // Bush ambush position
      playerPosition = { x: 30, y: 50 };
      break;
    case "Jessie":
      // Middle position for bouncing shots
      playerPosition = { x: 50, y: 40 };
      break;
    case "Nita":
      // Mid-range position for bear placement
      playerPosition = { x: 40, y: 40 };
      break;
    case "Dynamike":
      // Safe throw position
      playerPosition = { x: 25, y: 25 };
      break;
    case "El Primo":
      // Aggressive front position
      playerPosition = { x: 60, y: 40 };
      break;
    case "Barley":
      // Area denial position
      playerPosition = { x: 35, y: 35 };
      break;
    case "Poco":
      // Support position
      playerPosition = { x: 40, y: 60 };
      break;
    case "Rosa":
      // Bush control position
      playerPosition = { x: 60, y: 60 };
      break;
    case "Rico":
      // Bounce position
      playerPosition = { x: 35, y: 50 };
      break;
    default:
      // Default center position
      playerPosition = { x: 50, y: 50 };
  }
  
  return (
    <div className="aspect-square max-w-md mx-auto relative border-2 border-muted rounded-lg overflow-hidden bg-secondary">
      <div className="grid grid-cols-3 grid-rows-3 h-full">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="border border-muted/50 flex items-center justify-center relative">
            {i === 4 && (
              <div className="w-12 h-12 rounded-full bg-brawl-yellow/70 animate-pulse absolute" style={{ left: "calc(50% - 24px)", top: "calc(50% - 24px)" }}></div>
            )}
          </div>
        ))}
        
        {/* Map features */}
        {obstacles.map((obstacle, i) => (
          <div 
            key={`obstacle-${i}`}
            className="absolute bg-gray-700/50 rounded"
            style={{
              left: `${obstacle.x - obstacle.width/2}%`,
              top: `${obstacle.y - obstacle.height/2}%`,
              width: `${obstacle.width}%`,
              height: `${obstacle.height}%`,
              transform: `rotate(${obstacle.rotation}deg)`
            }}
          ></div>
        ))}
        
        {/* Teammate positions */}
        {teammatePositions.map((pos, i) => (
          <div 
            key={`teammate-${i}`}
            className="absolute w-8 h-8 rounded-full bg-brawl-blue/50"
            style={{
              left: `${pos.x - 4}%`,
              top: `${pos.y - 4}%`,
            }}
          ></div>
        ))}
        
        {/* Player position */}
        <div 
          className="absolute"
          style={{
            left: `${playerPosition.x}%`,
            top: `${playerPosition.y}%`,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="w-10 h-10 rounded-full bg-brawl-purple animate-pulse"></div>
        </div>
        
        {/* Map features - bushes */}
        <div className="absolute left-[10%] top-[10%] w-[20%] h-[15%] rounded-md bg-green-700/30"></div>
        <div className="absolute right-[10%] top-[10%] w-[20%] h-[15%] rounded-md bg-green-700/30"></div>
        <div className="absolute left-[10%] bottom-[10%] w-[15%] h-[20%] rounded-md bg-green-700/30"></div>
        <div className="absolute right-[10%] bottom-[10%] w-[15%] h-[20%] rounded-md bg-green-700/30"></div>
      </div>
    </div>
  );
};
