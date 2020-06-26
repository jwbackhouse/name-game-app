// *** NAMES ACTION CREATORS ***

import database from '../firebase/firebase';

// Add a name
export const addName = (nameObj) => ({
  type:'ADD_NAME',
  nameObj
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
    return database.ref(`names/${id}`).remove().then(() => {
      dispatch(removeName(id));
    });
  };
};

// Remove all names
export const removeAllNames = () => ({
  type: 'REMOVE_ALL_NAMES'
});


// TODO - create new dispatch that accepts an array rather than processing each name individually
// Fetch names from Firebase
export const getNames = () => {
  return (dispatch, getState) => {
    return database.ref(`names`).once('value').then((snapshot) => {
      dispatch(removeAllNames());
      snapshot.forEach((childSnapshot) => {
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

export const getNamesPromise = () => {
  return (dispatch, getState) => {
    return database.ref(`names`).once('value');
  };
};

// Update Firebase with latest name status
export const updateNames = (names) => {
  return (dispatch, getState) => {
    names.forEach(name => {
      database.ref(`names/${name.id}/isGuessed`).set(true);
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