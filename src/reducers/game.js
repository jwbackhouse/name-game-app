// *** GAME REDUCER ***

const initialState = {
  teamAScore: 0,
  teamBScore: 0,
  playingTeam: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SCORE':
      return {
        ...state,
        teamAScore: action.teamAScore,
        teamBScore: action.teamBScore
      }
    case 'SET_PLAYING_TEAM':
      return {
        ...state,
        playingTeam: action.playingTeam
      }
    default:
      return state;
  }
};
