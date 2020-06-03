export default (state = [], action) => {
  switch(action.type) {
    case 'ADD_NAME':
      return [
        ...state,   // Using spread operator as an alternative to concat - doesn't change original array
        action.name    // This returns an object that's added to the array
      ];
    case 'REMOVE_NAME':
      return state.filter((name) => name.id !== action.id);
    // case 'EDIT_NAME':
      
    // case 'SET_EXPENSES':
    //   return action.expenses;   // Overwrites all existing expenses
    default:
      return state;
  }
};
