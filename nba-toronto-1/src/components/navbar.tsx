import torontoLogo from "../assets/Toronto_Rap_Logo.svg";
import { Link } from "@tanstack/react-router";
export function Navbar() {
  return (
    <>
      <div className="w-full h-[8vh] bg-red-100 flex justify-between">
        <div className="w-[15%] h-full bg-blue-100">
          <img
            className="w-[60px] h-[60px]"
            src={torontoLogo}
            alt="toronto logo"
          />
        </div>
        <div className="w-[50%] h-full bg-green-100 flex">
          <Link to="/players">Players</Link>
          <p>Team</p>
          <p>Standings</p>
          <p>Prediction</p>
        </div>
      </div>
    </>
  );
}
