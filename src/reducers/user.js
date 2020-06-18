// *** USER REDUCER ***


export default (state = {}, action) => {
  switch(action.type) {
    case 'ADD_USER':
      return {
        userName: action.userName,
        team: action.team,
        uid: action.uid
      };
    case 'REMOVE_USER':
      return {};
    case 'REMOVE_ALL_USERS':
      return state = [];
    case 'SET_ACTIVE_PLAYER':
      return {
        ...state,
        isPlaying: true
      }
    case 'RESET_ACTIVE_PLAYER':
      return {
        ...state,
        isPlaying: false
      }
    default:
      return state;
  }
};
