import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type RaptorsRosterResponse } from "../types/players";
import { type LeagueDashPlayerStats } from "../types/players";

export const raptor_api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000, // 10 second timeout
});

//Api call to Raptor Players
async function fetchRaptorPlayers() {
  try {
    const { data } =
      await raptor_api.get<RaptorsRosterResponse>("/tor/players");
    return data;
  } catch (error) {
    throw error;
  }
}

async function fetchRaptorPlayerStats() {
  try {
    const { data } = await raptor_api.get<LeagueDashPlayerStats>(
      "/tor/players/regstats"
    );
    return data;
  } catch (error) {
    throw error;
  }
}

//Query to get Raptor players
export function getPlayers() {
  return useQuery({
    queryKey: ["raptors", "players", 2024],
    queryFn: fetchRaptorPlayers,
  });
}

export function getRaptorPlayerStats() {
  return useQuery({
    queryKey: ["raptors", "players", 2024, "stats"],
    queryFn: fetchRaptorPlayerStats,
  });
}
