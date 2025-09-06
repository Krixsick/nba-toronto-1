import { createFileRoute } from "@tanstack/react-router";
import { Table } from "../components/standings/table";
import { useEffect, useState, useMemo } from "react";
import { getStandings } from "../queries/players";
import { type LeagueStandingsV3Row } from "../types/standings";
export const Route = createFileRoute("/standings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [conference, setConference] = useState<"East" | "West">("East");

  const standingsQC = getStandings();
  const eastStandings = useMemo(() => {
    const rows = standingsQC.data ?? []; // <-- safe fallback
    return rows
      .filter((team) => team.Conference === "East")
      .sort((a, b) => (a.PlayoffRank ?? 99) - (b.PlayoffRank ?? 99));
  }, [standingsQC.data]);
  const westStandings = useMemo(() => {
    const rows = standingsQC.data ?? []; // <-- safe fallback
    return rows
      .filter((team) => team.Conference === "West")
      .sort((a, b) => (a.PlayoffRank ?? 99) - (b.PlayoffRank ?? 99));
  }, [standingsQC.data]);

  if (standingsQC.isLoading) {
    return <div>Loading players...</div>;
  }
  if (standingsQC.error) {
    return <div>error</div>;
  }

  return (
    <div className="w-full min-h-dvh">
      <div className="h-[10%] w-full flex justify-between items-center px-8 pt-2">
        <p className="text-[2rem] inter-med">{conference} Standings</p>
        <input
          type="checkbox"
          className="toggle"
          checked={conference === "East"}
          onChange={(e) => {
            setConference(e.target.checked ? "East" : "West");
          }}
        />
      </div>
      <div className="w-full h-[90%] p-4">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Team</th>
                <th>W</th>
                <th>L</th>
                <th>Win %</th>
                <th>Conf</th>
                <th>Home</th>
                <th>Away</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {conference === "East"
                ? eastStandings.map((team: LeagueStandingsV3Row) => (
                    <Table
                      key={team.TeamID}
                      position={team.PlayoffRank}
                      win={team.WINS}
                      loss={team.LOSSES}
                      win_percent={team.WinPCT}
                      conf={team.ConferenceRecord}
                      home={team.HOME}
                      away={team.ROAD}
                      team_name={`${team.TeamCity} ${team.TeamName}`}
                      image={`https://cdn.nba.com/logos/nba/${team.TeamID}/global/L/logo.svg`}
                      playoff_seeding={team.PlayoffSeeding}
                    ></Table>
                  ))
                : westStandings.map((team: LeagueStandingsV3Row) => (
                    <Table
                      key={team.TeamID}
                      position={team.PlayoffRank}
                      win={team.WINS}
                      loss={team.LOSSES}
                      win_percent={team.WinPCT}
                      conf={team.ConferenceRecord}
                      home={team.HOME}
                      away={team.ROAD}
                      team_name={`${team.TeamCity} ${team.TeamName}`}
                      image={`https://cdn.nba.com/logos/nba/${team.TeamID}/global/L/logo.svg`}
                      playoff_seeding={team.PlayoffSeeding}
                    ></Table>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
