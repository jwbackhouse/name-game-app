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
  
  const word = remainingNames() === 1 ? 'name' : 'names';
  
  let namesList;
  if (props.names.length === 0) {
    namesList = (
      <div>
        <span>Nothing added yet</span>
      </div>
    )
  } else {
    namesList = props.names.map(name => {
      return <NameListItem
        key={ name.id }
        id={name.id}
        name={name.name}
      />
    })
  }
  
  return (
    <div>
      <h1>The Name Game</h1>
      <h3>{ `You have ${ remainingNames() } ${ word } still to add` }</h3>
      
      <NameEntry disabled={ props.names.length === 5 }/>
      
      <button
        disabled={props.names.length !== 5}
        onClick={onClick}
      >
        Go
      </button>
      <div>
        <h4>Your names:</h4>
      </div>
      {namesList}
    </div>
  )
};
        // {props.names.length === 0
        //   ? <div>
        //       <span>Nothing added yet</span>
        //     </div>
        //   : props.names.map((name) => <NameListItem key={ name.id } id={name.id} name={name.name} disabled={ !props.names.length === 5 } />)
        // }

const mapStateToProps = (state) => ({
  names: selectUsersNames(state.names, state.user.uid),
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  markPlayerReady: (uid) => dispatch(markPlayerReady(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupPage);