import React from 'react';
import { connect } from 'react-redux';
import { startPasswordSignup } from '../actions/auth';
import { firebase } from '../firebase/firebase';

export class LoginPage extends React.Component {
  state = {
    login: false,
    signup: false
  }
  
  onClick = (type) => {
    this.setState({ [type]: true })
  }
  
  render() {
    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1 className='box-layout__title'>The Name Game</h1>
          <p>The online version</p>
          <button onClick={ () => this.onClick('login') } className='button'>Login</button>
          <button onClick={ () => this.onClick('signup') } className='button'>Sign up</button>
          { this.state.login && <ConnectedLoginForm /> }
          { this.state.signup && <SignupForm /> }
        </div>
      </div>
    );
  }
};

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

// Redux connect effectively uses a HOC to create a new component, which is what we render above
const ConnectedLoginForm = connect(undefined, mapDispatchToProps)(LoginForm);



export class SignupForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Sign up form</h2>
      </div>
    )
  }
}

export default LoginPage;





// export default class LoginPage extends React.Component {
//   onSubmit = (e) => {
//     e.preventDefault();
//     this.props.history.push('/dashboard')   // Redirect on submit (uses in-built method)
//   };
  
//   render () {
//     return (
//       <div>
//         <h1>Login</h1>
//         <form onSubmit = {this.onSubmit}>
//           <label>User name
//             <input
//               type = 'text'
//               placeholder = 'User name'
//               autoFocus
//             />
//           </label>
//           <label>Password
//             <input
//               type = 'text'
//               placeholder = 'Password'
//             />
//           </label>
//           <button>Go</button>
//         </form>
//       </div>
//     )
//   };
// };