// *** AUTH ACTIONS

import { firebase, googleAuthProvider } from '../firebase/firebase';

// NOTE this is called in app.js rather than startLogin so that it runs when app first loads, not just when user explictly logs in/out
export const loginSuccess = (user, username) => ({
  type:'LOGIN_SUCCESS',
  uid: user.uid,
  username
});

export const logoutSuccess = () => ({
    type:'LOGOUT_SUCCESS',
});

const loginFailure = (error) => ({
  type:'LOGIN_FAILURE',
  error
});

const passwordResetError = (error) => ({
  type:'PASSWORD_RESET_FAILURE',
  error
});


export const startPasswordSignup = (email,password, username) => {
  return (dispatch, getState) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.updateProfile({ displayName: username });
        console.log('startPasswordSignup(): authUser:', authUser);
      })
      .catch(error => dispatch(loginFailure(error)));
  };
};

export const startPasswordLogin = (email,password) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(authUser => dispatch(loginSuccess(authUser, '')))
      .catch(error => dispatch(loginFailure(error)));
  };
};

export const startPasswordReset = (email) => {
  return (dispatch, getState) => {
    return firebase.auth().sendPasswordResetEmail(email)
      .catch(error => dispatch(passwordResetError(error)));
  };
};

export const startLogout = () => {
  return (dispatch) => {
    return firebase.auth().signOut()
      .then(() => dispatch(logoutSuccess()))
      .catch(error => dispatch(loginFailure(error)));
  };
};

export const updateDisplayName = (displayName) => {
  return () => {
    return firebase.auth().currentUser.updateProfile({ displayName })
      .catch(error => console.log('updateDisplayName() error:', error));
  };
};