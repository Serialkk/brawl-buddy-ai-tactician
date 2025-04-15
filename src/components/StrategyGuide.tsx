import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsDown } from "lucide-react";
import { BookOpen, Map, Crosshair, BarChart, Timer, Zap, ThumbsUp, MoveHorizontal, MoveVertical, Target, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Create specific positioning maps for each brawler
const createPositioningMap = (brawlerName) => {
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

export function StrategyGuide() {
  const [selectedBrawler, setSelectedBrawler] = useState("Shelly");
  
  const brawlers = [
    "Shelly", "Colt", "Brock", "Bull", "Jessie", "Nita", 
    "Dynamike", "El Primo", "Barley", "Poco", "Rosa", "Rico"
  ];

  const abilities = {
    "Shelly": [
      { name: "Buckshot", type: "Basic", desc: "Fires a wide spread of shells that can hit multiple opponents" },
      { name: "Super Shell", type: "Super", desc: "Fires an enhanced spread that destroys obstacles and knocks enemies back" },
      { name: "Shell Shock", type: "Gadget", desc: "Slows down enemies hit by Super attack" },
      { name: "Band-Aid", type: "Star Power", desc: "Heals 2000 health when below 40%" }
    ],
    "Colt": [
      { name: "Six-Shooters", type: "Basic", desc: "Fires six consecutive shots in a straight line" },
      { name: "Bullet Storm", type: "Super", desc: "Fires a massive volley that can destroy obstacles" },
      { name: "Speedloader", type: "Gadget", desc: "Instantly reloads two ammo slots" },
      { name: "Slick Boots", type: "Star Power", desc: "Increases movement speed by 10%" }
    ],
    "Brock": [
      { name: "Rocket Launcher", type: "Basic", desc: "Fires a single, long-range rocket" },
      { name: "Rocket Rain", type: "Super", desc: "Launches a barrage of rockets over a wide area" },
      { name: "Rocket Laces", type: "Gadget", desc: "Brock leaps into the air, escaping enemies and obstacles" },
      { name: "Incendiary", type: "Star Power", desc: "Rockets leave a burning area on the ground" }
    ],
    "Bull": [
      { name: "Double-Barreled", type: "Basic", desc: "Fires two short-range blasts" },
      { name: "Bulldozer", type: "Super", desc: "Charges forward, knocking back enemies and destroying obstacles" },
      { name: "T-Bone Injector", type: "Gadget", desc: "Instantly heals 1000 health" },
      { name: "Berserker", type: "Star Power", desc: "Reloads faster when below 40% health" }
    ],
    "Jessie": [
      { name: "Shock Rifle", type: "Basic", desc: "Fires a long-range shot that bounces between enemies" },
      { name: "Turret", type: "Super", desc: "Deploys a stationary turret that attacks nearby enemies" },
      { name: "Spark Plug", type: "Gadget", desc: "Jessie's turret shoots out a shock wave, slowing down enemies" },
      { name: "Energize", type: "Star Power", desc: "Jessie heals her turret by attacking it" }
    ],
    "Nita": [
      { name: "Rupturing Shot", type: "Basic", desc: "Fires a shockwave that damages enemies in a line" },
      { name: "Summon Bruce", type: "Super", desc: "Summons a bear to attack enemies" },
      { name: "Fake Giftbox", type: "Gadget", desc: "Nita deploys a fake giftbox that explodes when enemies get close" },
      { name: "Hyper Bear", type: "Star Power", desc: "Nita's bear attacks faster" }
    ],
    "Dynamike": [
      { name: "Double Dynamite", type: "Basic", desc: "Throws two sticks of dynamite" },
      { name: "Dyna-Jump", type: "Super", desc: "Leaps into the air, throwing a large dynamite that destroys obstacles" },
      { name: "Fidget Spinner", type: "Gadget", desc: "Dynamike spins around, throwing multiple sticks of dynamite" },
      { name: "Demolition", type: "Star Power", desc: "Increases damage of main attack and Super" }
    ],
    "El Primo": [
      { name: "Fists of Fury", type: "Basic", desc: "Punches enemies with a flurry of blows" },
      { name: "Flying Elbow Drop", type: "Super", desc: "Leaps into the air, crashing down on enemies" },
      { name: "Suplex Supplement", type: "Gadget", desc: "Grabs the closest enemy and suplexes them" },
      { name: "El Fuego", type: "Star Power", desc: "Enemies caught in El Primo's Super are set on fire" }
    ],
    "Barley": [
      { name: "Undiluted Barleyjuice", type: "Basic", desc: "Throws a bottle that leaves a puddle of damaging liquid" },
      { name: "Last Call", type: "Super", desc: "Throws a barrage of bottles over a wide area" },
      { name: "Sticky Syrup Mixer", type: "Gadget", desc: "Creates a sticky puddle that slows enemies" },
      { name: "Medical Use", type: "Star Power", desc: "Heals himself with each attack" }
    ],
    "Poco": [
      { name: "Power Chord", type: "Basic", desc: "Shoots a wave of sound that damages enemies and heals allies" },
      { name: "Encore", type: "Super", desc: "Heals himself and all allies within a large radius" },
      { name: "Tuning Fork", type: "Gadget", desc: "Poco instantly heals himself" },
      { name: "Da Capo!", type: "Star Power", desc: "Poco's main attack also heals allies" }
    ],
    "Rosa": [
      { name: "Triple Threat", type: "Basic", desc: "Unleashes a flurry of punches" },
      { name: "Strong Stuff", type: "Super", desc: "Creates a shield that reduces damage taken" },
      { name: "Unfriendly Bushes", type: "Gadget", desc: "Rosa plants a patch of bushes" },
      { name: "Plant Life", type: "Star Power", desc: "Rosa heals herself when inside bushes" }
    ],
    "Rico": [
      { name: "Bouncy Bullets", type: "Basic", desc: "Fires bullets that bounce off walls" },
      { name: "Ricochet", type: "Super", desc: "Fires a volley of bouncing bullets that travel further" },
      { name: "Multiball Launcher", type: "Gadget", desc: "Rico fires a volley of bouncing bullets in all directions" },
      { name: "Super Bouncy", type: "Star Power", desc: "Increases the range of Rico's bouncing bullets" }
    ]
  };
  
  const tips = {
    "Shelly": [
      "Save your Super for high-value targets or to break important walls",
      "Use bushes to ambush enemies with your high close-range damage",
      "Against tanks, maintain medium distance to chip away their health",
      "Chain your Supers by hitting multiple enemies to instantly recharge",
      "Use your Super to interrupt enemy Supers or key abilities"
    ],
    "Colt": [
      "Pre-aim where enemies are likely to move for better accuracy",
      "Use your Super to create pathways through walls for your team",
      "Maintain distance from close-range brawlers who counter you",
      "Practice strafing while shooting to improve your hit rate",
      "Save your gadget for emergency reloads during critical fights"
    ],
    "Brock": [
      "Use your gadget to escape from close-range brawlers",
      "Time your Super to hit enemies grouped together",
      "Use bushes to hide and surprise enemies with your long-range attacks",
      "Control the map by destroying walls with your Super",
      "Use your Star Power to deny areas and control enemy movement"
    ],
    "Bull": [
      "Use your Super to charge through walls and surprise enemies",
      "Time your gadget to heal during critical moments",
      "Use bushes to ambush enemies with your high close-range damage",
      "Control the map by pushing enemies away with your Super",
      "Use your Star Power to reload faster when low on health"
    ],
    "Jessie": [
      "Place your turret in strategic locations to control the map",
      "Use your main attack to bounce shots between enemies",
      "Time your gadget to slow down enemies and secure kills",
      "Use your Star Power to heal your turret and keep it alive",
      "Control the map by denying areas with your turret"
    ],
    "Nita": [
      "Use your bear to control the map and push enemies away",
      "Time your gadget to surprise enemies with a fake giftbox",
      "Use your main attack to damage enemies in a line",
      "Control the map by denying areas with your bear",
      "Use your Star Power to make your bear attack faster"
    ],
    "Dynamike": [
      "Use your Super to destroy walls and create new pathways",
      "Time your gadget to spin around and throw multiple sticks of dynamite",
      "Use your main attack to damage enemies behind walls",
      "Control the map by denying areas with your dynamite",
      "Use your Star Power to increase damage of main attack and Super"
    ],
    "El Primo": [
      "Use your Super to jump over walls and surprise enemies",
      "Time your gadget to suplex enemies and disrupt their attacks",
      "Use your main attack to punch enemies with a flurry of blows",
      "Control the map by pushing enemies away with your Super",
      "Use your Star Power to set enemies on fire with your Super"
    ],
    "Barley": [
      "Use your Super to control the map and deny areas",
      "Time your gadget to slow down enemies and secure kills",
      "Use your main attack to damage enemies behind walls",
      "Control the map by denying areas with your puddles",
      "Use your Star Power to heal yourself with each attack"
    ],
    "Poco": [
      "Use your Super to heal yourself and your teammates",
      "Time your gadget to heal yourself instantly",
      "Use your main attack to damage enemies and heal allies",
      "Control the map by healing your teammates and keeping them alive",
      "Use your Star Power to heal allies with your main attack"
    ],
    "Rosa": [
      "Use your Super to reduce damage taken and survive longer",
      "Time your gadget to plant bushes and create cover",
      "Use your main attack to unleash a flurry of punches",
      "Control the map by creating bushes and denying areas",
      "Use your Star Power to heal yourself when inside bushes"
    ],
    "Rico": [
      "Use your Super to bounce bullets off walls and hit enemies",
      "Time your gadget to fire bullets in all directions",
      "Use your main attack to bounce bullets off walls and hit enemies",
      "Control the map by bouncing bullets off walls",
      "Use your Star Power to increase the range of your bouncing bullets"
    ]
  };
  
  const mapTips = {
    "Shelly": "Excel in maps with lots of bushes and walls. Use cover to get close to enemies.",
    "Colt": "Perform best in open maps with long sight lines where you can utilize your range.",
    "Brock": "Thrives in open maps where he can utilize his long range. Control key areas by destroying walls with his Super.",
    "Bull": "Dominates in close-quarters maps with plenty of bushes. Use your charge to surprise enemies.",
    "Jessie": "Effective in maps with central control points. Place your turret to defend and control the area.",
    "Nita": "Strong in maps where her bear can control zones. Use bushes to hide and surprise enemies.",
    "Dynamike": "Excels in maps with walls to throw over. Use your Super to break walls and create new pathways.",
    "El Primo": "Best in close-range maps where he can quickly engage enemies. Use bushes to ambush opponents.",
    "Barley": "Effective in maps with chokepoints. Control areas by throwing bottles over walls.",
    "Poco": "Shines in team-based maps where he can heal allies. Stay behind teammates and provide support.",
    "Rosa": "Strong in maps with bushes. Use your shield to engage and protect teammates.",
    "Rico": "Performs well in maps with walls to bounce shots. Control areas by bouncing bullets around corners."
  };

  const matchups = {
    "Shelly": {
      "strong": ["Bull", "El Primo", "Rosa"],
      "weak": ["Brock", "Colt", "Rico"]
    },
    "Colt": {
      "strong": ["Jessie", "Poco", "Barley"],
      "weak": ["Bull", "Shelly", "El Primo"]
    },
    "Brock": {
      "strong": ["Barley", "Dynamike", "Jessie"],
      "weak": ["Shelly", "Bull", "Rosa"]
    },
    "Bull": {
      "strong": ["Colt", "Brock", "Rico"],
      "weak": ["Shelly", "El Primo", "Rosa"]
    },
    "Jessie": {
      "strong": ["Shelly", "Bull", "El Primo"],
      "weak": ["Colt", "Brock", "Rico"]
    },
    "Nita": {
      "strong": ["Colt", "Brock", "Rico"],
      "weak": ["Shelly", "Bull", "El Primo"]
    },
    "Dynamike": {
      "strong": ["Shelly", "Bull", "El Primo"],
      "weak": ["Colt", "Brock", "Rico"]
    },
    "El Primo": {
      "strong": ["Colt", "Brock", "Rico"],
      "weak": ["Shelly", "Bull", "Rosa"]
    },
    "Barley": {
      "strong": ["Shelly", "Bull", "El Primo"],
      "weak": ["Colt", "Brock", "Rico"]
    },
    "Poco": {
      "strong": ["Shelly", "Bull", "El Primo"],
      "weak": ["Colt", "Brock", "Rico"]
    },
    "Rosa": {
      "strong": ["Colt", "Brock", "Rico"],
      "weak": ["Shelly", "Bull", "El Primo"]
    },
    "Rico": {
      "strong": ["Shelly", "Bull", "El Primo"],
      "weak": ["Colt", "Brock", "Rosa"]
    }
  };
  
  const positioningTips = {
    "Shelly": "Utilize bushes for ambushes and stay at medium range to maximize damage. Avoid long open areas where snipers will outrange you.",
    "Colt": "Stay at maximum range and use walls to your advantage. Position yourself where you can create long sight lines.",
    "Brock": "Use elevated positions and long sight lines. Stay behind teammates and avoid close combat.",
    "Bull": "Hide in bushes near high-traffic areas. Don't overextend in open areas where you'll get outranged.",
    "Jessie": "Position centrally to bounce shots between enemies. Place your turret behind walls for protection.",
    "Nita": "Stay at mid-range and use your bear to flush enemies from cover. Control chokepoints with your attacks.",
    "Dynamike": "Stay behind walls and control areas with area denial. Avoid close-combat situations at all costs.",
    "El Primo": "Use walls to close distance safely. Position yourself between enemies and your teammates as a tank.",
    "Barley": "Control chokepoints and stay behind cover. Use your area denial to force enemies into disadvantageous positions.",
    "Poco": "Position yourself behind tanks but in range to heal multiple teammates. Avoid being the frontline.",
    "Rosa": "Control bushes and use your shield to push enemies back. Be the frontline for your team.",
    "Rico": "Position at an angle where your shots can bounce. Utilize narrow corridors for maximum effectiveness."
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Strategy Guide
        </h1>
        <p className="text-muted-foreground">
          Master your favorite Brawlers with personalized tips and strategies.
        </p>
      </div>
      
      <Card className="brawl-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brawl-blue" /> Brawler Selection
          </CardTitle>
          <CardDescription>Choose a Brawler to see detailed strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center">
            {brawlers.map(brawler => (
              <Button
                key={brawler}
                variant={selectedBrawler === brawler ? "default" : "outline"}
                className={selectedBrawler === brawler ? "bg-brawl-purple hover:bg-brawl-purple/90" : ""}
                onClick={() => setSelectedBrawler(brawler)}
              >
                {brawler}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedBrawler && (
        <Tabs defaultValue="abilities" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="abilities" className="flex gap-2 items-center">
              <Zap className="h-4 w-4" /> Abilities
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex gap-2 items-center">
              <BookOpen className="h-4 w-4" /> Pro Tips
            </TabsTrigger>
            <TabsTrigger value="positioning" className="flex gap-2 items-center">
              <Map className="h-4 w-4" /> Positioning
            </TabsTrigger>
            <TabsTrigger value="matchups" className="flex gap-2 items-center">
              <Crosshair className="h-4 w-4" /> Matchups
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="abilities">
            <Card className="brawl-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-brawl-yellow" /> {selectedBrawler}'s Abilities
                </CardTitle>
                <CardDescription>Master these abilities to dominate the arena</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {(abilities[selectedBrawler as keyof typeof abilities] || []).map((ability, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
                          <span className="text-2xl font-bold">{ability.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{ability.name}</h3>
                          <Badge className={`
                            ${ability.type === "Basic" ? "bg-brawl-blue" : 
                              ability.type === "Super" ? "bg-brawl-yellow" : 
                              ability.type === "Gadget" ? "bg-brawl-purple" : "bg-brawl-red"}
                          `}>
                            {ability.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{ability.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips">
            <Card className="brawl-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-brawl-blue" /> Pro Tips for {selectedBrawler}
                </CardTitle>
                <CardDescription>Expert advice to improve your gameplay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(tips[selectedBrawler as keyof typeof tips] || []).map((tip, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-4 border border-border rounded-lg bg-secondary">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brawl-blue/20 flex items-center justify-center">
                        <span className="font-bold">{idx + 1}</span>
                      </div>
                      <p>{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="positioning">
            <Card className="brawl-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-brawl-green" /> Positioning Guide
                </CardTitle>
                <CardDescription>Optimal positioning for {selectedBrawler}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  {createPositioningMap(selectedBrawler)}
                  <div className="text-center mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Recommended position for {selectedBrawler} (purple) with teammates (blue) and control points (yellow)
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-brawl-purple"></div>
                        <span>You</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-brawl-blue/50"></div>
                        <span>Teammates</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-brawl-yellow/70"></div>
                        <span>Objective</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-700/30"></div>
                        <span>Bushes</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg bg-secondary">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Map className="h-4 w-4 text-brawl-yellow" /> Positioning Strategy
                    </h3>
                    <p>{positioningTips[selectedBrawler as keyof typeof positioningTips] || "No specific positioning tips available for this Brawler."}</p>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg bg-secondary">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-brawl-red" /> Range Considerations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                      <div className="flex flex-col items-center gap-1 p-2 border border-border rounded bg-background">
                        <MoveHorizontal className="h-5 w-5 text-brawl-blue" />
                        <span className="font-medium text-sm">Short Range</span>
                        {(["Bull", "El Primo", "Rosa", "Shelly"].includes(selectedBrawler)) && 
                          <Badge className="bg-green-600">Optimal</Badge>}
                      </div>
                      <div className="flex flex-col items-center gap-1 p-2 border border-border rounded bg-background">
                        <MoveVertical className="h-5 w-5 text-brawl-purple" />
                        <span className="font-medium text-sm">Mid Range</span>
                        {(["Nita", "Poco", "Jessie"].includes(selectedBrawler)) && 
                          <Badge className="bg-green-600">Optimal</Badge>}
                      </div>
                      <div className="flex flex-col items-center gap-1 p-2 border border-border rounded bg-background">
                        <Target className="h-5 w-5 text-brawl-red" />
                        <span className="font-medium text-sm">Long Range</span>
                        {(["Colt", "Brock", "Rico", "Barley", "Dynamike"].includes(selectedBrawler)) && 
                          <Badge className="bg-green-600">Optimal</Badge>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg bg-secondary">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-brawl-green" /> Map Preferences
                    </h3>
                    <p>{mapTips[selectedBrawler as keyof typeof mapTips] || "No specific map tips available for this Brawler."}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matchups">
            <Card className="brawl-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crosshair className="h-5 w-5 text-brawl-red" /> {selectedBrawler}'s Matchups
                </CardTitle>
                <CardDescription>Learn which opponents to engage and which to avoid</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-border rounded-lg bg-secondary">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-green-500">
                      <ThumbsUp className="h-4 w-4" /> Strong Against
                    </h3>
                    <div className="space-y-3">
                      {(matchups[selectedBrawler as keyof typeof matchups]?.strong || []).map((enemy, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <span className="font-bold text-sm">{enemy.charAt(0)}</span>
                            </div>
                            <span>{enemy}</span>
                          </div>
                          <Badge className="bg-green-600">Advantage</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg bg-secondary">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-red-500">
                      <ThumbsDown className="h-4 w-4" /> Weak Against
                    </h3>
                    <div className="space-y-3">
                      {(matchups[selectedBrawler as keyof typeof matchups]?.weak || []).map((enemy, idx) => (
                        <div key={idx} className="flex items
