import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const initialState = {
}
  

export class PasswordResetFormBase extends React.Component {
  state = { ...initialState };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
  }
  
  render() {
    return ()
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});


const mapDispatchToProps = (dispatch) => ({
});

// withRouter required to access history
const PasswordResetForm = withRouter(PasswordResetFormBase);
export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);