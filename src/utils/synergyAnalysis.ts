
import { Brawler } from "@/data/brawlers";

interface SynergyScore {
  score: number;
  comment: string;
  color: string;
}

export interface SynergyAnalysis {
  overall: SynergyScore;
  roleBalance: SynergyScore;
  rangeBalance: SynergyScore;
  damageOutput: SynergyScore;
  survivalPotential: SynergyScore;
  controlAbility: SynergyScore;
}

// Calculate how well the roles complement each other
const calculateRoleBalance = (brawlers: Brawler[]): SynergyScore => {
  const roles = brawlers.map(b => b.role);
  const uniqueRoles = new Set(roles);

  // Perfect role balance is having different, complementary roles
  if (uniqueRoles.size === brawlers.length) {
    const hasSupport = roles.includes("Support");
    const hasTank = roles.includes("Tank") || roles.includes("Hybrid");
    const hasDamage = roles.includes("Damage Dealer") || roles.includes("Marksman");

    if (hasSupport && hasTank && hasDamage) {
      return {
        score: 95,
        comment: "Perfect balance of tank, damage, and support",
        color: "text-green-500"
      };
    } else if ((hasSupport && hasTank) || (hasSupport && hasDamage) || (hasTank && hasDamage)) {
      return {
        score: 85,
        comment: "Good role diversity with complementary abilities",
        color: "text-green-400"
      };
    } else {
      return {
        score: 75,
        comment: "Diverse roles but missing key synergies",
        color: "text-lime-500"
      };
    }
  } else if (uniqueRoles.size === brawlers.length - 1) {
    return {
      score: 65,
      comment: "Decent role variety but some overlap",
      color: "text-yellow-500"
    };
  } else {
    return {
      score: 50,
      comment: "Too many overlapping roles may cause weaknesses",
      color: "text-orange-500"
    };
  }
};

// Calculate range balance (mix of short, medium, long range)
const calculateRangeBalance = (brawlers: Brawler[]): SynergyScore => {
  const ranges = brawlers.map(b => b.stats.range);
  const hasShort = ranges.includes("Short") || ranges.includes("Very Short");
  const hasMedium = ranges.includes("Medium");
  const hasLong = ranges.includes("Long") || ranges.includes("Very Long");
  
  const uniqueRanges = new Set(ranges);
  
  if (hasShort && hasMedium && hasLong) {
    return {
      score: 90,
      comment: "Excellent coverage of all ranges",
      color: "text-green-500"
    };
  } else if (uniqueRanges.size >= 2) {
    return {
      score: 75,
      comment: "Good range diversity but not optimal coverage",
      color: "text-lime-500"
    };
  } else {
    return {
      score: 55,
      comment: "Limited range diversity might be exploited",
      color: "text-orange-500"
    };
  }
};

// Calculate team's damage output potential
const calculateDamageOutput = (brawlers: Brawler[]): SynergyScore => {
  const totalDamage = brawlers.reduce((sum, b) => sum + b.stats.damage, 0);
  const avgDamage = totalDamage / brawlers.length;
  
  if (avgDamage > 1500) {
    return {
      score: 90,
      comment: "High damage potential to eliminate threats",
      color: "text-green-500"
    };
  } else if (avgDamage > 1200) {
    return {
      score: 75,
      comment: "Good damage output for most situations",
      color: "text-lime-500"
    };
  } else {
    return {
      score: 60,
      comment: "May struggle against tankier opponents",
      color: "text-yellow-500"
    };
  }
};

// Calculate team's survival potential
const calculateSurvivalPotential = (brawlers: Brawler[]): SynergyScore => {
  const totalHealth = brawlers.reduce((sum, b) => sum + b.stats.health, 0);
  const avgHealth = totalHealth / brawlers.length;
  const hasHealer = brawlers.some(b => b.role === "Support");
  const hasTank = brawlers.some(b => b.role === "Tank");
  
  if (avgHealth > 5500 && (hasHealer || hasTank)) {
    return {
      score: 90,
      comment: "Excellent sustainability with high health pool",
      color: "text-green-500"
    };
  } else if (avgHealth > 4500 || hasHealer || hasTank) {
    return {
      score: 75,
      comment: "Good survivability in most encounters",
      color: "text-lime-500"
    };
  } else {
    return {
      score: 60, 
      comment: "May be vulnerable to burst damage",
      color: "text-yellow-500"
    };
  }
};

// Calculate team's area control capabilities
const calculateControlAbility = (brawlers: Brawler[]): SynergyScore => {
  const controlRoles = ["Controller", "Thrower", "Support"];
  const controlCount = brawlers.filter(b => controlRoles.includes(b.role)).length;
  const hasAreaDamage = brawlers.some(b => 
    b.abilities.super.toLowerCase().includes("area") || 
    b.abilities.basic.toLowerCase().includes("area") ||
    b.role === "Thrower"
  );
  
  if (controlCount >= 1 && hasAreaDamage) {
    return {
      score: 90,
      comment: "Strong zone control and area denial",
      color: "text-green-500"
    };
  } else if (controlCount >= 1 || hasAreaDamage) {
    return {
      score: 70,
      comment: "Decent map control capabilities",
      color: "text-lime-500"
    };
  } else {
    return {
      score: 55,
      comment: "Limited area control, may struggle with objectives",
      color: "text-yellow-500"
    };
  }
};

// Calculate overall synergy
const calculateOverallSynergy = (
  roleBalance: SynergyScore,
  rangeBalance: SynergyScore,
  damageOutput: SynergyScore,
  survivalPotential: SynergyScore,
  controlAbility: SynergyScore
): SynergyScore => {
  const scores = [
    roleBalance.score,
    rangeBalance.score,
    damageOutput.score,
    survivalPotential.score,
    controlAbility.score
  ];
  
  const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  if (avgScore >= 85) {
    return {
      score: Math.round(avgScore),
      comment: "Exceptional team synergy",
      color: "text-green-500"
    };
  } else if (avgScore >= 75) {
    return {
      score: Math.round(avgScore),
      comment: "Strong team with good synergy",
      color: "text-green-400"
    };
  } else if (avgScore >= 65) {
    return {
      score: Math.round(avgScore),
      comment: "Decent synergy with room for improvement",
      color: "text-lime-500"
    };
  } else {
    return {
      score: Math.round(avgScore),
      comment: "Consider adjusting team composition",
      color: "text-orange-500"
    };
  }
};

export const analyzeSynergy = (brawlers: Brawler[]): SynergyAnalysis | null => {
  if (brawlers.length < 2) return null;
  
  const roleBalance = calculateRoleBalance(brawlers);
  const rangeBalance = calculateRangeBalance(brawlers);
  const damageOutput = calculateDamageOutput(brawlers);
  const survivalPotential = calculateSurvivalPotential(brawlers);
  const controlAbility = calculateControlAbility(brawlers);
  
  const overall = calculateOverallSynergy(
    roleBalance,
    rangeBalance,
    damageOutput,
    survivalPotential,
    controlAbility
  );
  
  return {
    overall,
    roleBalance,
    rangeBalance,
    damageOutput,
    survivalPotential,
    controlAbility
  };
};
