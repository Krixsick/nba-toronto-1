import { type LeagueDashPlayerStats } from "../../types/players";
import { type PlayerRow } from "../../types/players";
import torontoLogo from "../../assets/Toronto_Rap_Logo.svg";

type PlayerInformationProps = {
  player: PlayerRow;
  playerStats?: LeagueDashPlayerStats | null;
};

type PlayerExtraStatProps = {
  extra_stat_title: string;
  extra_stat: React.ReactNode;
};

type PlayerStatProps = {
  stat_title: string;
  stat: React.ReactNode;
};

function PlayerStat({ stat_title, stat }: PlayerStatProps) {
  return (
    <>
      {/* Stats box*/}
      <div className="stats shadow w-full h-full">
        <div className="stat flex flex-col items-center justify-around">
          <div className="stat-title">
            <p className="text-[1.25rem] text-[var(--ref-primary-40)] inter-med text-[clamp(16px,2vw,1.5rem)]">
              {stat_title}
            </p>
          </div>
          <div className="stat-value">
            <p className="text-[1.25rem] inter-med text-[clamp(16px,2.5vw,2rem)]">
              {stat}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function PlayerExtraStat({
  extra_stat_title,
  extra_stat,
}: PlayerExtraStatProps) {
  return (
    <>
      {/* Extra Stat 1*/}
      <div className="stats shadow w-full h-full">
        <div className="stat ">
          <div className="stat-title">
            <p className="text-[1.25rem] text-[var(--ref-primary-40)] inter-med text-[clamp(16px,2vw,1.5rem)]">
              {extra_stat_title}
            </p>
          </div>
          <div className="stat-value">
            <p className="text-[1.25rem] inter-med text-[clamp(16px,2vw,1.5rem)]">
              {extra_stat}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function PlayerInformation({
  playerStats,
  player,
}: PlayerInformationProps) {
  return (
    <div className="modal-box w-[90%] max-w-[1000px] h-[70%]">
      {/* Top Area */}
      <div className="w-full h-[40%] flex">
        <div className="w-[70%] h-full rounded-xl border-[1px] border-white object-cover">
          <img
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.PLAYER_ID}.png`}
            className="max-w-full max-h-full"
          />
        </div>
        <div className="w-[5%] h-full"></div>
        <div className="w-[25%] h-full flex flex-col items-start justify-center">
          <div className="flex flex-col gap-[5%] w-full my-2">
            <p className="text-[2rem] inter-med">{player.PLAYER}</p>
            <div className="w-[90%] flex justify-between">
              <p className="text-[1.5rem] inter-med text-[var(--ref-primary-40)]">
                #{player.NUM}
              </p>
              <p className="text-[1.5rem] inter-med ">{player.SEASON}</p>
            </div>
          </div>
          {/* Rating */}
          <div className="rating">
            <div
              className="mask mask-star bg-[var(--ref-primary-40)]"
              aria-label="1 star"
            ></div>
            <div
              className="mask mask-star bg-[var(--ref-primary-40)]"
              aria-label="2 star"
            ></div>
            <div
              className="mask mask-star bg-[var(--ref-primary-40)]"
              aria-label="3 star"
              aria-current="true"
            ></div>
            <div className="mask mask-star" aria-label="4 star"></div>
            <div className="mask mask-star" aria-label="5 star"></div>
          </div>
          <div className="h-[35%] flex items-bottom justify-start">
            <img src={torontoLogo} className="mt-4 pt-4" />
          </div>
        </div>
      </div>
      {/* Bottom Stats Area*/}
      <div
        className="divider before:bg-white
             after:bg-white"
      ></div>
      {/* Main Stats PPG, RPG APG*/}
      <div className="w-full h-[55%] flex flex-col">
        <div className="w-full h-[25%] flex items-center justify-around border-1">
          {/* PPG */}
          <div className="w-[20%] h-full">
            <PlayerStat stat_title="PPG" stat={playerStats?.PTS}></PlayerStat>
          </div>
          {/* RPG */}
          <div className="w-[20%] h-full">
            {/* Stats box*/}
            <PlayerStat stat_title="RPG" stat={playerStats?.REB}></PlayerStat>
          </div>
          {/* APG */}
          <div className="w-[20%] h-full flex flex-col justify-center items-center">
            {/* Stats box*/}
            <PlayerStat stat_title="APG" stat={playerStats?.AST}></PlayerStat>
          </div>
        </div>
        {/* Divider*/}
        <div
          className="divider before:bg-white
                after:bg-white"
        ></div>
        {/* Other six stats*/}
        <div
          className="w-full h-[60%] grid justify-around border-1"
          style={{
            gridTemplateColumns: `repeat(3, 1fr)`,
            gridTemplateRows: `repeat(2, 1fr)`,
          }}
        >
          {/* Position*/}
          <div className="w-full h-full">
            {/* Extra Stat 1*/}
            <PlayerExtraStat
              extra_stat_title="Position"
              extra_stat={player?.POSITION}
            ></PlayerExtraStat>
          </div>
          {/* Position*/}
          <div className="w-full h-full">
            {/* Extra Stat 1*/}
            <PlayerExtraStat
              extra_stat_title="Height"
              extra_stat={player?.HEIGHT}
            ></PlayerExtraStat>
          </div>
          {/* Position*/}
          <div className="w-full h-full">
            <PlayerExtraStat
              extra_stat_title="Weight"
              extra_stat={player?.WEIGHT}
            ></PlayerExtraStat>
          </div>
          {/* Position*/}
          <div className="w-full h-full">
            <PlayerExtraStat
              extra_stat_title="Age"
              extra_stat={player?.AGE}
            ></PlayerExtraStat>
          </div>
          {/* Position*/}
          <div className="w-full h-full">
            <PlayerExtraStat
              extra_stat_title="Experience"
              extra_stat={player?.EXP === "R" ? "Rookie" : player?.EXP}
            ></PlayerExtraStat>
          </div>
          {/* Position*/}
          <div className="w-full h-full">
            <PlayerExtraStat
              extra_stat_title="School"
              extra_stat={player?.SCHOOL}
            ></PlayerExtraStat>
          </div>
        </div>
        {/* Divider */}
        <div className="divider before:bg-white after:bg-white"></div>
      </div>
    </div>
  );
}
