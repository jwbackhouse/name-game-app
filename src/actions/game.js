// *** GAME ACTION CREATORS ***

import database from '../firebase/firebase';

// Update score
export const updateLocalScore = (teamAScore, teamBScore) => ({
  type:'UPDATE_SCORE',
  teamAScore,
  teamBScore
});

export const startUpdateScore = (team, score) => {
  return (dispatch, getState) => {
    const previousScore = team === 'A' ? getState().game.teamAScore : getState().game.teamBScore;
    const newScore = previousScore + score;
    const updateObj = { [`/${team}`]: newScore };
    
    return database.ref('game/scores').update( updateObj )
      .catch(err => console.log('Error updating score in Firebase:', err));
  };
};

// Log countdown timer start time in Firebase
export const setStartTime = () => {
  return () => {
    const now = Date.now();
    return database.ref('game/startTime').set(now)
      .catch(err => console.log('Error setting start time in Firebase:', err));
  };
};

// Log playing team
export const setPlayingTeam = (playingTeam) => ({
  type: 'SET_PLAYING_TEAM',
  playingTeam
});