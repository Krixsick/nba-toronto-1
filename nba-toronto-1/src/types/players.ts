// A single player row from "CommonTeamRoster"
export interface PlayerRow {
  TeamID: number;
  SEASON: string; // e.g. "2024"
  LeagueID: string; // e.g. "00"
  PLAYER: string; // "Scottie Barnes"
  NICKNAME: string; // "Scottie"
  PLAYER_SLUG: string; // "scottie-barnes"
  NUM: string | null; // jersey # as string (can be null)
  POSITION: string | null; // "G", "F", "G-F", etc.
  HEIGHT: string | null; // "6-7"
  WEIGHT: string | null; // "237"
  BIRTH_DATE: string | null; // "AUG 01, 2001"
  AGE: number | null; // 23
  EXP: string; // "R", "1", "2", ...
  SCHOOL: string | null; // "Florida State"
  PLAYER_ID: number; // 1630567
  HOW_ACQUIRED: string | null;
}

// A single coach row from "Coaches"
export interface CoachRow {
  TEAM_ID: number;
  SEASON: string; // e.g. "2024"
  COACH_ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  COACH_NAME: string;
  IS_ASSISTANT: number; // 1=head, 2=assistant, 3=trainer (as seen)
  COACH_TYPE: string; // "Head Coach", "Assistant Coach", ...
  SORT_SEQUENCE: number | null;
  SUB_SORT_SEQUENCE: number | null;
}

// The full payload you showed
export interface RaptorsRosterResponse {
  players: PlayerRow[];
  coaches: CoachRow[];
}

export type LeagueDashPlayerStats = {
  PLAYER_ID: number;
  PLAYER_NAME: string;
  NICKNAME: string | null;
  TEAM_ID: number;
  TEAM_ABBREVIATION: string;

  AGE: number;
  GP: number;
  W: number;
  L: number;
  W_PCT: number;
  MIN: number;

  FGM: number;
  FGA: number;
  FG_PCT: number;
  FG3M: number;
  FG3A: number;
  FG3_PCT: number;
  FTM: number;
  FTA: number;
  FT_PCT: number;

  OREB: number;
  DREB: number;
  REB: number;
  AST: number;
  TOV: number;
  STL: number;
  BLK: number;
  BLKA: number;
  PF: number;
  PFD: number;
  PTS: number;
  PLUS_MINUS: number;

  NBA_FANTASY_PTS: number;
  DD2: number;
  TD3: number;
  WNBA_FANTASY_PTS: number;

  GP_RANK: number;
  W_RANK: number;
  L_RANK: number;
  W_PCT_RANK: number;
  MIN_RANK: number;
  FGM_RANK: number;
  FGA_RANK: number;
  FG_PCT_RANK: number;
  FG3M_RANK: number;
  FG3A_RANK: number;
  FG3_PCT_RANK: number;
  FTM_RANK: number;
  FTA_RANK: number;
  FT_PCT_RANK: number;
  OREB_RANK: number;
  DREB_RANK: number;
  REB_RANK: number;
  AST_RANK: number;
  TOV_RANK: number;
  STL_RANK: number;
  BLK_RANK: number;
  BLKA_RANK: number;
  PF_RANK: number;
  PFD_RANK: number;
  PTS_RANK: number;
  PLUS_MINUS_RANK: number;
  NBA_FANTASY_PTS_RANK: number;
  DD2_RANK: number;
  TD3_RANK: number;
  WNBA_FANTASY_PTS_RANK: number;
};
