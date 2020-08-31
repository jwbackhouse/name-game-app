import React from 'react';

export const NamesList = ({ names, onDeleteName }) => {
  if (names.length > 0) {
    return names.map(name =>
      <div key={ name.id } className='list__names'>
        <p className='list__names-item'>{ name.name }</p>
        <button className = 'button button--delete' onClick={ () => onDeleteName(name.id) }>
          x
        </button>
      </div>
    );
  } else {
    return null
  }
};

export default NamesList;
