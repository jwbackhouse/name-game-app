import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startPasswordLogin } from '../actions/auth';
import checkEmail from '../selectors/checkEmail';

const initialState = {
  username: '',
  email: '',
  password: ''
};

export class LoginFormBase extends React.Component {
  state = { ...initialState };
  
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const { email, password } = this.state;
    this.props.startPasswordLogin(email, password);
  }
  
  onResetPasswordClick = (e) => {
    e.preventDefault();
    this.props.showPasswordReset();
  }
  
  render() {
    const {
      username,
      email,
      password
    } = this.state;
    const { error } = this.props.auth;
    
    const isInvalid =
      !checkEmail(email) ||
      password.length < 2;
    
    let resetPasswordLink;
    if (this.props.auth.error.code === 'auth/wrong-password') {
      resetPasswordLink = <a href='' onClick={ this.onResetPasswordClick }>Forgotten your password?</a>
    }
    
    return (
      <form className='form__column' onSubmit={ this.onSubmit }>
        <input
          className='input input--column'
          name='email'
          value={ email }
          onChange={ this.onChange }
          placeholder='Email'
          autocomplete='email'
          type='text'
        />
        <input
          className='input input--column'
          name='password'
          value={ password }
          onChange={ this.onChange }
          placeholder='Password'
          autocomplete='current-password'
          type='password'
        />
        <button className='button button--column button--hero' type='submit' disabled={ isInvalid }>
          Go
        </button>
        
        { error && <p>Oops. { error.message }</p> }
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