import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import EndPage from './EndPage';
import { resetGame, initialiseGame, fetchScores } from '../actions/game';
import { removeAllNames } from '../actions/names';


export class EndPage extends React.Component {
  state = {
    ready: false
  }
  
  async componentDidMount() {
    console.log('componentDidMount. state.ready is', this.state.ready);
    await this.props.fetchScores();
    this.setState({ ready: true });
    console.log('fetchScores executed successfully. state.ready is', this.state.ready);
  }
    
  onClick = () => {
    // Clear database & initialise new game
    database.ref().remove()
      .then(() => this.props.initialiseGame());
    // Necessary as db update on Register page doesn't over-write names / all game data
    this.props.removeAllNames();
    this.props.resetGame();
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
    
    const renderComponent = this.state.ready && (
      <EndPage
          message={ message }
          teamAScore={ this.props.game.teamAScore }
          teamBScore={ this.props.game.teamBScore }
          onClick={ this.onClick }
      />
    )
    
    return (
      <span>{ renderComponent }</span>
    )
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
  fetchScores: () => dispatch(fetchScores()),
  removeAllNames: () => dispatch(removeAllNames()),
  resetGame: () => dispatch(resetGame()),
  initialiseGame: () => dispatch(initialiseGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(EndPage);

