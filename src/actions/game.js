// *** GAME ACTION CREATORS ***

import database from '../firebase/firebase';

// Update score & record team who just played
export const updateScore = (team, score) => ({
  type:'UPDATE_SCORE',
  team,
  score
});

