# main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
#Toronto Team
from nba_api.stats.static import teams 
#Toronto Players
from nba_api.stats.endpoints import commonteamroster

#not used or idk
from nba_api.stats.endpoints import playercareerstats

app = FastAPI(title="NBA_API", description="NBA team roster API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_raptors_id():
    matches = teams.find_teams_by_full_name("Toronto Raptors")
    return matches[0]["id"]

def season_str(start_year: int) -> str:
    # nba_api expects "YYYY-YY" (e.g., 2024 -> "2024-25")
    return f"{start_year}-{str((start_year + 1) % 100).zfill(2)}"

@app.get("/")
def new():
    return {
        "hello!"
    }

@app.get("/tor")
def display_toronto_team(): 
    try:
        matches = teams.find_teams_by_full_name("Toronto Raptors")
    except Exception as e:
        print("app.get(tor) is not working " + e)
    return matches

@app.get("/test")
def test():
    return get_raptors_id()

@app.get("/tor/players")
def display_toronto_players(): 
    try:
        matches = commonteamroster.CommonTeamRoster(team_id=get_raptors_id(), season=season_str(2024))
        data = matches.get_normalized_dict()
        players = data["CommonTeamRoster"]   # list[dict]
        coaches = data["Coaches"] 
    except Exception as e:
        print("app.get(tor/players) is not working " + str(e))
    # return matches
    return {"players": players, "coaches": coaches}