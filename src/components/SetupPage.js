import React from 'react';
import { connect } from 'react-redux';
import NameListItem from './NameListItem';
import NameEntry from './NameEntry';
import { addName } from '../actions/names';

export const SetupPage = (props) => {
  return (
    <div>
      <h1>The Name Game</h1>
      <NameEntry />
      <div>
        <h4>Your names:</h4>
        { props.names.length === 0
          ? <div>
              <span>Nothing added yet</span>
            </div>
          : props.names.map((name) => {
              return <NameListItem key = { name.id } { ...name }/>
            })
        }
      </div>
      <button>Go</button>
    </div>
  )
};

const mapStateToProps = (state) => ({
  names: state.names
});

const mapDispatchToProps = (dispatch) => ({
  addName: (name) => dispatch(addName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupPage);