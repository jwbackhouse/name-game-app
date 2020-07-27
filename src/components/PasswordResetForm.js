import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startPasswordReset } from '../actions/auth';
import checkEmail from '../selectors/checkEmail';

const initialState = {
  email: '',
  message: ''
};
  
export class PasswordResetFormBase extends React.Component {
  state = { ...initialState };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    
    const { email } = this.state;
    
    this.props.startPasswordReset(email);
    this.setState({ message: 'An email is on its way.' });
  }
  
  render() {
    const { email, message } = this.state;
    const { passwordResetError } = this.props.auth;
    
    const isInvalid = !checkEmail(email);
    
    let alertMsg;
    if (passwordResetError) {
      alertMsg = <p>Doh. { passwordResetError.message }</p>
    } else if (message) {
      alertMsg = <p>{ message }</p>
    }
    
    let form;
    if (!message) {
      form = (
        <form onSubmit={ this.onSubmit }>
          <input
            name='email'
            value={ this.state.email }
            onChange={ this.onChange }
            placeholder='Email'
            type='text'
          />
          <button type='submit' disabled={ isInvalid }>
            Go
          </button>
        </form>
      )
    }
    
    return (
      <div>
        <p>Reset your password</p>
        { form }
        { alertMsg }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  startPasswordReset: (email) => dispatch(startPasswordReset(email))
});

// withRouter required to access history
const PasswordResetForm = withRouter(PasswordResetFormBase);
export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);
