// *** ACTION CREATORS ***

import database from '../firebase/firebase';


// Add user
export const addUser = ({username, uid, team}) => ({
  type:'ADD_USER',
  username,
  uid,
  team
});

export const startAddUser = (userData) => {
  return (dispatch, getState) => {
    const {
      username = '',
      team = '',
      hasPlayed = false,
      isReady = false
    } = userData;   // Using destructuring to extract data from the user argument rather than doing it in function argument itself
    const user = { username, team, hasPlayed, isReady };   // uses deconstructed values from userData
    return database.ref(`players`).push(user).then((ref) => {
      const userObj = {
        uid: ref.key,    // .then callback from .push gets called with ref, so can get id from this using .key
        ...user
      }
      
      // Add user to state.user
      dispatch(addUser(userObj));
    });
  };
};