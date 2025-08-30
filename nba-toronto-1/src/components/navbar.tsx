import torontoLogo from "../assets/Toronto_Rap_Logo.svg";
import { Link } from "@tanstack/react-router";
import "../../theme.css";
export function Navbar() {
  return (
    <>
      <div className="w-full h-[8vh] flex bg-[var(--ref-primary-5)] justify-between">
        <div className="w-[15%] h-full">
          <img
            className="w-[60px] h-[60px]"
            src={torontoLogo}
            alt="toronto logo"
          />
        </div>
        <div className="w-[50%] h-full flex">
          <Link to="/players">Players</Link>
          <p>Team</p>
          <p>Standings</p>
          <p>Prediction</p>
        </div>
      </div>
    </>
  );
}
