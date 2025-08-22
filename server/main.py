# main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from nba_api.stats.static import teams as teams_static
from nba_api.stats.endpoints import commonteamroster

app = FastAPI(title="Raptors API", description="NBA team roster API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def season_str(start_year: int) -> str:
    """Convert 2024 -> '2024-25' for nba_api."""
    return f"{start_year}-{str((start_year + 1) % 100).zfill(2)}"

def get_team_by_abbr(abbr: str):
    """Find team dict by abbreviation (e.g., 'TOR')."""
    teams = teams_static.get_teams()  # list[dict]
    return next((t for t in teams if t["abbreviation"].upper() == abbr.upper()), None)

@app.get("/")
def root():
    """Root endpoint - shows API is working"""
    return {
        "message": "Raptors API is running!",
        "endpoints": {
            "team_roster": "/api/teams/{abbr}/roster?season=2024",
            "example": "/api/teams/TOR/roster?season=2024",
            "docs": "/docs"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.get("/api/teams/{abbr}/roster")
def team_roster(
    abbr: str,
    season: int = Query(2024, ge=1996, description="Starting year, e.g., 2024 for 2024-25"),
):
    """Get team roster for a specific season"""
    team = get_team_by_abbr(abbr)
    if not team:
        raise HTTPException(404, f"Team '{abbr}' not found")

    try:
        df = commonteamroster.CommonTeamRoster(
            team_id=team["id"], season=season_str(season)
        ).get_data_frames()[0]
    except Exception as e:
        # nba_api can error if the season isn't available yet or network headers change
        raise HTTPException(502, f"nba_api error: {e}")

    # Typical columns: PLAYER_ID, PLAYER, NUM, POSITION, HEIGHT, WEIGHT, BIRTH_DATE, EXP, SCHOOL
    players = [
        {
            "id": int(row["PLAYER_ID"]),
            "name": row["PLAYER"],
            "jersey": row.get("NUM"),
            "position": row.get("POSITION"),
            "height": row.get("HEIGHT"),
            "weight": row.get("WEIGHT"),
            "birthDate": row.get("BIRTH_DATE"),
            "experience": row.get("EXP"),
            "school": row.get("SCHOOL"),
        }
        for _, row in df.iterrows()
    ]
    
    return {
        "team": {
            "id": team["id"], 
            "name": team["full_name"], 
            "abbreviation": team["abbreviation"]
        },
        "season": season_str(season),
        "playerCount": len(players),
        "players": players,
    }

# Optional: Add endpoint to list all teams
@app.get("/api/teams")
def list_teams():
    """Get all NBA teams"""
    teams = teams_static.get_teams()
    return {
        "count": len(teams),
        "teams": [
            {
                "id": team["id"],
                "name": team["full_name"],
                "abbreviation": team["abbreviation"],
                "city": team["city"]
            }
            for team in teams
        ]
    }