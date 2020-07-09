import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import StartMessage from './StartMessage';
import withLiveData from '../helpers/withLiveData';
import { startTurn } from '../actions/game';
import { getNames } from '../actions/names';


export class ChangeoverPage extends React.Component {
  state = {
    error: '',
    nextPlayer: undefined
  }
  
  componentDidMount = () => {
    this.props.getNames();
  }
  
  componentDidUpdate = (prevProps) => {
    if (!prevProps.game.startTurn) {
      this.props.game.startTurn && this.props.history.push('/guess');
    }
    if (this.props.game.endGame) {
      this.props.history.push('/end')
    }
  }

  onClick = () => {
    // Update Firebase with startGame & startTime
    this.props.startTurn();
    this.props.history.push('/play')
  }
  
  render = () => {
    // Check if this user is playing next
    const thisUserPlaying = this.props.auth.playersUid === this.props.game.playingNow.uid;

    return (
      <div className='content-container'>
        <h1>The scores on the doors</h1>
        <p>Team A: {this.props.game.teamAScore}</p>
        <p>Team B: {this.props.game.teamBScore}</p>
        <StartMessage
          thisUserPlaying={ thisUserPlaying }
          playingNow={ this.props.game.playingNow }
          errorMsg={ '' }
          onClick={ this.onClick }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  startTurn: () => dispatch(startTurn()),
  getNames: () => dispatch(getNames())
});

const connectedWithLiveData = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLiveData,
);

export default connectedWithLiveData(ChangeoverPage);
