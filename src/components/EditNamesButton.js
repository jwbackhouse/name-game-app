import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { togglePlayerReady } from '../actions/players';

export const EditNamesButtonBase = props => {
  const onTogglePlayerReady = () => {
    props.togglePlayerReady(props.auth.uid, props.auth.firebaseUID);
    props.history.push('/setup');
  };
  
  return (
    <button className='button button--background' onClick={ onTogglePlayerReady }>
      Edit your names
    </button>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  togglePlayerReady: (uid, playersUid) => dispatch(togglePlayerReady(uid, playersUid)),
})

// withRouter required to access history
const EditNamesButton = withRouter(EditNamesButtonBase);
export default connect(mapStateToProps, mapDispatchToProps)(EditNamesButton);
