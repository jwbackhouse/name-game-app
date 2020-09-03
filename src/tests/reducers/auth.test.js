import authReducer from '../../reducers/auth';
import { auth } from '../fixtures/testAuth.js';

test('Should set user details on login.', () => {
  const action = {
    type:'LOGIN_SUCCESS',
    uid: auth.uid,
    username: auth.username
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({
    uid: auth.uid,
    username: auth.username,
    error: '',
  });
});

test('Should clear state on logout.', () => {
  const prevState = {
    uid: 4567,
    username: 'Tracy Chapman',
    error: 'some error'
  };
  const initialState = {
    uid: '',
    firebaseUID: '',
    username: '',
    error: '',
    passwordResetError: ''
  };
  const action = {
    type:'LOGOUT_SUCCESS',
  };
  const state = authReducer(prevState, action);
  expect(state).toEqual(initialState);
});
