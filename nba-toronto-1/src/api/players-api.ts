// import axios from "axios";
// import { type Team } from "../types/team";
// import { type PlayersResponse } from "../types/players";
// const raptor_players_api = axios.create({
//   baseURL: "https://v2.nba.api-sports.io",
//   headers: { "x-apisports-key": import.meta.env. as string },
// });

// export async function getAllRaptors(season: number) {
//   const teamsRes = await raptor_players_api.get("/teams", {
//     params: { search: "Toronto" },
//   });
//   const raptors: Team | undefined =
//     teamsRes.data?.response?.find((t: Team) => t.code === "TOR") ??
//     teamsRes.data?.response?.find((t: Team) => /raptors/i.test(t.name));

//   const allPlayers: any[] = [];
//   let page = 1;
//   while (true) {
//     const { data } = await raptor_players_api.get("/players", {
//       params: { team: raptors?.id, season, page },
//     });
//     allPlayers.push(...data.response);
//     const totalPages = data.paging?.total ?? 1;
//     if (page >= totalPages) break;
//     page += 1;
//   }

//   return { results: allPlayers.length, response: allPlayers };
// }
