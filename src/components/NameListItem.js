import React from 'react';
import { connect } from 'react-redux';


// TODO add edit button
export const NameListItem = (props) => {
  return (
    <div className='list-names'>
      <p className='list-names__name'>{ props.name}</p>
      <button className = 'button button--delete' onClick={ () => props.onDelete(props.id) }>
        x
      </button>
    </div>
  )
}

export default NameListItem;