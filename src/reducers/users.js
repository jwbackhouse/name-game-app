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
    case 'SET_PLAYER':
      return {
        ...state,
        isPlaying: true
      }
    default:
      return state;
  }
};
