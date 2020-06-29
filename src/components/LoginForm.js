import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startPasswordLogin } from '../actions/auth';

const initialState = {
  username: '',
  email: '',
  password: '',
  error: null
}
  

export class LoginFormBase extends React.Component {
  state = { ...initialState };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    
    const { email, password } = this.state;
    this.props.startPasswordLogin(email, password);
  }
  
  onResetPasswordClick = e => {
    e.preventDefault();
    this.props.passwordReset();
  }
  
  render() {
    const {
      username,
      email,
      password,
      error
    } = this.state;
    
    const isInvalid =
      password === '' ||
      email === '';
    
    let resetPasswordLink;
    if (this.props.auth.error.code === 'auth/wrong-password') {
      resetPasswordLink = <a href='' onClick={ this.onResetPasswordClick }>Forgotten your password?</a>
    }
    
    return (
      <form onSubmit={ this.onSubmit }>
        <input
          name='email'
          value={ email }
          onChange={ this.onChange }
          placeholder='Email'
          type='email'
        />
        <input
          name='password'
          value={ password }
          onChange={ this.onChange }
          placeholder='Password'
          type='password'
        />
        <button type='submit' disabled={ isInvalid }>
          Login
        </button>
        
        { error && <p>{error.message}</p> }
        { this.props.auth.error && <p>Oops. { this.props.auth.error.message }</p> }
        { resetPasswordLink }
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});


const mapDispatchToProps = (dispatch) => ({
  startPasswordLogin: (email, password) => dispatch(startPasswordLogin(email, password))
});

// withRouter required to access history
const LoginForm = withRouter(LoginFormBase);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);