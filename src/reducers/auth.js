// *** AUTH REDUCER

const initialState = {
  uid: '',
  username: '',
  error: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        uid: action.uid,
        username: action.username,
        error: ''
      };
    case 'LOGIN_ERROR':
      return {
        uid: '',
        error: action.error
      };
    case 'LOGOUT_SUCCESS':
      return initialState;
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
