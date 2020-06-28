import React from 'react';

export const EndPageRender = (props) => {
  console.log('EndPageRender mounted. message is', props.message, 'teamAScore is', props.teamAScore);
  return (
    <div>
      <h1>{ props.message }</h1>
      <p>Team A scored { props.teamAScore }</p>
      <p>Team B scored { props.teamBScore }</p>
      <button onClick={ props.onClick }>Play again</button>
    </div>
  );
};

export default EndPageRender;