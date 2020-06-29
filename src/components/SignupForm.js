import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startPasswordSignup } from '../actions/auth';

const initialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}
  

export class SignupFormBase extends React.Component {
  state = { ...initialState };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    
    const { email, passwordOne, username } = this.state;
    this.props.startPasswordSignup(email, passwordOne, username);
    this.props.history.push('/');
  }
  
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;
    
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';
    
    
    return (
      <form onSubmit={ this.onSubmit }>
        <input
          name='username'
          value={ username }
          onChange={ this.onChange }
          placeholder='Name'
          type='text'
        />
        <input
          name='email'
          value={ email }
          onChange={ this.onChange }
          placeholder='Email'
          type='email'
        />
        <input
          name='passwordOne'
          value={ passwordOne }
          onChange={ this.onChange }
          placeholder='Password'
          type='password'
        />
        <input
          name='passwordTwo'
          value={ passwordTwo }
          onChange={ this.onChange }
          placeholder='Confirm password'
          type='password'
        />
        <button type='submit' disabled={ isInvalid }>
          Sign up
        </button>
        
        { error && <p>{error.message}</p> }
        { this.props.auth.error && <p>Oops. { this.props.auth.error.message }</p> }
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  startPasswordSignup: (email, password, username) => dispatch(startPasswordSignup(email, password, username))
});


// withRouter required to access history
const SignupForm = withRouter(SignupFormBase);
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

// // Redux connect effectively uses a HOC to create a new component, which is what we render above
// const ConnectedSignupForm = connect(undefined, mapDispatchToProps)(SignupForm);