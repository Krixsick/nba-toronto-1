export type PlayersResponse = {
  results: number;
  response: Array<{
    id: number;
    firstname: string;
    lastname: string;
    birth?: { date?: string; country?: string };
    height?: { feets?: string; inches?: string; meters?: string };
    weight?: { pounds?: string; kilograms?: string };
    nba?: { start?: number; pro?: number };
    college?: string | null;
    leagues?: any; // depends on plan/endpoint details
  }>;
};
