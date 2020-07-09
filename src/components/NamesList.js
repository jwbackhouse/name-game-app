import React from 'react';

export const NamesList = props => {
  const { names, onDelete } = props;
  
  if (names.length > 0) {
    return names.map(name =>
      <div key={ name.id } className='list-names'>
        <p className='list-names__name'>{ name.name }</p>
        <button className = 'button button--delete' onClick={ () => onDelete(name.id) }>
          x
        </button>
      </div>
    );
  } else {
    return null
  }
};

export default NamesList;