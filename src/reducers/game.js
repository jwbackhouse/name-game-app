// *** GAME REDUCER ***

const initialState = {
  teamAScore: 0,
  teamBScore: 0,
  playingNow: {
    uid: '',
    userName: '',
    team: ''
  },
  startTime: undefined,
  startTurn: false,
  endGame: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SCORE':
      return {
        ...state,
        teamAScore: action.teamAScore,
        teamBScore: action.teamBScore
      };
    case 'SET_PLAYING_TEAM':
      return {
        ...state,
        playingTeam: action.playingTeam
      };
    case 'UPDATE_GAME':
      return {
        ...state,
        ...action.gameData
      };
    case 'UPDATE_END_GAME':
      return {
        ...state,
        endGame: action.endGame
      };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  };
};
