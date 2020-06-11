import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // allows asynchronous calls to Firebase from actions
import authReducer from '../reducers/auth';
import namesReducer from '../reducers/names';
import userReducer from '../reducers/user';
import playersReducer from '../reducers/players';
import gameReducer from '../reducers/game';

// This needed to use thunk alongside Redux devtools extension; second argument allows Trace within Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;    // Needed to setup redux devtools + allow middleware

export default () => {
  const store = createStore (
    combineReducers({   // Takes object as an argument - with root state name as key, and reducer as the value
      auth: authReducer,
      names: namesReducer,
      user: userReducer,
      players: playersReducer,
      game: gameReducer
    }),
    composeEnhancers(applyMiddleware(thunk)) // See above
  );
  
  return store;
};