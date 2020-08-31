import React from 'react';
import { connect } from 'react-redux';
import SetupPageIntro from './SetupPageIntro';
import NameEntry from './NameEntry';
import NamesList from './NamesList';
import { togglePlayerReady } from '../actions/players';
import { startRemoveName, startAddName } from '../actions/names';
import selectUsersNames from '../selectors/selectUsersNames';

// TODO - check for duplicate names

export const SetupPageContainer = (props) => {
  const {
    names,
    auth,
    game,
    history,
    togglePlayerReady,
    startRemoveName,
    startAddName
  } = props;
  
  const numberNames = game.numNames;
  
  const remainingNames = () => {
    const namesSubmitted = names.length;
    return numberNames - namesSubmitted;
  };
  
  const onClick = () => {
    togglePlayerReady(auth.firebaseUID);
    history.push('/start');
  };

  const onDeleteName = (id) => startRemoveName(id);
  
  const onAddName = (name) => startAddName(name);
  
  let word;
  if (remainingNames() === 1) {
    word = 'name still';
  } else if (remainingNames() === numberNames) {
    word = 'names';
  } else {
    word = 'names still';
  };
  
  return (
    <div className='content-container'>
      <SetupPageIntro
        remainingNames={ remainingNames() }
        word={ word }
      />
      <div className='form__holder'>
        <NameEntry
          onAddName={ onAddName }
          disabled={ names.length === numberNames }
        />
        { names.length === numberNames && <button className='button' onClick={ onClick }>Go</button> }
      </div>
      <NamesList
        names={ names }
        onDeleteName={ onDeleteName }
      />
    </div>
  )
};

const mapStateToProps = (state) => ({
  names: selectUsersNames(state.names.names, state.auth.firebaseUID),
  auth: state.auth,
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  togglePlayerReady: (uid) => dispatch(togglePlayerReady(uid)),
  startRemoveName: (id) => dispatch(startRemoveName(id)),
  startAddName: (name) => dispatch(startAddName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupPageContainer);
