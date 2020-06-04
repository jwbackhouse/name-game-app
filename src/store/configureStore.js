import { createStore, combineReducers, applyMiddleware,  } from 'redux';
import thunk from 'redux-thunk'; // allows asynchronous calls to Firebase from actions
import authReducer from '../reducers/auth';
import namesReducer from '../reducers/names';
import usersReducer from '../reducers/users';

// This needed to use thunk alongside dev tools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;    // Needed to setup redux devtools + allow middleware

export default () => {
  const store = createStore (
    combineReducers({   // Takes object as an argument - with root state name as key, and reducer as the value
      auth: authReducer,
      names: namesReducer,
      users: usersReducer
    }),
    composeEnhancers(applyMiddleware(thunk)) // See above
  );
  
  return store;
};