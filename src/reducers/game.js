// *** GAME REDUCER ***

const initialState = {
  teamAScore: 0,
  teamBScore: 0,
  teamJustPlayed: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SCORE':
      const prevTeamAScore = state.teamAScore;
      const prevTeamBScore = state.teamBScore
      return action.team === 'A'
        ? {...state, teamJustPlayed: 'A', teamAScore: (action.score + prevTeamAScore)}
        : {...state, teamJustPlayed: 'B', teamBScore: (action.score + prevTeamBScore)}
    default:
      return state;
  }
};
