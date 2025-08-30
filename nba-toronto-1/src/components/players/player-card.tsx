import type { PlayerRow, CoachRow } from "../../types/players";

type playerProps = { player: PlayerRow };
type coachProps = { coach: CoachRow };
export function PlayerCard({ player }: playerProps) {
  return (
    <>
      <img
        src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.PLAYER_ID}.png`}
        className="
        transition-[filter]
        [filter:drop-shadow(0_0_10px_color-mix(in_srgb,var(--ref-primary-5)_100%,transparent))]
           
        "
      />
      <div className="flex justify-between items-center mt-4 px-1">
        <p className="inter-med text-[clamp(16px,2.2vw,24px)]">
          {player.PLAYER}
        </p>
        <p className="inter-med text-[clamp(16px,2.2vw,24px)]">
          #{player.NUM || "--"}
        </p>
      </div>
    </>
  );
}

export function CoachCard({ coach }: coachProps) {
  return (
    <img
      src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${coach.COACH_ID}.png`}
    />
  );
}
