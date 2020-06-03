export const addName = (name={}) => ({
  type:'ADD_NAME',
  name
});

export const removeName = (id) => ({
  type:'REMOVE_NAME',
  id
});

export const editName = (id) => ({
  type:'EDIT_NAME',
  id
});