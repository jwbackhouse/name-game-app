// *** ACTION CREATORS ***

import database from '../firebase/firebase';


// Fetch users from Firebase
const getPlayersBegin = () => ({
  type: 'GET_PLAYERS_BEGIN'
});

const getPlayersSuccess = playerArr => ({
    type: 'GET_PLAYERS_SUCCESS',
    payload: playerArr
});

const getPlayersFailure = error => ({
  type: 'GET_PLAYERS_FAILURE',
  payload: {error}
});


// NB overwrites all existing players
export const getPlayers = () => {
  return (dispatch, getState) => {
    dispatch(getPlayersBegin());
    return database.ref(`users`).once('value').then(snapshot => {
      const playerArr = [];
      snapshot.forEach(childSnapshot => {
        const output = childSnapshot.val();
        playerArr.push({
          uid: childSnapshot.key,
          ...output
        })
      });
      dispatch(getPlayersSuccess(playerArr));
    }).catch(err => {
      // console.log(err)
      dispatch(getPlayersFailure(err));
    });
  };
};



// export const getPlayers = () => {
//   return (dispatch, getState) => {
//     // dispatch(getPlayersBegin());
//     return database.ref(`users`).once('value').then(snapshot => {
//       // dispatch(getPlayersSuccess(snapshot.val()));
      
//       dispatch(removeAllPlayers());
      
//       snapshot.forEach((childSnapshot) => {   // snapshot is an object, so using in-built Firebase method to iterate over child snapshots
//         const output = childSnapshot.val();
//         dispatch(addPlayer({
//           uid: childSnapshot.key,
//           ...output
//         }));
//       });
//     }).catch(err => {
//       console.log(err)
//       // dispatch(getPlayersFailure(err));
//     });
//   };
// };

// Remove all players
export const removeAllPlayers = () => ({
  type: 'REMOVE_ALL_PLAYERS'
});

// Add player
export const addPlayer = (player) => ({
  type:'ADD_PLAYER',
  player
});

export const startAddPlayer = (player={}) => {
  return (dispatch, getState) => {
    const uid = getState().user.uid;
    const playerObj = {
      uid,
      isPlaying: false,
      hasPlayed: false,
      ...player
    };
  
    return database.ref(`users`).push(playerObj).then((ref) => {
      dispatch(addPlayer({
        id: ref.key,    // .then callback from .push gets called with ref, so can get id from this
        ...playerObj
      }));
    });
  };
};
