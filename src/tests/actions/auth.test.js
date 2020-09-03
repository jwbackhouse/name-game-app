import { loginSuccess, logoutSuccess } from '../../actions/auth';
import { auth } from '../fixtures/testAuth.js';

test('Should setup loginSuccess action object.', () =>{
  const action = loginSuccess(auth, auth.username);
  expect(action).toEqual({
    type:'LOGIN_SUCCESS',
    uid: auth.uid,
    username: auth.username,
  });
});

test('Should setup logout action object.', () =>{
  const action = logoutSuccess();
  expect(action).toEqual({
    type:'LOGOUT_SUCCESS',
  });
});