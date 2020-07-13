import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { checkResetPassword, confirmPasswordReset, startPasswordLogin } from '../actions/auth';

const initialState = {
  mode: '',
  actionCode: '',
  passwordOne: '',
  passwordTwo: '',
  email: '',
  error: '',
};

export class ResetPage extends React.Component {
  state = initialState;

  componentDidMount() {
    const { location, checkResetPassword } = this.props;
    // Extract URL parameters
    const urlString = location.search;
    const urlParams = queryString.parse(urlString);
    const mode = urlParams.mode;
    const actionCode = urlParams.oobCode;
    this.setState({
      mode,
      actionCode,
    });

    // Check user has arrived from a reset password link
    if (mode === 'resetPassword') {
      checkResetPassword(actionCode)
        .then(email => this.setState({ email }))
        .catch(error => this.setState({ error }));
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    const { actionCode, email, passwordOne } = this.state;
    const { startPasswordLogin, confirmPasswordReset } = this.props;

    e.preventDefault();
    
    confirmPasswordReset(actionCode, passwordOne)
      .then(() => startPasswordLogin(email, passwordOne))
      .catch(error => this.setState({ error }));
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      email,
      error,
      mode
    } = this.state;
    const { authError } = this.props.auth;

    const isInvalid = passwordOne.length < 6 || passwordOne !== passwordTwo;

    let pageContent;
    if (email) {
      pageContent = (
        <div>
          <p>{ email }</p>
          <form onSubmit={ this.onSubmit }>
            <input
              type='password'
              placeholder='New password'
              name='passwordOne'
              value={ passwordOne }
              onChange={ this.onChange }
            />
            <input
              type='password'
              placeholder='Confirm password'
              name='passwordTwo'
              value={ passwordTwo }
              onChange={ this.onChange }
            />
            <button type='submit' disabled={ isInvalid }>
              Go
            </button>
            { error && (
              <p>
                Oops. { error.message }
              </p>
            )}
            { authError && (
              <p>
                Doh. { authError.message }
              </p>
            )}
          </form>
        </div>
      );
    } else if (!mode) {
      pageContent = (
        <Link to='/'>Return to login page</Link>
      );
    } else {
      pageContent = (
        <div>
          <p>Sorry, that link doesn't seem valid</p>
          <Link to='/'>Return to login page</Link>
        </div>
      );
    }

    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1>Reset your password</h1>
          { pageContent }
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  checkResetPassword: (actionCode) => dispatch(checkResetPassword(actionCode)),
  confirmPasswordReset: (actionCode, email) => dispatch(confirmPasswordReset(actionCode, email)),
  startPasswordLogin: (email, password) => dispatch(startPasswordLogin(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);
