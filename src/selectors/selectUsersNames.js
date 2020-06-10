// Choose name and return starting team letter
export default ((names, uid) => {
  const usersNames = names.filter(name => name.uid === uid);
  return usersNames;
});