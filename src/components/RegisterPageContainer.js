import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RegisterPage from './RegisterPage';
import withLiveData from '../helpers/withLiveData';
import { updateDisplayName, startAddUserDetails } from '../actions/auth';


export const RegisterPageContainer = (props) => {
  const {
    players,
    auth,
    updateDisplayName,
    startAddUserDetails,
    history,
  } = props;
  
  const [username, setUsername] = useState(auth.username || '');
  const [team, setTeam] = useState('A');
  const [error, setError] = useState('');

  // useEffect(() => setUsername(props.auth.username), [props.auth.username]);
  
  const onNameChange = (e) => setUsername(e.target.value);
  const onTeamChange = (e) => setTeam(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setError('^^Please enter your name');
    } else {
      const user = {
        username,
        team,
        uid: auth.uid,
      };
      startAddUserDetails(user);
      
      // Update displayName in firebase.authUser if it doesn't match
      if (auth.username !== username) updateDisplayName(username);
      
      history.push('/setup');
    }
  };

  return (
    <RegisterPage
      error={ error }
      username={ username }
      team={ team }
      players={ players }
      onSubmit={ onSubmit }
      onNameChange={ onNameChange }
      onTeamChange={ onTeamChange }
    />
  );
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
