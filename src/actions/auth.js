// *** AUTH ACTIONS

import database, { firebase, googleAuthProvider } from '../firebase/firebase';

// NOTE this is called in app.js rather than startLogin so that it runs when app first loads, not just when user explictly logs in/out
export const loginSuccess = (user, username) => ({
  type:'LOGIN_SUCCESS',
  uid: user.uid,
  username
});


// LOGIN PROCESS
export const logoutSuccess = () => ({
    type:'LOGOUT_SUCCESS',
});

const loginFailure = (error) => ({
  type:'LOGIN_FAILURE',
  error
});

const passwordResetFailure = (error) => ({
  type:'PASSWORD_RESET_FAILURE',
  error
});

export const clearLoginFailure = () => ({
  type: 'CLEAR_LOGIN_FAILURE'
});

export const clearPasswordResetFailure = () => ({
  type: 'CLEAR_PASSWORD_RESET_FAILURE'
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
    console.log('starting login with', email, password);
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(authUser => dispatch(loginSuccess(authUser, '')))
      .catch(error => dispatch(loginFailure(error)));
  };
};

export const startPasswordReset = (email) => {
  return (dispatch, getState) => {
    return firebase.auth().sendPasswordResetEmail(email)
      .catch(error => dispatch(passwordResetFailure(error)));
  };
};

export const startLogout = () => {
  return (dispatch) => {
    return firebase.auth().signOut()
      .then(() => dispatch(logoutSuccess()))
      .catch(error => dispatch(loginFailure(error)));
  };
};

export const checkResetPassword = (actionCode) => {
  return (dispatch) => {
    return firebase.auth().verifyPasswordResetCode(actionCode)
  };
};

export const confirmPasswordReset = (actionCode, password) => {
  return (dispatch) => {
    return firebase.auth().confirmPasswordReset(actionCode, password)
  };
};


// GAME MANAGEMENT
export const addGameInfo = ({username, playersUid, team}) => ({
  type:'ADD_GAME_INFO',
  username,
  playersUid,
  team
});

export const updateDisplayName = (displayName) => {
  return (dispatch) => {
    return firebase.auth().currentUser.updateProfile({ displayName })
      .catch(error => console.log('updateDisplayName() error:', error));
  };
};

export const startAddGameInfo = (userData) => {
  return (dispatch, getState) => {
    const {
      username = '',
      team = '',
      hasPlayed = false,
      isReady = false
    } = userData;
    
    const user = { username, team, hasPlayed, isReady };   // uses deconstructed values from userData
    return database.ref(`players`).push(user).then((ref) => {
      const userObj = {
        playersUid: ref.key,    // .then callback from .push gets called with ref, so can get id from this using .key
        ...user
      }
      
      // Add user to state.user
      dispatch(addGameInfo(userObj));
    });
  };
};