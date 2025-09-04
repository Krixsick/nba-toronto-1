import { getStandings } from "../../queries/players";

type TableProps = {
  position: number;
  win: number;
  loss: number;
  win_percent: number;
  conf: string;
  home: string;
  away: string;
  team_name: string;
  image: string;
};

export function Table({
  position,
  win,
  loss,
  win_percent,
  conf,
  home,
  away,
  team_name,
  image,
}: TableProps) {
  return (
    <>
      {/* Row 1*/}
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="divider divider-horizontal"></div>
            {position}
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{team_name}</div>
            </div>
          </div>
        </td>
        <td>{win}</td>
        <td>{loss}</td>
        <td>{win_percent}</td>
        <td>{conf}</td>
        <td>{home}</td>
        <td>{away}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </>
  );
}
