export const auth = {
  uid: 'abc1',
  firebaseUID: 1234,
  username: 'Joe',
  error: '',
  passwordResetError: ''
};

export const authWithError = {
  ...auth,
  error: 'This is an error',
  passwordResetError: 'This is a passwordResetError'
};

export const blankAuth = {
  uid: '',
  firebaseUID: '',
  username: '',
  error: '',
  passwordResetError: ''
};

export default auth;