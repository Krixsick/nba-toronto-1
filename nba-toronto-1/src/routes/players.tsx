import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getPlayers } from "../queries/players";
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

  const column_count = width > 300 ? 1 : width > 600 ? 2 : width > 1000 ? 3 : 4;

  //Query Calls
  const { data, isLoading, error } = getPlayers(2023);
  if (isLoading) return <div>Loading players...</div>;
  if (error) return <div>Error loading players: {error.message}</div>;

  return (
    <>
      <div className="players-container">
        <h1>Toronto Raptors Players ({data?.results ?? 0} total)</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${column_count}, 1fr)`,
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {data?.response.map((p: any) => (
            <div key={p.id} className="player-card">
              <h3>
                {p.firstname} {p.lastname}
              </h3>
              <p>
                Height: {p.height?.feets}'{p.height?.inches}"
              </p>
              <p>Weight: {p.weight?.pounds} lbs</p>
              <p>College: {p.college || "N/A"}</p>
              <p>Jersey: {p.leagues?.standard?.jersey ?? "—"}</p>
              <p>Pos: {p.leagues?.standard?.pos ?? "—"}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
