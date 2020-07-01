import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { togglePlayerReady } from '../actions/players';

export const EditNamesButtonBase = props => {
  const onTogglePlayerReady = () => {
    props.togglePlayerReady(props.auth.playersUid);
    props.history.push('/setup');
  };
  
  return (
    <button onClick={ onTogglePlayerReady }>
      Edit your names
    </button>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  togglePlayerReady: uid => dispatch(togglePlayerReady(uid))
})

// withRouter required to access history
const EditNamesButton = withRouter(EditNamesButtonBase);
export default connect(mapStateToProps, mapDispatchToProps)(EditNamesButton);
