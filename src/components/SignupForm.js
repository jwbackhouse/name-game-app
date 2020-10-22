import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startPasswordSignup } from '../actions/auth';
import checkEmail from '../selectors/checkEmail';

const initialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: ''
};
  

export class SignupFormBase extends React.Component {
  state = { ...initialState };
  
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const { email, username, passwordOne, passwordTwo } = this.state;
    
    // Check password match
    if (passwordOne !== passwordTwo) {
      this.setState({ error: 'Oops, the passwords don\'t match' });
      return;
    }
    
    if (passwordOne.length < 6) {
      this.setState({ error: 'Your password needs to be 6 characters or more please'});
      return;
    }
    
    this.props.startPasswordSignup(email, passwordOne, username);
    this.setState({ error: '' });
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
      !checkEmail(email) ||
      username === '';
    
    return (
      <form className='form' onSubmit={ this.onSubmit }>
        <input
          className='input input--column'
          name='username'
          value={ username }
          onChange={ this.onChange }
          placeholder='Name'
          autoComplete='name'
          type='text'
        />
        <input
          className='input input--column'
          name='email'
          value={ email }
          onChange={ this.onChange }
          placeholder='Email'
          autoComplete='email'
          type='text'
        />
        <input
          className='input input--column'
          name='passwordOne'
          value={ passwordOne }
          onChange={ this.onChange }
          placeholder='Password'
          autoComplete='new-password'
          type='password'
        />
        <input
          className='input input--column'
          name='passwordTwo'
          value={ passwordTwo }
          onChange={ this.onChange }
          placeholder='Confirm password'
          autoComplete='new-password'
          type='password'
        />
        <button className='button button--column button--hero' type='submit' disabled={ isInvalid }>
          Go
        </button>
        
        { error && <p>{ error }</p> }
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
