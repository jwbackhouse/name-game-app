// *** ACTION CREATORS ***

import database from '../firebase/firebase';


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