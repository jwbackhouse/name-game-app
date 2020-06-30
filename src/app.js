import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import database, { firebase } from './firebase/firebase';
import { loginSuccess, logoutSuccess } from './actions/auth';
import { initialiseGame } from './actions/game';
import configureStore from './store/configureStore';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// Set up store
const store = configureStore();
store.dispatch(initialiseGame());

// Set game rules
export const numberNames = 5;
export const timerLength = 120000;   // in milliseconds
export const passesAllowed = 3;

// Setup rendering
const jsx = (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx,document.getElementById('body'));
    hasRendered = true;
  }
}

// Render loading page
ReactDOM.render(<LoadingPage />,document.getElementById('body'));

// Authenticate user
try {
  firebase.auth().onAuthStateChanged((user) => {    // fires once user logs in
    if (user) {
      console.log('app.js: Logged in. Current user:', user)
      store.dispatch(loginSuccess(user, user.displayName))
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/join');
      }
    } else {
      console.log('app.js: Logged out.')
      store.dispatch(logoutSuccess());
      renderApp();
      if (!history.location.pathname === '/'  && !history.location.pathname === '/reset') {
        history.push('/');
      }
    }
  });
} catch (error) {
  console.log('app.js: firebase.auth() error:', error);
}