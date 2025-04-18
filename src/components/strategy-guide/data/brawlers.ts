// Importiere alle Brawlers aus der zentralen Datenquelle
import { brawlers as allBrawlers } from "@/data/brawlers";

// Liste aller verfügbaren Brawler-Namen
export const brawlers = allBrawlers.map(brawler => brawler.name);

// Brawler abilities (bestehende Daten beibehalten)
export const abilities = {
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

// Brawler tips (bestehende Daten beibehalten)
export const tips = {
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

// Map tips for each brawler (bestehende Daten beibehalten)
export const mapTips = {
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

// Matchup data for each brawler (bestehende Daten beibehalten)
export const matchups = {
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

// Positioning tips for each brawler (bestehende Daten beibehalten)
export const positioningTips = {
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

// Funktionen zum dynamischen Erstellen von Platzhalter-Informationen für fehlende Brawler
export const getDefaultAbilities = (brawlerName: string) => {
  return [
    { name: "Basic Attack", type: "Basic", desc: "Grundangriff von " + brawlerName },
    { name: "Super", type: "Super", desc: "Spezialangriff von " + brawlerName },
    { name: "Gadget", type: "Gadget", desc: "Erstes Gadget von " + brawlerName },
    { name: "Star Power", type: "Star Power", desc: "Erstes Star Power von " + brawlerName }
  ];
};

export const getDefaultTips = (brawlerName: string) => {
  return [
    "Nutze die Stärken von " + brawlerName + " effektiv im Kampf",
    "Positioniere dich strategisch je nach Angriffsreichweite",
    "Kombiniere deine Fähigkeiten für maximalen Schaden",
    "Arbeite mit deinem Team zusammen"
  ];
};

export const getDefaultMatchups = () => {
  return {
    "strong": ["Gegner 1", "Gegner 2", "Gegner 3"],
    "weak": ["Gegner 4", "Gegner 5", "Gegner 6"]
  };
};

export const getDefaultPositioningTip = (brawlerName: string) => {
  return `Positioniere ${brawlerName} basierend auf seiner Reichweite und Rolle im Team optimal auf der Karte.`;
};

export const getDefaultMapTip = (brawlerName: string) => {
  return `${brawlerName} kann auf verschiedenen Karten effektiv eingesetzt werden. Achte auf offene Bereiche und Deckungsmöglichkeiten.`;
};
