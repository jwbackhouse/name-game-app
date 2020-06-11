import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';


export const EndPage = (props) => {

  const onClick = () => {
    database.ref().remove();
    props.history.push('/');
  }
  
  let message;
  if (props.game.teamAScore > props.game.teamBScore) {
    message = 'Team A has it!'
  } else if (props.game.teamBScore > props.game.teamAScore) {
    message = 'Team B has it!'
  } else {
    message = "It's a draw!"
  }
    
  return (
    <div>
      <h1>{ message }</h1>
      <p>Team A scored {props.game.teamAScore}</p>
      <p>Team B scored {props.game.teamBScore}</p>
      <button onClick={onClick}>Play again</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(EndPage);

