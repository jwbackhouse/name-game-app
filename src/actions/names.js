// *** ACTION CREATORS ***

import database from '../firebase/firebase';

// Add a name
export const addName = (name) => ({
  type:'ADD_NAME',
  name
});

export const startAddName = (name={}) => {
  return (dispatch, getState) => {    // Redux-thunk allows us to return a function, which is called with dispatch
    const uid = getState().user.uid;
    const nameObj = {
      uid,
      name,
      isGuessed: false
    };
  
    return database.ref(`names`).push(nameObj).then((ref) => {
      dispatch(addName({
        id: ref.key,    // .then callback from .push gets called with ref, so can get id from this
        ...nameObj
      }));
    });
  };
};

// Remove a name
export const removeName = (id) => ({
  type:'REMOVE_NAME',
  id
});

export const startRemoveName = (id) => {
  return (dispatch, getState) => {
    return database.ref(`names/${id}`).remove();
  };
};

// Fetch names from Firebase
export const getNames = () => {
  return (dispatch, getState) => {
    return database.ref(`names`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {   // snapshot is an object, so using in-built Firebase method to iterate over child snapshots
        dispatch(addName({
          id: childSnapshot.key,
          name: childSnapshot.val().name,
          uid: childSnapshot.val().uid,
          isGuessed: childSnapshot.val().isGuessed
        }));
      });
    });
  };
};

// Update Firebase with latest name status
export const updateNames = (names) => {
  return (dispatch, getState) => {
    names.forEach(name => {
      return database.ref(`names/${name.id}/isGuessed`).set(true);
    });
    // return database.ref(`names`).once('value').then((snapshot) => {
    //   snapshot.forEach((childSnapshot) => {   // snapshot is an object, so using in-built Firebase method to iterate over child snapshots
    //     dispatch(addName({
    //       id: childSnapshot.key,
    //       name: childSnapshot.val().name,
    //       uid: childSnapshot.val().uid
    //     }));
    //   });
    // });
  };
};