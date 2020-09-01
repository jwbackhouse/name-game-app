// *** NAMES REDUCER ***

const initialState = {
  data: [],
  isLoading: false,
  error: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_NAMES_BEGIN':
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    case 'GET_NAMES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case 'GET_NAMES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case 'ADD_NAME':
      return {
        ...state,
        data: [...state.data, action.nameObj]
      }
    case 'REMOVE_NAME':
      return {
        ...state,
        data: state.data.filter(name => name.id !== action.id)
      }
    case 'RESET_NAMES':
      return initialState
    default:
      return state;
  }
};
