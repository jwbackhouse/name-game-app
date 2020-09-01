const initialState = {
  data: [],
  isLoading: false,
  error: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_PLAYERS_BEGIN':
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    case 'GET_PLAYERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case 'GET_PLAYERS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case 'ADD_PLAYER':
      return {
        ...state,
        data: [...state.data, action.player]
      }
    case 'RESET_PLAYERS':
      return initialState
    case 'UPDATE_PLAYERS':
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
};
