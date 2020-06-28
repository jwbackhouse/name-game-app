// *** NAMES ACTION CREATORS ***

import database from '../firebase/firebase';

// Add a name
export const addName = (nameObj) => ({
  type:'ADD_NAME',
  nameObj
});

export const startAddName = (name='') => {
  return (dispatch, getState) => {    // Redux-thunk allows us to return a function, which is called with dispatch
    const uid = getState().user.uid;
    const nameObj = {
      uid,
      name,
      isGuessed: false
    };
  
    return database.ref('names').push(nameObj).then((ref) => {
      dispatch(addName({
        id: ref.key,    // .then callback from .push gets called with ref, so can get id from this
        ...nameObj
      }));
    });
  };
};

// Remove a name
export const startRemoveName = (id) => {
  return (dispatch, getState) => {
    return database.ref(`names/${id}`).remove()
      .then(() => dispatch(removeName(id)));
  };
};

export const removeName = (id) => ({
  type:'REMOVE_NAME',
  id
});


// Remove all names
export const removeAllNames = () => ({
  type: 'REMOVE_ALL_NAMES'
});


// Fetch names from Firebase
export const getNames = () => {
  return (dispatch, getState) => {
    dispatch(getNamesBegin());
    return database.ref('names').once('value')
      .then((snapshot) => {
        const namesArr = [];
        snapshot.forEach(childSnapshot => {
          const output = childSnapshot.val();
          namesArr.push({
            id: childSnapshot.key,
            ...output
          });
        })
        dispatch(getNamesSuccess(namesArr));
      })
      .catch(err => dispatch(getNamesFailure(err)));
  };
};

export const getNamesBegin = () => ({
  type: 'GET_NAMES_BEGIN'
});

export const getNamesSuccess = namesArr => ({
    type: 'GET_NAMES_SUCCESS',
    payload: namesArr
});

export const getNamesFailure = error => ({
  type: 'GET_NAMES_FAILURE',
  payload: {error}
});


// Update Firebase with latest name status
export const updateNames = (names) => {
  return (dispatch, getState) => {
    names.forEach(name => {
      database.ref(`names/${name.id}/isGuessed`).set(true);
    });
  };
};