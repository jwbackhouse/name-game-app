const defaultState = {
  teamA: [],
  teamB: []
};
  

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_TEAM_A':
      return {
        ...state,
        teamA: [...state.teamA, action.user]
      }
    case 'ADD_TEAM_B':
      return {
        ...state,
        teamB: [...state.teamB, action.user]
      }
    default:
      return state;
  }
};
