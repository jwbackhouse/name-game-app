import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import PasswordResetForm from './PasswordResetForm';

const initialState = {
  login: false,
  signup: false,
  passwordReset: false
};

export class LoginPage extends React.Component {
  state = initialState
  
  onClick = (show, hide) => {
    this.setState({
      [show]: !this.state[show],
      [hide]: false
    });
  }
  
  handlePasswordReset = () => {
    this.setState({
      ...initialState,
      passwordReset: true
    })
  }
    
  
  render() {
    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1 className='box-layout__title'>The Name Game</h1>
          <p>The online version</p>
          <button onClick={ () => this.onClick('login', 'signup') } className='button'>Login</button>
          <button onClick={ () => this.onClick('signup', 'login') } className='button'>Sign up</button>
          { this.state.login && <LoginForm passwordReset={ this.handlePasswordReset }/> }
          { this.state.signup && <SignupForm /> }
          { this.state.passwordReset && <PasswordResetForm /> }
        </div>
      </div>
    );
  }
};

export default LoginPage;