import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export class LoginPage extends React.Component {
  state = {
    login: false,
    signup: false
  }
  
  onClick = (show, hide) => {
    this.setState({
      [show]: !this.state[show],
      [hide]: false
    });
  }
  
  render() {
    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1 className='box-layout__title'>The Name Game</h1>
          <p>The online version</p>
          <button onClick={ () => this.onClick('login', 'signup') } className='button'>Login</button>
          <button onClick={ () => this.onClick('signup', 'login') } className='button'>Sign up</button>
          { this.state.login && <LoginForm /> }
          { this.state.signup && <SignupForm /> }
        </div>
      </div>
    );
  }
};

export default LoginPage;