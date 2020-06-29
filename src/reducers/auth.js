// *** AUTH REDUCER

const initialState = {
  uid: '',
  username: '',
  error: '',
  passwordResetError: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        uid: action.uid,
        username: action.username,
        error: ''
      };
    case 'LOGOUT_SUCCESS':
      return initialState;
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.error
      };
    case 'PASSWORD_RESET_FAILURE':
      return {
        ...state,
        passwordResetError: action.error
      }
    default:
      return state;
  }
};
