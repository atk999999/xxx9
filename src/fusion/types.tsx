export interface BaseCharacter {
  id: string;
  name: string;
  era: string;
  state: string;
  fusionId?: string;
  wish?: string;
}

export interface DnaComponent {
  race: string;
  percentage: number;
  color: string;
}

export interface FusionResult {
  id: string;
  name: string;
  description: string;
  personality?: string;
  dna_analysis?: string;
  dna_components?: DnaComponent[];
  fusion_logic?: string;
  quote: string;
  powerLevel: number;
  level: number;
  rank: string;
  imageUrl: string;
  imageStatus?: "ready" | "failed";
  imageError?: string;
  imagePrompt?: string;
  visual_prompt?: string;
  baseCharacters: BaseCharacter[];
  userId: string;
  createdAt: any;
  zombie_compatibility?: number; // 0-100%
  zombie_multiplier?: number; // x10, x100, etc.
  power_comparison?: string;
  compatibility_score: number; // 0-100%
  compatibility_status: "Perfect" | "Stable" | "Unstable" | "Failed" | "Fatal";
}

export interface ComparisonResult {
  winner: string;
  winnerReason: string;
  powerAnalysis: string;
  battleScenario: string;
  powerRatio?: string;
  winProbability?: { char1: number; char2: number };
}

export interface PowerComparisonMeta {
  expectedWinner: string;
  winnerChar: 1 | 2 | 0;
  ratio: number;
  ratioText: string;
  prob1: number;
  prob2: number;
  tierDisparity: string;
  combatVerdict: string;
  energyType1: string;
  energyType2: string;
}
