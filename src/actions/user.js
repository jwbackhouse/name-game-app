// *** ACTION CREATORS ***

import database from '../firebase/firebase';
import { addPlayer, markPlayerPlayed } from './players';
import { setPlayingTeam } from './game';


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
      isReady = false
    } = userData;   // Using destructuring to extract data from the user argument rather than doing it in function argument itself
    const user = { userName, team, hasPlayed, isReady };   // uses deconstructed values from userData
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
export const setActivePlayer = () => ({
  type: 'SET_ACTIVE_PLAYER',
});

export const startSetActivePlayer = (uid, team) => {
  return (dispatch, getState) => {
    const isThisUser = getState().user.uid === uid;
    
    // Update playing team in state.game for all users
    dispatch(setPlayingTeam(team));
    
    // Update isPlaying in local state for relevant user. Have to call before db update otherwise GamePage loads before promise is resolved
    if (isThisUser) {
      dispatch(setActivePlayer())
    }
  }
};


// Reset the active player
export const resetActivePlayer = () => ({
  type: 'RESET_ACTIVE_PLAYER',
});

export const startResetActivePlayer = () => {
  return (dispatch, getState) => {
    const thisUserPlaying = getState().user.isPlaying;
    
    // Check if local user is the active player
    if (thisUserPlaying) {
      // Update isPlaying in local state
      dispatch(resetActivePlayer())
      
      // Update hasPlayed flag in Firebase and state.players
      const uid = getState().user.uid;
      return database.ref(`users/${uid}`).update({ hasPlayed: true })
        .catch(err => console.log('Error resetting player in db:', err));
    }
  }
};