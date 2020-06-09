export default (state = {}, action) => {
  switch(action.type) {
    case 'ADD_USER':
      return {
        userName: action.userName,
        team: action.team,
        uid: action.uid,
        hasPlayed: action.hasPlayed,
        isPlaying: action.isPlaying
      };
    case 'REMOVE_USER':
      return {};
    case 'REMOVE_ALL_USERS':
      return state = [];
    case 'SET_PLAYER':
      return {
        ...state,
        isPlaying: true
      }
    case 'RESET_PLAYER':
      return {
        ...state,
        isPlaying: false
      }
    default:
      return state;
  }
};
