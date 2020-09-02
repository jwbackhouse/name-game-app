import React from 'react';

export const EndPage = (props) => {
  return (
    <div className='content-container'>
      <h1>{ props.message }</h1>
      <p>Team A scored ... <span className='score'>{ props.teamAScore }</span></p>
      <p>Team B scored ... <span className='score'>{ props.teamBScore }</span></p>
      <button className='button' onClick={ props.onClick }>Play again</button>
    </div>
  );
};

export default EndPage;