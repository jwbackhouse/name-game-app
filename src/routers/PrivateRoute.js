import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';


export const PrivateRoute = ({
  isAuthenticated,    // from state
  component: Component,   // passed in from AppRouter; renamed with capital C for rendering
  ...rest   // NOTE: rest operator (...rest) - passses in remaining props via the variable rest
}) => (
  <Route { ...rest } component={(props) => (
    isAuthenticated ? (
      <div>
        <Header />
        <Component { ...props } />
      </div>
    ) : (
      <Redirect to='/' />   // Built-in component from react-router-dom
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);