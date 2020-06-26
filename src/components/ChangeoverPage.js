import React from 'react';
import { connect } from 'react-redux';
import StartMessage from './StartMessage';
import { fetchData, endFetchData, startTurn } from '../actions/game';
import { getNames } from '../actions/names';
import selectPlayer from '../selectors/selectPlayer';



export class ChangeoverPage extends React.Component {
  state = {
    error: '',
    nextPlayer: undefined
  }
  
  componentDidMount = () => {
    this.props.fetchData();
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
  
  componentWillUnmount = () => {
    this.props.endFetchData();
  }

  onClick = () => {
    // Update Firebase with startGame & startTime
    this.props.startTurn();
    this.props.history.push('/play')
  }
  
  render = () => {
    // Check if this user is playing next
    const thisUserPlaying = this.props.user.uid === this.props.game.playingNow.uid;

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
  players: state.players,
  game: state.game,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  startTurn: () => dispatch(startTurn()),
  fetchData: () => dispatch(fetchData()),
  getNames: () => dispatch(getNames()),
  endFetchData: () => dispatch(endFetchData())
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangeoverPage);

