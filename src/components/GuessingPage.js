import React from 'react';
import { connect } from 'react-redux';
import Countdown from './Countdown';
import { fetchEndGame, endFetchEndGame } from '../actions/game';


export class GuessingPage extends React.Component {
  componentDidMount = () => {
    this.props.fetchEndGame();
  }
  
  componentDidUpdate = (prevProps) => {
    if (this.props.game.endGame) this.props.history.push('/end');
  }
  
  componentWillUnmount = () => {
    this.props.endFetchEndGame;
  }

  onFinished = () => {
    this.props.history.push('/scores');
  };
  
  render = () => {
    return (
      <div className='content-container'>
        <h1>Guessing time</h1>
        <div className='timer-block--solo'>
          <Countdown onFinished={ this.onFinished } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game
})

const mapDispatchToProps = (dispatch) => ({
  fetchEndGame: () => dispatch(fetchEndGame()),
  endFetchEndGame: () => dispatch(endFetchEndGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(GuessingPage);
