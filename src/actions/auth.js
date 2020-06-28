// *** AUTH ACTIONS

import { firebase, googleAuthProvider } from '../firebase/firebase';

// NOTE this is called in app.js rather than startLogin so that it runs when app first loads, not just when user explictly logs in/out
export const loginSuccess = (user, username) => ({
  type:'LOGIN_SUCCESS',
  uid: user.uid,
  username
});

export const loginFailure = (error) => ({
  type:'LOGIN_ERROR',
  error
});


export const startPasswordSignup = (email,password, username) => {
  return (dispatch, getState) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        dispatch(loginSuccess(authUser, username));
      })
      .catch(error => {
        dispatch(loginFailure(error));
      });
  };
};

export const startPasswordLogin = (email,password) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(authUser => {
        dispatch(loginSuccess(authUser, ''));
      })
      .catch(error => {
        dispatch(loginFailure(error));
      });
  };
};

export const logout = () => ({
    type:'LOGOUT',
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};