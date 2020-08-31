// *** GAME ACTION CREATORS ***

import database from '../firebase/firebase';
import { getPlayersBegin, getPlayersSuccess, getPlayersFailure  } from './players';
import { addName, getNamesBegin, getNamesSuccess, getNamesFailure  } from './names';
import { addUserDetails } from './auth';


// Populate Firebase with initial game state
export const initialiseGame = () => {
  return () => {
    database.ref('game').set({
      teamAScore: 0,
      teamBScore: 0,
      playingNow: {
        uid: '',
        username: '',
        team: ''
      },
      startTime: '',
      startTurn: false,
      endGame: false,
      numPasses: 3,
      numNames: 5,
      timerLength: 60000,
    });
  };
};


// Subscribe to live Firebase data
export const fetchData = () => {
  return (dispatch, getState) => {
    dispatch(getPlayersBegin());
    dispatch(getGameDataBegin());
    dispatch(getNamesBegin());

    database.ref('players').on('value', snapshot => {
      let playersArr = [];
      snapshot.forEach(childSnapshot => {
        const playerData = childSnapshot.val();
        playersArr.push({
          uid: childSnapshot.key,
          ...playerData,
        });
        
        // Pass this player's existing data to the auth state object
        if (playerData.uid === getState().auth.uid) {
          dispatch(addUserDetails({
            playersUid: childSnapshot.key,
            ...playerData,
          }));
        };
      });
      dispatch(getPlayersSuccess(playersArr));
    }, err => dispatch(getPlayersFailure(err)));
      
    database.ref('game').on('value', snapshot => {
      const gameData = snapshot.val();
      dispatch(getGameDataSuccess(gameData));
    }, err => dispatch(getGameDataFailure(err)));
    
    database.ref('names').on('value', snapshot => {
      let namesArr = [];
      snapshot.forEach((childSnapshot) => {
        const nameData = childSnapshot.val();
        namesArr.push({
          id: childSnapshot.key,
          ...nameData
        });
      });
      dispatch(getNamesSuccess(namesArr));
    }, err => dispatch(getNamesFailure(err)));
  };
};

const getGameDataBegin = () => ({
  type: 'GET_GAME_DATA_BEGIN'
});

const getGameDataSuccess = gameData => ({
    type: 'GET_GAME_DATA_SUCCESS',
    payload: gameData
});

const getGameDataFailure = error => ({
  type: 'GET_GAME_DATA_FAILURE',
  payload: {error}
});

export const endFetchData = () => {
  return (dispatch, getState) => {
    database.ref('players').off();
    database.ref('game').off();
    database.ref('names').off();
  };
};


// Fetch scores
export const fetchScores = () => {
  return (dispatch) => {
    return database.ref('game').once('value')
      .then(snapshot => {
        const teamAScore = snapshot.val().teamAScore;
        const teamBScore = snapshot.val().teamBScore;
        dispatch(updateLocalScore(teamAScore, teamBScore))
      })
      .catch(err => console.log('actions/fetchScores(): error fetching game data from Firebase.'));
  };
};
      

// endGame flag
export const fetchEndGame = () => {
  return (dispatch, getState) => {
    database.ref('game/endGame').on('value', snapshot => {
      const endGame = snapshot.val();
      dispatch(updateEndGame(endGame));
    });
  };
};

export const endFetchEndGame = () => {
  return (dispatch, getState) => {
    database.ref('game/endGame').off();
  };
}

export const updateEndGame = (endGame) => ({
  type: 'UPDATE_END_GAME',
  endGame
});


// Update score
export const startUpdateScore = (team, score) => {
  return (dispatch, getState) => {
    const previousScore = team === 'A' ? getState().game.teamAScore : getState().game.teamBScore;
    // Check if previousScore exists
    const newScore = previousScore ? previousScore + score : score;
    const teamName = 'team' + team + 'Score';
    return database.ref('game').update({ [teamName]: newScore })
      .catch(err => console.log('Error updating score in Firebase:', err));
  };
};

export const updateLocalScore = (teamAScore, teamBScore) => ({
  type:'UPDATE_SCORE',
  teamAScore,
  teamBScore
});


// Next player
export const setNextPlayer = (player) => {
  return (dispatch) => {
    return database.ref(`game`).update({
      playingNow : {
        uid: player.uid,
        username: player.username,
        team: player.team
      }
    });
  };
};

export const resetNextPlayer = () => {
  return (dispatch) => {
    return database.ref(`game`).update({
      playingNow : {
        uid: '',
        username: '',
        team: ''
      }
    });
  };
};


// Players' turns
export const startTurn = () => {
  return () => {
    database.ref('game').update({
      startTurn: true,
      startTime: Date.now()
    });
  };
};

export const endTurn = (uid) => {
  return () => {
    database.ref().update({
      ['game/startTurn']: false,
      ['game/startTime']: '',
      [`players/${uid}/hasPlayed`]: true
    });
  };
};


// End game
export const endGame = (uid) => {
  return () => {
    database.ref().update({
      ['game/startTurn']: false,
      ['game/endGame']: true,
      ['game/startTime']: '',
      [`players/${uid}/hasPlayed`]: true
    });
  };
};

export const resetGame = () => ({
  type: 'RESET_GAME'
});