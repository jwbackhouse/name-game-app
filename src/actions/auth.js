import { firebase, googleAuthProvider } from '../firebase/firebase';

// NOTE this is called in app.js rather than startLogin so that it runs when app first loads, not just when user explictly logs in/out
export const loginSuccess = (user) => ({
  type:'LOGIN',
  uid: action.user.uid,
  displayName: action.user.displayName
});

export const loginFailure = (error) => ({
  type:'LOGIN_ERROR',
  error
});


export const startPasswordSignup = (email,password) => {
  console.log('startPasswordSignup(): email:', email, ', password:', password);
  return (dispatch, getState) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('startLogin(): authUser object returned:', authUser);
        const user = authUser.user;
        dispatch(loginSuccess(user));
      })
      .catch(error => {
        console.log('startPasswordSignup() catch block: error:', error);
        dispatch(loginFailure(error));
      })
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