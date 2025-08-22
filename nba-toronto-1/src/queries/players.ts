import { useQuery } from "@tanstack/react-query";

export function getPlayers(season: number = 2024) {
  return useQuery({
    queryKey: ["raptors", "players", season],
    queryFn: () => getAllRaptors(season),
    staleTime: 1000 * 60 * 5, // data stays fresh for 5 min
    refetchOnWindowFocus: false, // don’t refetch on tab focus
    refetchOnMount: false, // don’t refetch on remount when fresh
    refetchOnReconnect: false, // don’t refetch on reconnect
    retry: 1, // only retry once on failure
  });
}
