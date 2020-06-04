// *** ACTION CREATORS ***

import database from '../firebase/firebase';


export const addName = (name) => ({
  type:'ADD_NAME',
  name
});

export const startAddName = (name={}) => {
  return (dispatch, getState) => {    // Redux-thunk allows us to return a function, which is called with dispatch
    const uid = getState().users.uid;
    return database.ref(`users/${ uid }/names`).push(name).then((ref) => {
      dispatch(addName({
        id: ref.key,    // .then callback from .push gets called with ref, so can get id from this
        name
      }))
    })
  };
};

export const removeName = (id) => ({
  type:'REMOVE_NAME',
  id
});