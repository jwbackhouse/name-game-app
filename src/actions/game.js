// *** GAME ACTION CREATORS ***

import database from '../firebase/firebase';
import { updatePlayers } from './players';
import { addName } from './names';


// Populate Firebase with initial game state
export const initialiseGame = () => {
  return () => {
    database.ref('game').set({
      teamAScore: 0,
      teamBScore: 0,
      playingNow: {
        uid: '',
        userName: '',
        team: ''
      },
      startTime: '',
      startTurn: false,
      endGame: false
    });
  };
};


// Subscribe to live Firebase data
export const fetchData = () => {
  return (dispatch, getState) => {
    database.ref('players').on('value', snapshot => {
      let playersArr = [];
      snapshot.forEach(childSnapshot => {
        const playerData = childSnapshot.val();
        playersArr.push({
          uid: childSnapshot.key,
          ...playerData
        });
      });
      dispatch(updatePlayers(playersArr));
    });
    database.ref('game').on('value', snapshot => {
      const gameData = snapshot.val();
      dispatch(updateGame(gameData));
    });
    database.ref('names').on('value', snapshot => {
      snapshot.forEach((childSnapshot) => {
        const localNames = getState().names;
        const nameID = childSnapshot.key;
        if (!localNames.some(localName => localName.id === nameID)) {
          dispatch(addName({
            id: nameID,
            name: childSnapshot.val().name,
            uid: childSnapshot.val().uid,
            isGuessed: childSnapshot.val().isGuessed
          }));
        }
      });
    });
  };
};

export const updateGame = (gameData) => ({
  type: 'UPDATE_GAME',
  gameData
});

export const endFetchData = () => {
  return (dispatch, getState) => {
    database.ref('players').off();
    database.ref('game').off();
    database.ref('names').off();
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
        userName: player.userName,
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
        userName: '',
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
  debugger;
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