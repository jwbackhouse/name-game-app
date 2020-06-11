// Choose name and return starting team letter
export default ((lastTeamPlayed, players) => {
  let teamLetter;
  if (lastTeamPlayed) {
    teamLetter = (lastTeamPlayed === 'A') ? 'B' : 'A'
  } else {
    teamLetter = 'A';
  }
  const team = `team${teamLetter}`;
  
  // FOR LIVE
  const startingTeam = players.filter(player => player.team === teamLetter && !player.hasPlayed);
  const player = startingTeam[0];
  
  // FOR TESTING
  // const startingTeam = players.filter(player => player.team === 'A' && !player.hasPlayed);
  // const index = startingTeam.length - 1;
  // const player = startingTeam[index];
  
  return player;
});



// *** Original version that makes random selection ***
// export default ((lastTeamPlayed, players) => {
//   let teamLetter;
//   if (lastTeamPlayed) {
//     teamLetter = (lastTeamPlayed === 'teamA') ? 'B' : 'A'
//   } else {
//     teamLetter = Math.random() < 0.5 ? 'A' : 'B';
//   }
  
//   const team = `team${teamLetter}`;
  
//   // FOR LIVE
//   const startingTeam = players.filter(player => player.team === teamLetter && !player.hasPlayed);
//   const index = Math.floor(Math.random() * startingTeam.length);
//   const player = startingTeam[index];
  
//   // FOR TESTING
//   // const startingTeam = players.filter(player => player.team === 'A' && !player.hasPlayed);
//   // const index = startingTeam.length - 1;
//   // const player = startingTeam[index];

//   return player;
// });