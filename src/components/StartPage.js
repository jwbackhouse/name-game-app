import React from 'react';
import { connect } from 'react-redux';
import TeamList from './TeamList';
import StartMessage from './StartMessage';
import { fetchData, endFetchData, startTurn, setNextPlayer, resetNextPlayer } from '../actions/game';
import selectPlayer from '../selectors/selectPlayer';

  
// TODO: routing depends on who's playing
// TODO: force redirect for guessing users
  
export class StartPage extends React.Component {
  state = {
    error: ''
  }
  
  componentDidMount = () => {
    this.props.fetchData();
    this.choosePlayer(this.props.players.players);
  }
  
  componentDidUpdate = (prevProps) => {
    // Push to game page when player user starts the timer
    if (prevProps.game.startTurn != this.props.game.startTurn) {
      this.props.game.startTurn && this.props.history.push('/guess');
    }

    // Choose new player if player data has changed
    if (prevProps.players.players != this.props.players.players) {
      this.choosePlayer(this.props.players.players);
    }
  }
  
  componentWillUnmount = () => {
    this.props.endFetchData();
  }

  choosePlayer = (players) => {
    // Use selector to choose next player
    const allReady = !players.some(player => player.isReady === false);
    
    if (players.length > 0 && allReady) {
      this.setState({ error: '' });
      
      // Team left as undefined, so defaults to A
      const nextPlayer = selectPlayer(undefined, players);
      
      if (nextPlayer) {
        this.props.setNextPlayer(nextPlayer)
      } else {
        this.setState({ error: 'Waiting for more people to join.' });
        console.log('No one in team A - nextPlayer:', nextPlayer);
      }
    } else if (players.length > 0) {
      this.props.resetNextPlayer();
      this.setState({ error: 'Waiting for other players to choose their names.' });
      console.log('Players length > 0 BUT not all ready')
    } else {
      this.props.resetNextPlayer();
      this.setState({ error: 'Waiting for more people to join.' });
      console.log('Players.length = 0')
    }
  }
  
  onClick = () => {
    // Update Firebase with startGame & startTime
    this.props.startTurn();
    this.props.history.push('/play')
  }
  
  
  render() {
    const thisUserPlaying = this.props.auth.playersUid === this.props.game.playingNow.uid;
    
    return (
      <div className='content-container'>
        <h1>Ready to go?</h1>
        <h3>Team A</h3>
        <TeamList players={ this.props.players } team='A' />
        <br />
        <h3>Team B</h3>
        <TeamList players={ this.props.players } team='B' />
        <br />
        <StartMessage
          thisUserPlaying={ thisUserPlaying }
          playingNow={ this.props.game.playingNow }
          errorMsg={ this.state.error }
          onClick={ this.onClick }
        />
      </div>
    )
  };
};

const mapStateToProps = (state) => ({
  players: state.players,
  auth: state.auth,
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  startTurn: () => dispatch(startTurn()),
  fetchData: () => dispatch(fetchData()),
  endFetchData: () => dispatch(endFetchData()),
  setNextPlayer: (player) => dispatch(setNextPlayer(player)),
  resetNextPlayer: () => dispatch(resetNextPlayer())
});

export default connect(mapStateToProps,mapDispatchToProps)(StartPage);