// Choose name and return starting team letter
export default ((names, uid) => {
  const usersNames = names.filter(name => name.playerUid === uid);
  return usersNames;
});