import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import { fetchData } from '../actions/game';
import { removeAllNames } from '../actions/names';


export class EndPage extends React.Component {
  componentDidMount = () => {
    this.props.fetchData();
  }
    
  onClick = () => {
    // Clear database
    database.ref().remove();
    // Necessary as db update on Register page doesn't over-write names
    this.props.removeAllNames();
    this.props.history.push('/');
  }
  
  render = () => {
    let message;
    if (this.props.game.teamAScore > this.props.game.teamBScore) {
      message = 'Team A has it!';
    } else if (this.props.game.teamBScore > this.props.game.teamAScore) {
      message = 'Team B has it!';
    } else {
      message = "It's a draw!";
    }
    
    return (
      <div className='content-container'>
        <h1>{ message }</h1>
        <p>Team A scored { this.props.game.teamAScore }</p>
        <p>Team B scored { this.props.game.teamBScore }</p>
        <button onClick={ this.onClick }>Play again</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
  removeAllNames: () => dispatch(removeAllNames())
});

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);

