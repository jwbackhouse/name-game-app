// *** AUTH REDUCER

const initialState = {
  uid: '',
  firebaseUID: '',
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
    case 'CLEAR_LOGIN_FAILURE':
      return {
        ...state,
        error: ''
      }
    case 'PASSWORD_RESET_FAILURE':
      return {
        ...state,
        passwordResetError: action.error
      }
    case 'CLEAR_PASSWORD_RESET_FAILURE':
      return {
        ...state,
        passwordResetError: ''
      }
    case 'ADD_USER_DETAILS':
        return {
          ...state,
          username: action.username,
          team: action.team,
          firebaseUID: action.firebaseUID
        }
    default:
      return state;
  }
};
