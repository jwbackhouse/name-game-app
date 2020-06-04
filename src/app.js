import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { v4 as uuidv4 } from 'uuid'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import { login, logout } from './actions/auth';
import { addName } from './actions/names';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

// Set up store
const store = configureStore();

store.subscribe(() => {
  const names = store.getState();
  console.log(names);
});

// Manually add names to state
const nameOne = {
  id: uuidv4(),
  name: 'Martin Luther King'
};
const nameTwo = {
  id: uuidv4(),
  name: 'Rosie Revere'
};
const nameThree = {
  id: uuidv4(),
  name: 'David Bowie'
};
const nameFour = {
  id: uuidv4(),
  name: 'Fred Truman'
};
const nameFive = {
  id: uuidv4(),
  name: 'Harold Wilson'
};

store.dispatch(addName(nameOne));
store.dispatch(addName(nameTwo));
store.dispatch(addName(nameThree));
store.dispatch(addName(nameFour));
store.dispatch(addName(nameFive));


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
firebase.auth().onAuthStateChanged((user) => {    // fires once user logs in
  if (user) {
    console.log('Logged in.')
    store.dispatch(login(user.uid))
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    console.log('Logged out.')
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

