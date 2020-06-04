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
    default:
      return state;
  }
};
