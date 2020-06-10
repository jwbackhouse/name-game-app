// *** ACTION CREATORS ***

import database from '../firebase/firebase';
import { addPlayer } from './players';


// Add user
export const addUser = ({userName, uid, team}) => ({
  type:'ADD_USER',
  userName,
  uid,
  team
});

export const startAddUser = (userData) => {
  return (dispatch, getState) => {
    const {
      userName = '',
      team = '',
      hasPlayed = false,
      isPlaying = false,
      isReady = false
    } = userData;   // Using destructuring to extract data from the user argument rather than doing it in function argument itself
    const user = { userName, team, hasPlayed, isPlaying, isReady };   // uses deconstructed values from userData
    return database.ref(`users`).push(user).then((ref) => {
      const userObj = {
        uid: ref.key,    // .then callback from .push gets called with ref, so can get id from this using .key
        ...user
      }
      
      // Add user to state.user
      dispatch(addUser(userObj));
      
      // Add user to state.players
      dispatch(addPlayer(userObj));
    });
  };
};


// Set the active player
export const setPlayer = () => ({
  type: 'SET_PLAYER',
});

export const startSetPlayer = (uid) => {
  return (dispatch, getState) => {
    const isThisUser = getState().user.uid === uid;
    
    // Update isPlaying in local state for relevant user. Have to call before db update otherwise GamePage loads before promise is resolved
    if (isThisUser) {
      dispatch(setPlayer())
    }
    
    // Update Firebase
    return database.ref(`users/${uid}/isPlaying`).set(true)
  }
};


// Reset the active player
export const resetPlayer = () => ({
  type: 'RESET_PLAYER',
});

export const startResetPlayer = () => {
  return (dispatch, getState) => {
    const thisUserPlaying = getState().user.isPlaying;
    
    // Check if local user is the active player
    if (thisUserPlaying) {
      // Update isPlaying in local state
      dispatch(resetPlayer())
      
      // Update Firebase
      const uid = getState().user.uid;
      return database.ref(`users/${uid}`).update({
        isPlaying: false,
        hasPlayed: true
      })
      
    }
    
  }
};