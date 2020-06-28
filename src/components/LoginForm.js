import React from 'react';
import { connect } from 'react-redux';
import { startPasswordSignup } from '../actions/auth';
import { firebase } from '../firebase/firebase';

const initialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}
  

export class LoginForm extends React.Component {
  state = { ...initialState };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    
    const { email, passwordOne } = this.state;
    this.props.startPasswordSignup(email, passwordOne)
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
          Login
        </button>
        
        { error && <p>{error.message}</p> }
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startPasswordSignup: (email, password) => dispatch(startPasswordSignup(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginForm);

// // Redux connect effectively uses a HOC to create a new component, which is what we render above
// const ConnectedLoginForm = connect(undefined, mapDispatchToProps)(LoginForm);