import React from 'react';
import { connect } from 'react-redux';
import NameListItem from './NameListItem';
import NameEntry from './NameEntry';
import { markPlayerReady } from '../actions/players';
import selectUsersNames from '../selectors/selectUsersNames';

// TODO - check for duplicate names
// TODO - import from admin page (also below in JSX)

export const SetupPage = (props) => {
  const remainingNames = () => {
    const namesSubmitted = props.names.length;
    const numberAllowed = 5;
    return numberAllowed - namesSubmitted;
  };
  
  const onClick = () => {
    props.markPlayerReady(props.user.uid);
    props.history.push('/start');
  };
  
  
  let namesList;
  if (props.names.length === 0) {
    namesList = '';
  } else {
    namesList = props.names.map(name => {
      return <NameListItem
        key={ name.id }
        id={name.id}
        name={name.name}
      />
    })
  }
  
  let word;
  if (remainingNames() === 1) {
    word = 'name still'
  } else if (remainingNames() === 5) {
    word = 'names'
  } else {
    word = 'names still'
  };
  
  const goButtonStyle = props.names.length===5 ? {} : {};
  
  return (
    <div className='content-container'>
      <h1>Choose your names</h1>
      <p className='tip'>Friendly tip: It's a good idea to pick names everyone has heard of</p>
      <p className=''>{ `You have ${ remainingNames() } ${ word } to add` }</p>
      
      <div className='row'>
        <NameEntry disabled={ props.names.length === 5 }/>
        <button
          className='button'
          style={ goButtonStyle }
          onClick={onClick}
        >
          Go
        </button>
      </div>
      {namesList}
    </div>
  )
};

const mapStateToProps = (state) => ({
  names: selectUsersNames(state.names, state.user.uid),
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  markPlayerReady: (uid) => dispatch(markPlayerReady(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupPage);