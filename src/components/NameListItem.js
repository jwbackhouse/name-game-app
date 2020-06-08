import React from 'react';
import { connect } from 'react-redux';
import { startRemoveName, editName } from '../actions/names';


// TODO add edit button
export const NameListItem = (props) => {
  const onDelete = () => {
    props.startRemoveName(props.id);
  };
  
  return (
    <div>
      <h5>{ props.name}</h5>
      <button
        onClick={ onDelete }
      >
        Delete
      </button>
      <button>
        Edit
      </button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveName: (id) => dispatch(startRemoveName(id))
})

export default connect(undefined, mapDispatchToProps)(NameListItem);