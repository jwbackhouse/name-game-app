import React from 'react';
import { connect } from 'react-redux';


export const EndPage = (props) => {

  const onClick = () => {
    props.history.push('/setup');
  }
  
  const winningTeam = props.game.teamAScore > props.game.teamBScore ? 'A' : 'B';
    
  return (
    <div>
      <h1>{`Team ${winningTeam} has it!`}</h1>
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

