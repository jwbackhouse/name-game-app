import React from 'react';
import { connect } from 'react-redux';
import { startRemoveName } from '../actions/names';


// TODO add edit button
export const NameListItem = (props) => {
  const onDelete = () => {
    props.startRemoveName(props.id);
  };
  
  return (
    <div className='list-names'>
      <p className='list-names__name'>{ props.name}</p>
      <button className = 'button button--delete' onClick={ onDelete }>
        x
      </button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveName: (id) => dispatch(startRemoveName(id)),
})

export default connect(undefined, mapDispatchToProps)(NameListItem);