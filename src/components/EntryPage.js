import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import PasswordResetForm from './PasswordResetForm';
import { clearLoginFailure } from '../actions/auth';

const initialState = {
  login: false,
  signup: false,
  passwordReset: false
};

export class EntryPage extends React.Component {
  state = initialState
  
  onClick = (show, hide) => {
    // Close <PasswordResetForm/> if still open
    this.state.passwordReset && this.togglePasswordReset();
    this.props.clearLoginFailure();
    this.setState({
      [show]: !this.state[show],
      [hide]: false
    });
  }
  
  togglePasswordReset = () => {
    this.setState({
      ...initialState,
      passwordReset: !this.state.passwordReset
    })
  }
  
  render() {
    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1 className='box-layout__title'>The Name Game</h1>
          <p>The online version</p>
          <div className='button-column'>
            <button onClick={ () => this.onClick('login', 'signup') } className='button__starts-row'>Login</button>
            <button onClick={ () => this.onClick('signup', 'login') } className='button'>Sign up</button>
          </div>
          { this.state.login && <LoginForm showPasswordReset={ this.togglePasswordReset }/> }
          { this.state.signup && <SignupForm /> }
          { this.state.passwordReset && <PasswordResetForm showPasswordReset={ this.togglePasswordReset }/> }
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  clearLoginFailure: () => dispatch(clearLoginFailure())
});

export default connect(undefined, mapDispatchToProps)(EntryPage);
