import React from 'react';

export const StartMessage = props => {
  let messageElement;
  
  // If user is playing next
  if (props.thisUserPlaying) {
    messageElement = (
      <div>
        <p>You're up!</p>
        <p>Once everyone has joined the game, click the button to start your turn...</p>
        <button onClick={props.onClick}>Let's play</button>
      </div>
    )
    
  // If next player has been selected
  } else if (props.playingNow.uid) {
    messageElement = (
      <div>
        <p>{`${ props.playingNow.username } from team ${ props.playingNow.team } will start.`}</p>
        <p>{`The game will begin when ${ props.playingNow.username } presses the button...`}</p>
      </div>
    )
    
  // If choosePlayer returned undefined
  } else if (props.errorMsg) {
    messageElement = <p>{props.errorMsg}</p>
    
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