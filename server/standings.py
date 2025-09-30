from fastapi import APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
from raptor_team import get_raptors_id, season_str

from nba_api.stats.endpoints import leaguestandingsv3

router = APIRouter(
    prefix="/standings"
)

@router.get("/")
def display_standings():
    try:
        response = leaguestandingsv3.LeagueStandingsV3(
            season=season_str(2024),
            season_type="Regular Season",
        )
        data = response.get_normalized_dict()["Standings"]
        # toronto_standings = [team for team in data if team.get("TeamID") == get_raptors_id()]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting Raptors ID: {str(e)}")
    return data