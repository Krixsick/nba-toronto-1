# main.py
from fastapi import APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
#Toronto Team
from nba_api.stats.static import teams 
#Toronto Players
from nba_api.stats.endpoints import commonteamroster
from nba_api.stats.endpoints import leaguedashplayerstats
#not used or idk
from nba_api.stats.endpoints import playercareerstats


router = APIRouter(
    prefix="/tor",  # All routes will be prefixed with /tor
    tags=["Toronto Raptors"]  # For OpenAPI documentation grouping
)

""" Gets id of toronto"""
def get_raptors_id():
    try:
        matches = teams.find_teams_by_full_name("Toronto Raptors")
        return matches[0]["id"]
    except Exception as e:
        raise HTTPException(500, f"Error getting Raptors ID: {str(e)}")
    
def season_str(start_year: int) -> str:
    # nba_api expects "YYYY-YY" (e.g., 2024 -> "2024-25")
    return f"{start_year}-{str((start_year + 1) % 100).zfill(2)}"

@router.get("/team")
def display_toronto_team(): 
    try:
        matches = teams.find_teams_by_full_name("Toronto Raptors")
    except Exception as e:
        raise HTTPException(500, f"Error displaying toronto teams: {str(e)}")
    return matches

@router.get("/test")
def test():
    return get_raptors_id()

""" Displays genera information about each player from the toronto raptors"""
@router.get("/players")
def display_toronto_players(): 
    try:
        matches = commonteamroster.CommonTeamRoster(team_id=get_raptors_id(), season=season_str(2024))
        data = matches.get_normalized_dict()
        players = data["CommonTeamRoster"]   # list[dict]
        coaches = data["Coaches"] 
    except Exception as e:
        raise HTTPException(f"displaying toronto players not working: {str(e)}")
    # return matches
    return {"players": players, "coaches": coaches}

""" Gets toronto raptor players stats in the regular season"""
@router.get("/players/regstats")
def display_toronto_player_regseason_stats():
    try:
        fetch_raptors_regular_season_stats = leaguedashplayerstats.LeagueDashPlayerStats(
            season=season_str(2024),
            season_type_all_star="Regular Season",
            team_id_nullable=get_raptors_id(),
            per_mode_detailed="PerGame",
        )
        raptors_regular_season_stats = fetch_raptors_regular_season_stats.get_normalized_dict()["LeagueDashPlayerStats"]
    except Exception as e:
        raise HTTPException(f"displaying toronto players' stats not working: {str(e)}")
    return raptors_regular_season_stats