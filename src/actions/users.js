// *** ACTION CREATORS ***

import database from '../firebase/firebase';

export const addUser = ({userName, team, uid}) => ({
  type:'ADD_USER',
  userName,
  team,
  uid
});

export const startAddUser = (userData = {}) => {
  return (dispatch, getState) => {    // Redux-thunk allows us to return a function, which is called with dispatch
    const {
      userName = 'Blank',
      team = 'Unknown',
    } = userData;   // Using destructuring to extract data from the user argument rather than doing it in function argument itself (as in commented-out ADD_EXPENSE below)
    const user = { userName, team };   // uses deconstructed values from userData
    return database.ref(`users`).push(user).then((ref) => {
      dispatch(addUser({
        uid: ref.key,    // .then callback from .push gets called with ref, so can get id from this using .key
        ...user
      }))
    });
  };
};