import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';   // This allows us to access history outside a component - in this case for the Firebase login in app.js
import RegisterPage from '../components/RegisterPage';
import SetupPage from '../components/SetupPage';
import StartPage from '../components/StartPage';
import GamePage from '../components/GamePage';
import GuessingPage from '../components/GuessingPage';
import ChangeoverPage from '../components/ChangeoverPage';
import EndPageBase from '../components/EndPageBase';
import ErrorPage from '../components/ErrorPage';
import EntryPage from '../components/EntryPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Switch>
        <PublicRoute exact path='/' component={RegisterPage} />
        <PublicRoute path='/login' component={EntryPage} />
        <PublicRoute path='/setup' component={SetupPage} />
        <PublicRoute path='/start' component={StartPage} />
        <PublicRoute path='/play' component={GamePage} />
        <PublicRoute path='/guess' component={GuessingPage} />
        <PublicRoute path='/scores' component={ChangeoverPage} />
        <PublicRoute path='/end' component={EndPageBase} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;


// NOTE: <BrowserRouter> has in-built history, so need to use <Router> to define own history package