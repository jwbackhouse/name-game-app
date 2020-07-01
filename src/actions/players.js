// *** ACTION CREATORS ***

import database from '../firebase/firebase';


// Fetch players from Firebase
export const getPlayers = () => {
  return (dispatch, getState) => {
    dispatch(getPlayersBegin());
    return database.ref(`players`).once('value')
      .then(snapshot => {
        const playerArr = [];
        snapshot.forEach(childSnapshot => {
          const output = childSnapshot.val();
          playerArr.push({
            uid: childSnapshot.key,
            ...output
          })
        });
        dispatch(getPlayersSuccess(playerArr));
      })
      .catch(err => dispatch(getPlayersFailure(err)));
  };
};

export const getPlayersBegin = () => ({
  type: 'GET_PLAYERS_BEGIN'
});

export const getPlayersSuccess = playerArr => ({
    type: 'GET_PLAYERS_SUCCESS',
    payload: playerArr
});

export const getPlayersFailure = error => ({
  type: 'GET_PLAYERS_FAILURE',
  payload: {error}
});


// Remove all players
export const removeAllPlayers = () => ({
  type: 'REMOVE_ALL_PLAYERS'
});


// Add player
export const addPlayer = (player) => ({
  type:'ADD_PLAYER',
  player
});


// Mark player as ready to play
export const markPlayerReady = (uid) => {
  return (dispatch, getState) => {
    return database.ref(`players/${uid}/isReady`).set(true);
  }
};

// export const updatePlayers = (players) => ({
//   type: 'UPDATE_PLAYERS',
//   payload: players
// });

