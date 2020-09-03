// *** GAME REDUCER ***

const initialState = {
  isLoading: false,
  error: '',
  teamAScore: 0,
  teamBScore: 0,
  playingNow: {
    uid: '',
    userName: '',
    team: ''
  },
  startTime: undefined,
  startTurn: false,
  endGame: false,
  numPasses: 3,
  numNames: 5,
  timerLength: 60,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_GAME_DATA_BEGIN':
      return {
        ...state,
        error: '',
        isLoading: true
      }
    case 'GET_GAME_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        ...action.payload
      }
    case 'GET_GAME_DATA_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
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
