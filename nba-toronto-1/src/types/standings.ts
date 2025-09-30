export type Conference = "East" | "West";
export type Division =
  | "Atlantic"
  | "Central"
  | "Southeast"
  | "Northwest"
  | "Pacific"
  | "Southwest";

export interface LeagueStandingsV3Row {
  LeagueID: string; // "00"
  SeasonID: string; // e.g. "22024"
  TeamID: number;
  TeamCity: string;
  TeamName: string;
  TeamSlug: string;
  Conference: Conference;
  ConferenceRecord: string; // "41-11"
  PlayoffRank: number | null;
  ClinchIndicator: string | null; // e.g. " - x", " - pi", " - o"
  Division: Division;
  DivisionRecord: string; // "12-4"
  DivisionRank: number;
  WINS: number;
  LOSSES: number;
  WinPCT: number;
  LeagueRank: number | null;
  Record: string; // "64-18"
  HOME: string; // "34-7"
  ROAD: string; // "30-11"
  L10: string; // "6-4"
  Last10Home: string;
  Last10Road: string;
  OT: string; // "1-1"
  ThreePTSOrLess: string; // "5-4"
  TenPTSOrMore: string; // "41-7"
  LongHomeStreak: number;
  strLongHomeStreak: string; // "W 10"
  LongRoadStreak: number;
  strLongRoadStreak: string;
  LongWinStreak: number;
  LongLossStreak: number;
  CurrentHomeStreak: number;
  strCurrentHomeStreak: string;
  CurrentRoadStreak: number;
  strCurrentRoadStreak: string;
  CurrentStreak: number;
  strCurrentStreak: string;
  ConferenceGamesBack: number | string;
  DivisionGamesBack: number | string;

  ClinchedConferenceTitle: 0 | 1;
  ClinchedDivisionTitle: 0 | 1;
  ClinchedPlayoffBirth: 0 | 1; // (spelled “Birth” in your sample)
  ClinchedPlayIn: 0 | 1;
  EliminatedConference: 0 | 1;
  EliminatedDivision: 0 | 1;

  AheadAtHalf: string;
  BehindAtHalf: string;
  TiedAtHalf: string;
  AheadAtThird: string;
  BehindAtThird: string;
  TiedAtThird: string;

  Score100PTS: string;
  OppScore100PTS: string;
  OppOver500: string;
  LeadInFGPCT: string;
  LeadInReb: string;
  FewerTurnovers: string;

  PointsPG: number;
  OppPointsPG: number;
  DiffPointsPG: number;

  vsEast: string;
  vsAtlantic: string;
  vsCentral: string;
  vsSoutheast: string;
  vsWest: string;
  vsNorthwest: string;
  vsPacific: string;
  vsSouthwest: string;

  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  May: string;
  Jun: string;
  Jul: string;
  Aug: string;
  Sep: string;
  Oct: string;
  Nov: string;
  Dec: string;

  Score_80_Plus: string;
  Opp_Score_80_Plus: string;
  Score_Below_80: string;
  Opp_Score_Below_80: string;

  TotalPoints: number;
  OppTotalPoints: number;
  DiffTotalPoints: number;
  LeagueGamesBack: number;

  PlayoffSeeding: number | null; // 1–8 after Play-In, else null
  NEUTRAL: string;
}
