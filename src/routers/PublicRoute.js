import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';


export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route { ...rest } component={(props) => (
    <div>
      <Header />
      <Component { ...props } />
    </div>
    
    // NOTE - revert to this when auth sorted
    // isAuthenticated ? (
    //   <Redirect to='/dashboard' />
    // ) : (
    //   <Component { ...props } />
    // )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);


// NOTE: see PrivateRoute.js for explanatory comments