// *** ACTION CREATORS FOR TEAMS ***

import database from '../firebase/firebase';

// Fetch all users from Firebase & assign to a team
export const getUsers = () => {
  return (dispatch, getState) => {
    return database.ref(`users`).once('value').then((snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {   // snapshot is an object, so using in-built Firebase method to iterate over child snapshots
        const output = childSnapshot.val();
        users.push({
          uid: childSnapshot.key,
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

  
  // return (dispatch, getState) => {
  //   return database.ref(`users`).once('value').then((snapshot) => {
  //     const playingTeam = [];
  //     snapshot.forEach((childSnapshot) => {   // snapshot is an object, so using in-built Firebase method to iterate over child snapshots
  //       const output = childSnapshot.val();
  //       output.team === team && playingTeam.push({
  //         id: childSnapshot.key,
  //         ...output
  //       })
  //     });
  //     console.log(playingTeam);
  //   });
  // };
