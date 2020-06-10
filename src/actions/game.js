// *** GAME ACTION CREATORS ***

import database from '../firebase/firebase';

// Update score & record team who just played
export const updateScore = (team, score) => ({
  type:'UPDATE_SCORE',
  team,
  score
});


export const setStartTime = () => {
  return (dispatch, getState) => {
    const now = Date.now();
    return database.ref('game/startTime').set(now);
  };
};
