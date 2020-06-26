import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import { login, logout } from './actions/auth';
import { getNames } from './actions/names';
import { getPlayers } from './actions/players';
import { initialiseGame } from './actions/game';
import configureStore from './store/configureStore';
import database, { firebase } from './firebase/firebase';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import ChangeoverPage from './components/ChangeoverPage';

// Set up store
const store = configureStore();

store.dispatch(initialiseGame());
// Get existing players & names from Firebase
// store.dispatch(getPlayers());
// store.dispatch(getNames());

// TODO - move to admin only
// // Remove previous start time for timer -
// database.ref('game').remove()
//   .catch(err => console.log('Error removing "/game" from Firebase: ', err));

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

renderApp();

// // Render loading page
// ReactDOM.render(<LoadingPage />,document.getElementById('body'));

// // Authenticate user
// firebase.auth().onAuthStateChanged((user) => {    // fires once user logs in
//   if (user) {
//     console.log('Logged in.')
//     store.dispatch(login(user.uid))
//     renderApp();
//     if (history.location.pathname === '/') {
//       history.push('/dashboard');
//     }
//   } else {
//     console.log('Logged out.')
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });

