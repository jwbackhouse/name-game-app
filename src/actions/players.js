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
export const resetPlayers = () => ({
  type: 'RESET_PLAYERS'
});


// Add player
export const addPlayer = (player) => ({
  type:'ADD_PLAYER',
  player
});


// Mark player as ready to play
export const togglePlayerReady = (uid, playersUid) => {
  return (dispatch, getState) => {
    const players = getState().players.data;
    const thisPlayer = players.find(player => player.uid === uid)
    thisPlayer.isReady
      ? database.ref(`players/${ playersUid }/isReady`).set(false)
      : database.ref(`players/${ playersUid }/isReady`).set(true);
  }
};
