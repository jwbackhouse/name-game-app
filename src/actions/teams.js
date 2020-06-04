// *** ACTION CREATORS FOR TEAMS ***

import database from '../firebase/firebase';

// Fetch all users from Firebase
export const getUsers = () => {
  return (dispatch, getState) => {
    const uid = getState().users.uid;
    return database.ref(`users`).once('value').then((snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {   // snapshot is an object, so using in-built Firebase method to iterate over child snapshots
        const output = childSnapshot.val();
        users.push({
          id: childSnapshot.key,
          ...output
        });
      });
      users.forEach((user) => {
        user.team === 'A'
          ? dispatch(addTeamA(user))
          : dispatch(addTeamB(user));
      });
    });
  };
};

// Add users to team lists
export const addTeamA = (user) => ({
  type:'ADD_TEAM_A',
  user
});
export const addTeamB = (user) => ({
  type:'ADD_TEAM_B',
  user
});