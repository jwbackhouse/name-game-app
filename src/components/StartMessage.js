import React from 'react';

export const StartMessage = ({ thisUserPlaying, playingNow, onClick, errorMsg }) => {
  let messageElement;
  
  // If user is playing next
  if (thisUserPlaying) {
    messageElement = (
      <div>
        <p>You're up!</p>
        <p>Once everyone has joined the game, click the button to start your turn...</p>
        <button className='button button--hero' onClick={ onClick }>
          Let's play
        </button>
      </div>
    )
    
  // If next player has been selected
  } else if (playingNow.uid) {
    messageElement = (
      <div>
        <p>{ `${ playingNow.username } from team ${ playingNow.team } will start.` }</p>
        <p>{ `The game will begin when ${ playingNow.username } presses the button...` }</p>
      </div>
    )
    
  // If choosePlayer returned undefined
  } else if (errorMsg) {
    messageElement = <p>{ errorMsg }</p>
    
  // If not all players marked as 'isReady'
  } else {
    messageElement = <p>Waiting for the other players to finish adding names...</p>
  };
  
  return (
    <div>
      { messageElement }
    </div>
  );
};

export default StartMessage;
