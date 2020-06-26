const initialState = {
  players: [],
  isLoading: false,
  error: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_PLAYERS_BEGIN':
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case 'GET_PLAYERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        players: action.payload
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
        players: [...state.players, action.player]
      };
    case 'REMOVE_ALL_PLAYERS':
      return state.players = [];
    case 'UPDATE_PLAYERS':
        return {
          ...state,
          players: action.payload
        }
    default:
      return state;
  }
};
