// ===================================================================
// INTERFACES DE DADOS PARA O MÓDULO DE ANÁLISE (META GLOBAL)
// ===================================================================

/**
 * Estrutura genérica para a resposta paginada do Spring Boot.
 */
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

// -------------------------------------------------------------------
// --- ANÁLISE DE BRAWLERS ---
// -------------------------------------------------------------------

export interface BrawlerStats {
  brawlerName: string;
  matchesPlayed: number;
  winRate: number;
  pickRate: number;
  banRate?: number;
}

// -------------------------------------------------------------------
// --- ANÁLISE DE PLAYERS ---
// -------------------------------------------------------------------

export interface PlayerRanking {
  rank: number;
  playerName: string;
  playerTag: string;
  registeredTeam: string;
  matchesPlayed: number;
  winRate: number;
  victories: number;
}

export interface PlayerCard {
  playerName: string;
  playerTag: string;
  registeredTeam: string;
  overallStats: OverallPlayerStats;
  signatureBrawlers: BrawlerPerformance[];
  bestModes: ModePerformance[];
  bestMaps: MapPerformance[];
}

// -------------------------------------------------------------------
// --- ANÁLISE DE TIMES ---
// -------------------------------------------------------------------

export interface TeamRanking {
  rank: number;
  teamName: string;
  logoUrl: string;
  region: string;
  matchesPlayed: number;
  winRate: number;
  winLossRecord: string;
}

export interface TeamCard {
  teamStats: TeamRanking;
  top3Comparison: TeamComparison[];
  bestBrawlers: BrawlerPerformance[];
  bestModes: ModePerformance[];
}


// -------------------------------------------------------------------
// --- SUB-INTERFACES REUTILIZÁVEIS ---
// -------------------------------------------------------------------

export interface OverallPlayerStats {
  matchesPlayed: number;
  winRate: number;
}

export interface BrawlerPerformance {
  brawlerName: string;
  matchesPlayed: number;
  winRate: number;
}

export interface ModePerformance {
  mode: string;
  matchesPlayed: number;
  winRate: number;
}

export interface MapPerformance {
  map: string;
  matchesPlayed: number;
  winRate: number;
}

export interface TeamComparison {
  rank: number;
  teamName: string;
  winRate: number;
}
