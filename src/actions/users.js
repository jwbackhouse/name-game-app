// *** ACTION CREATORS ***

import database from '../firebase/firebase';
import {addTeamA} from './teams';
import {addTeamB} from './teams';


// Add player
export const addUser = ({userName, team, hasPlayed, isPlaying, uid}) => ({
  type:'ADD_USER',
  userName,
  team,
  hasPlayed,
  isPlaying,
  uid
});


export const startAddUser = (userData = {}) => {
  return (dispatch, getState) => {    // Redux-thunk allows us to return a function, which is called with dispatch
    const {
      userName = 'Blank',
      team = 'Unknown',
      hasPlayed = false,
      isPlaying = false
    } = userData;   // Using destructuring to extract data from the user argument rather than doing it in function argument itself
    const user = { userName, team, hasPlayed };   // uses deconstructed values from userData
    return database.ref(`users`).push(user).then((ref) => {
      const userObj = {
        uid: ref.key,    // .then callback from .push gets called with ref, so can get id from this using .key
        ...user
      }
      dispatch(addUser(userObj))
      user.team === 'A'
        ? dispatch(addTeamA(userObj))
        : dispatch(addTeamB(userObj));
    });
  };
};


// Set the active player
export const setPlayer = () => ({
  type: 'SET_PLAYER',
})


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
}