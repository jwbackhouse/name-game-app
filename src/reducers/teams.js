const defaultState = {
  teamA: [],
  teamB: []
};
  

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_TEAM_A':
      return {
        ...state,
        teamA: [...state.teamA, action.user.userName]
      }
    case 'ADD_TEAM_B':
      return {
        ...state,
        teamB: [...state.teamB, action.user.userName]
      }
    default:
      return state;
  }
};



// state
//   team A: [a, b, c]
    
//   team B: [d, e, g]