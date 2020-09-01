import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import EndPage from './EndPage';
import { startResetGame, initialiseGame, fetchScores } from '../actions/game';


export class EndPageContainer extends React.Component {
  state = {
    ready: false
  }
  
  componentDidMount() {
    this.props.fetchScores()
      .then(() => this.setState({ ready: true }));
  }
    
  onClick = () => {
    const { initialiseGame, removeAllNames, startResetGame, history } = this.props;
    database.ref().remove()
      .then(() => {
        startResetGame();
        initialiseGame();
        history.push('/');
      });
  }
  
  render = () => {
    const { teamAScore, teamBScore } = this.props.game;
    let message;
    if (teamAScore > teamBScore) {
      message = 'Team A has it!';
    } else if (teamAScore < teamBScore) {
      message = 'Team B has it!';
    } else {
      message = "It's a draw!";
    }
    
    const renderComponent = this.state.ready && (
      <EndPage
          message={ message }
          teamAScore={ teamAScore }
          teamBScore={ teamBScore }
          onClick={ this.onClick }
      />
    )
    
    return <div>{ renderComponent }</div>
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  players: state.players,
});

const mapDispatchToProps = (dispatch) => ({
  fetchScores: () => dispatch(fetchScores()),
  removeAllNames: () => dispatch(removeAllNames()),
  startResetGame: () => dispatch(startResetGame()),
  initialiseGame: () => dispatch(initialiseGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(EndPageContainer);