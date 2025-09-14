#!/usr/bin/env python3


import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import warnings
warnings.filterwarnings('ignore')

class SimpleRaptorsPredictor:
    def __init__(self, csv_path="./archive/team_games_regular_season.csv"):
        self.csv_path = csv_path
        self.df = None
        self.model = None
        self.team_strengths = {}
        
    def load_data(self):
        """Load the CSV file and process it to understand the structure"""
        try:
            self.df = pd.read_csv(self.csv_path)
            # Process the data based on actual structure
            self.process_game_data()
            return True
            
        except FileNotFoundError:
            print(f"Could not find {self.csv_path}")
            return False
    
    def process_game_data(self):
        """Process the raw game data into a format we can use"""
        print("\n Processing game data")
        # Get column names from our csv file (season, game_id, gameDate, team1_city, team1_name, team2_city, team2_name)
        self.df.columns = ['season', 'game_id', 'gameDate', 'team1_city', 'team1_name', 'team2_city', 'team2_name']
        # Create team names by combining city and name
        self.df['team1_full'] = self.df['team1_city'] + ' ' + self.df['team1_name']
        self.df['team2_full'] = self.df['team2_city'] + ' ' + self.df['team2_name']
        # Convert old team names to modern equivalents
        self.df['team1_full'] = self.df['team1_full'].replace({
            'Ft. Wayne Zollner Pistons': 'Detroit Pistons',
            'Rochester Royals': 'Sacramento Kings',
            'Minneapolis Lakers': 'Los Angeles Lakers',
            'Philadelphia Warriors': 'Golden State Warriors',
            'Syracuse Nationals': 'Philadelphia 76ers',
            'Tri-Cities Blackhawks': 'Atlanta Hawks',
            'New York Knicks': 'New York Knicks',
            'Boston Celtics': 'Boston Celtics'
        })
        
        self.df['team2_full'] = self.df['team2_full'].replace({
            'Ft. Wayne Zollner Pistons': 'Detroit Pistons',
            'Rochester Royals': 'Sacramento Kings',
            'Minneapolis Lakers': 'Los Angeles Lakers',
            'Philadelphia Warriors': 'Golden State Warriors',
            'Syracuse Nationals': 'Philadelphia 76ers',
            'Tri-Cities Blackhawks': 'Atlanta Hawks',
            'New York Knicks': 'New York Knicks',
            'Boston Celtics': 'Boston Celtics'
        })
        # Since we don't have win/loss data, we'll simulate it based on team matchups
        # This is a limitation - ideally we'd have actual game results
        # No win/loss data found - using simulated results for demonstration
        self.simulate_game_outcomes()
        print("✅ Data processing complete")
    
    def simulate_game_outcomes(self):
        """Simulate game outcomes based on team matchups (since we don't have actual results)"""
        np.random.seed(42)  # For consistent results
        
        team_base_strength = {
            # Eastern Conference (roughly ordered by expected strength)
            "Boston Celtics": 0.75,
            "Milwaukee Bucks": 0.70,
            "Philadelphia 76ers": 0.68,
            "Miami Heat": 0.62,
            "Cleveland Cavaliers": 0.60,
            "New York Knicks": 0.58,
            "Brooklyn Nets": 0.55,
            "Indiana Pacers": 0.52,
            "Atlanta Hawks": 0.50,
            "Toronto Raptors": 0.48,  # Raptors - rebuilding/developing
            "Orlando Magic": 0.45,
            "Chicago Bulls": 0.42,
            "Washington Wizards": 0.38,
            "Charlotte Hornets": 0.35,
            "Detroit Pistons": 0.32,
            
            # Western Conference
            "Denver Nuggets": 0.72,
            "Phoenix Suns": 0.68,
            "Golden State Warriors": 0.65,
            "Los Angeles Lakers": 0.62,
            "Sacramento Kings": 0.58,
            "Los Angeles Clippers": 0.56,
            "Dallas Mavericks": 0.54,
            "Minnesota Timberwolves": 0.52,
            "Oklahoma City Thunder": 0.50,
            "Memphis Grizzlies": 0.48,
            "New Orleans Pelicans": 0.46,
            "Utah Jazz": 0.44,
            "Houston Rockets": 0.40,
            "Portland Trail Blazers": 0.38,
            "San Antonio Spurs": 0.35,
        }
        
        self.team_strengths = team_base_strength
        
        # Simulate outcomes for each game pair
        outcomes = []
        for index, row in self.df.iterrows():

            team1 = row['team1_full']
            team2 = row['team2_full']
            
            # Get team strengths
            t1_strength = self.team_strengths.get(team1, 0.5)
            t2_strength = self.team_strengths.get(team2, 0.5)
            
            # Home court advantage (assume team1 is home)
            t1_strength += 0.05
            
            # Calculate win probability for team1
            total_strength = t1_strength + t2_strength
            team1_win_prob = t1_strength / total_strength if total_strength > 0 else 0.5
            
            # Simulate outcome
            team1_wins = np.random.random() < team1_win_prob
            outcomes.append(1 if team1_wins else 0)
        
        self.df['team1_won'] = outcomes
        print(f"Simulated {len(outcomes)} game outcomes")
    
    def get_modern_teams(self):
        """Get list of modern NBA teams"""
        return [
            'Boston Celtics', 'Brooklyn Nets', 'New York Knicks', 'Philadelphia 76ers', 'Toronto Raptors',
            'Chicago Bulls', 'Cleveland Cavaliers', 'Detroit Pistons', 'Indiana Pacers', 'Milwaukee Bucks',
            'Atlanta Hawks', 'Charlotte Hornets', 'Miami Heat', 'Orlando Magic', 'Washington Wizards',
            'Denver Nuggets', 'Minnesota Timberwolves', 'Oklahoma City Thunder', 'Portland Trail Blazers',
            'Utah Jazz', 'Golden State Warriors', 'Los Angeles Clippers', 'Los Angeles Lakers',
            'Phoenix Suns', 'Sacramento Kings', 'Dallas Mavericks', 'Houston Rockets',
            'Memphis Grizzlies', 'New Orleans Pelicans', 'San Antonio Spurs'
        ]
    
    def train_simple_model(self):
        """Train a simple model using available data"""
        if self.df is None:
            if not self.load_data():
                return False
        
        print("\n Training simple prediction model...")
        
        # we'll use team strength differences to predict outcomes
        # Filter for more recent data if available
        recent_data = self.df[self.df['season'] >= '2010-11'].copy() if 'season' in self.df.columns else self.df.copy()
        
        if len(recent_data) == 0:
            recent_data = self.df.copy()
        
        print(f"Using {len(recent_data)} games for training")
        
        # Create features
        recent_data['team1_strength'] = recent_data['team1_full'].map(self.team_strengths).fillna(0.5)
        recent_data['team2_strength'] = recent_data['team2_full'].map(self.team_strengths).fillna(0.5)
        recent_data['strength_diff'] = recent_data['team1_strength'] - recent_data['team2_strength']
        
        # Convert date
        recent_data['gameDate'] = pd.to_datetime(recent_data['gameDate'])
        recent_data['month'] = recent_data['gameDate'].dt.month
        
        # Features and target
        features = ['team1_strength', 'team2_strength', 'strength_diff', 'month']
        X = recent_data[features].fillna(0.5)
        y = recent_data['team1_won']
        
        # Train model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model = RandomForestClassifier(n_estimators=50, random_state=42)
        self.model.fit(X_train, y_train)
        
        # Check accuracy
        accuracy = accuracy_score(y_test, self.model.predict(X_test))
        print(f"Model trained with accuracy: {accuracy:.3f}")
        return True
    
    def predict_raptors_season(self):
        """Predict Raptors season"""
        if not self.train_simple_model():
            return None
        
        print("\nTORONTO RAPTORS SEASON PREDICTION")
        print("-" * 35)
        
        # Ensure we have Raptors in our team strengths
        if 'Toronto Raptors' not in self.team_strengths:
            self.team_strengths['Toronto Raptors'] = 0.48  # Moderate strength
        
        raptors_strength = self.team_strengths['Toronto Raptors']
        print(f"📊 Raptors strength rating: {raptors_strength:.3f}")
        
        # Get modern NBA teams
        modern_teams = self.get_modern_teams()
        opponents = [team for team in modern_teams if team != 'Toronto Raptors']
        
        # Simulate 82-game season against modern teams
        season_results = []
        total_wins = 0
        
        # Eastern Conference opponents (more games)
        eastern_teams = [t for t in opponents if t in [
            'Boston Celtics', 'Brooklyn Nets', 'New York Knicks', 'Philadelphia 76ers',
            'Chicago Bulls', 'Cleveland Cavaliers', 'Detroit Pistons', 'Indiana Pacers', 'Milwaukee Bucks',
            'Atlanta Hawks', 'Charlotte Hornets', 'Miami Heat', 'Orlando Magic', 'Washington Wizards'
        ]]
        
        western_teams = [t for t in opponents if t not in eastern_teams]
        
        game_count = 0
        
        # Play Eastern teams (about 4 games each)
        for opponent in eastern_teams:
            for game_num in range(4):
                if game_count >= 82:
                    break
                
                opp_strength = self.team_strengths.get(opponent, 0.5)
                is_home = game_num < 2  # 2 home, 2 away
                
                # Home court advantage
                team_str = raptors_strength + (0.05 if is_home else 0)
                opp_str = opp_strength + (0 if is_home else 0.05)
                
                # Predict using model
                features = [[team_str, opp_str, team_str - opp_str, 11]]  # November
                win_prob = self.model.predict_proba(features)[0][1] if hasattr(self.model, 'predict_proba') else 0.5
                predicted_win = win_prob > 0.5
                
                if predicted_win:
                    total_wins += 1
                
                season_results.append({
                    'game': game_count + 1,
                    'opponent': opponent,
                    'venue': 'Home' if is_home else 'Away',
                    'win_prob': round(win_prob, 3),
                    'predicted_win': predicted_win
                })
                
                game_count += 1
        
        # Play Western teams (2 games each)
        for opponent in western_teams:
            for game_num in range(2):
                if game_count >= 82:
                    break
                
                opp_strength = self.team_strengths.get(opponent, 0.5)
                is_home = game_num == 0
                
                team_str = raptors_strength + (0.05 if is_home else 0)
                opp_str = opp_strength + (0 if is_home else 0.05)
                
                features = [[team_str, opp_str, team_str - opp_str, 12]]  # December
                win_prob = self.model.predict_proba(features)[0][1] if hasattr(self.model, 'predict_proba') else 0.5
                predicted_win = win_prob > 0.5
                
                if predicted_win:
                    total_wins += 1
                
                season_results.append({
                    'game': game_count + 1,
                    'opponent': opponent,
                    'venue': 'Home' if is_home else 'Away',
                    'win_prob': round(win_prob, 3),
                    'predicted_win': predicted_win
                })
                
                game_count += 1
        
        # Results
        total_games = len(season_results)
        total_losses = total_games - total_wins
        win_pct = total_wins / total_games if total_games > 0 else 0
        
        print(f"\n📊 PREDICTED RECORD: {total_wins}-{total_losses}")
        print(f"📈 WIN PERCENTAGE: {win_pct:.1%}")
        print(f"🎯 GAMES SIMULATED: {total_games}")
        
        # Playoff probability
        playoff_prob = self._estimate_playoff_probability(win_pct)
        print(f"🏀 PLAYOFF PROBABILITY: {playoff_prob}")
        
        # Show first 10 games
        print(f"\n🗓️  FIRST 10 GAMES:")
        for game in season_results[:10]:
            result = "✅ Win" if game['predicted_win'] else "❌ Loss"
            print(f"{game['game']:2d}. {game['venue']:<4} vs {game['opponent']:<25} {result} ({game['win_prob']:.1%})")
        
        return {
            'predicted_record': f"{total_wins}-{total_losses}",
            'win_percentage': round(win_pct, 3),
            'total_games': total_games,
            'team_strength': round(raptors_strength, 3),
            'detailed_games': season_results[:10]
        }
    
    def _estimate_playoff_probability(self, win_pct):
        """Estimate playoff probability based on win percentage"""
        if win_pct >= 0.600:
            return "High (>80%)"
        elif win_pct >= 0.550:
            return "Good (60-80%)"
        elif win_pct >= 0.500:
            return "Moderate (30-60%)"
        elif win_pct >= 0.450:
            return "Low (10-30%)"
        else:
            return "Very Low (<10%)"

# Jupyter notebook functions
def predict_raptors():
    """Main prediction function for Jupyter"""
    predictor = SimpleRaptorsPredictor()
    return predictor.predict_raptors_season()

def explore_data():
    """Explore the CSV data structure"""
    predictor = SimpleRaptorsPredictor()
    predictor.load_data()
    return predictor.df.head(10)

if __name__ == "__main__":
    predict_raptors()