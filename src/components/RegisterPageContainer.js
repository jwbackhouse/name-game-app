import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RegisterPage from './RegisterPage';
import withLiveData from '../helpers/withLiveData';
import { updateDisplayName, startAddUserDetails } from '../actions/auth';


export class RegisterPageContainer extends React.Component {
  state = {
    username: this.props.auth.username || '',
    team: 'A',
    error: ''
  }
  
  componentDidUpdate = (prevProps) => {
    // Needed to force username to be rendered in name input
    prevProps.auth.username !== this.props.auth.username && this.setState({ username: this.props.auth.username });
  }
  
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = (e) => {
    e.preventDefault();
  
    const { username, team } = this.state;
    
    // Check a name has been entered
    if (!username) {
      this.setState({ error: '^^Please enter your name' });
    } else {
      const user = {
        username,
        team
      };
      // Add game-specific details to state.user and push to Firebase>Players
      this.props.startAddUserDetails(user);
      
      // Update displayName in firebase.authUser if it doesn't match
      this.props.auth.username !== username && this.props.updateDisplayName(username);
      
      this.props.history.push('/setup');
    }
  }
  
  render() {
    const { error, username, team } = this.state;
    const { players } = this.props;
    return (
      <RegisterPage
        error={ error }
        username={ username }
        team={ team }
        players={ players }
        onSubmit={ this.onSubmit }
        onChange={ this.onChange }
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddUserDetails: (user) => dispatch(startAddUserDetails(user)),
  updateDisplayName: (displayName) => dispatch(updateDisplayName(displayName))
});

const mapStateToProps = (state) => ({
  auth: state.auth
})

const connectedWithLiveData = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLiveData
);

export default connectedWithLiveData(RegisterPageContainer);

// NB alternative syntax for the above 5 lines:
// export default withLiveData(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));