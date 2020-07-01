export const auth = {
  uid: 'abc1',
  playersUid: 1234,
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
  playersUid: '',
  username: '',
  error: '',
  passwordResetError: ''
};

export default auth;