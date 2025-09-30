import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { getPlayers } from "../queries/players";
import { getRaptorPlayerStats } from "../queries/players";
import type { PlayerRow, CoachRow } from "../types/players";
import type { LeagueDashPlayerStats } from "../types/players";
import { PlayerCard } from "../components/players/player-card";
import { PlayerInformation } from "../components/players/player-information";
import React from "react";
export const Route = createFileRoute("/players")({
  component: RouteComponent,
});

function RouteComponent() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const reSize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", reSize);
    return () => {
      window.removeEventListener("resize", reSize);
    };
  }, []);

  const column_count = width < 700 ? 1 : width < 1200 ? 2 : 3;

  //Query Calls
  const playersQC = getPlayers();
  const statsQC = getRaptorPlayerStats();

  const statsPlayerMap = useMemo(() => {
    const map = new Map<number, LeagueDashPlayerStats>();
    statsQC?.data?.stats.forEach((stat: LeagueDashPlayerStats) => {
      map.set(stat.PLAYER_ID, stat);
    });
    return map;
  }, [statsQC.data]);
  useEffect(() => {
    console.log(statsPlayerMap);
  }, [statsQC.data]);

  if (playersQC.isLoading || statsQC.isLoading)
    return <div>Loading players...</div>;
  if (playersQC.error || statsQC.error) {
    const msg =
      (playersQC.error as any)?.message ??
      (statsQC.error as any)?.message ??
      "Unknown error";
    return <div>Error: {msg}</div>;
  }

  return (
    <>
      <div className="w-full min-h-dvh">
        {/* Players Section*/}
        <div className="w-full flex justify-start items-center h-[10%] min-h-[35px] max-h-[55px] p-4">
          <p>
            Displaying {playersQC.data?.players.length} Toronto Players total
          </p>
        </div>
        {/* Player Cards */}
        <div
          className="grid w-full h-full p-4"
          style={{
            gridTemplateColumns: `repeat(${column_count}, 1fr)`,
          }}
        >
          {playersQC.data?.players.map((player: PlayerRow) => {
            const playerStats = statsPlayerMap.get(player.PLAYER_ID);
            return (
              <React.Fragment key={player.PLAYER_ID}>
                <div
                  onClick={() =>
                    document.getElementById(`${player.PLAYER_ID}`).showModal()
                  }
                  className="m-2 p-4 cursor-pointer rounded-xl
                    transition-[box-shadow,background] duration-300
                    hover:bg-[var(--ref-primary-5)]
                    hover:shadow-[0_0_0_1px_var(--ref-primary-10),_0_20px_40px_-20px_var(--ref-primary-10)/.45]
                    hover:[box-shadow:inset_0_0_18px_0_var(--ref-primary-10)/.25,0_0_0_1px_var(--ref-primary-10),_0_20px_40px_-20px_var(--ref-primary-10)/.45]"
                >
                  <PlayerCard player={player}></PlayerCard>
                </div>
                <dialog id={`${player.PLAYER_ID}`} className="modal">
                  {playerStats && (
                    <PlayerInformation
                      playerStats={playerStats}
                      player={player}
                    ></PlayerInformation>
                  )}
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
