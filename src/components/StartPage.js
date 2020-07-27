import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TeamList from './TeamList';
import StartMessage from './StartMessage';
import EditNamesButton from './EditNamesButton';
import withLiveData from '../helpers/withLiveData';
import { startTurn, setNextPlayer, resetNextPlayer } from '../actions/game';
import selectPlayer from '../selectors/selectPlayer';


export class StartPage extends React.Component {
  state = {
    error: '',
  }

  componentDidMount() {
    this.choosePlayer(this.props.players.players);
  }

  componentDidUpdate = (prevProps) => {
    const { game, players, history } = this.props;
    
    // Push to game page when the 'playing user' starts the timer
    if (prevProps.game.startTurn !== game.startTurn) {
      if (game.startTurn) history.push('/guess');
    }

    // Choose new player if player data has changed
    if (prevProps.players.players !== players.players) {
      this.choosePlayer(players.players);
    }
  }

  choosePlayer = (players) => {
    const { setNextPlayer, resetNextPlayer } = this.props;
    // Use selector to choose next player
    const allReady = !players.some(player => player.isReady === false);

    if (players.length > 0 && allReady) {
      this.setState({ error: '' });

      // Team left as undefined, so defaults to A
      const nextPlayer = selectPlayer(undefined, players);

      if (nextPlayer) {
        setNextPlayer(nextPlayer);
      } else {
        this.setState({ error: 'Waiting for more people to join.' });
      }
    } else if (players.length > 0) {
      resetNextPlayer();
      this.setState({ error: 'Waiting for other players to choose their names.' });
    } else {
      resetNextPlayer();
      this.setState({ error: 'Waiting for more people to join.' });
    }
  }

  onClick = () => {
    const { startTurn, history } = this.props;
    // Update Firebase with startGame & startTime
    startTurn();
    history.push('/play');
  }

  render() {
    const { players, game, auth } = this.props;
    const { error } = this.state;
    const thisUserPlaying = auth.playersUid === game.playingNow.uid;

    return (
      <div className='content-container'>
        <h1>Ready to go?</h1>
        <EditNamesButton />
        <h3>Team A</h3>
        <TeamList players={ players } team='A' />
        <br />
        <h3>Team B</h3>
        <TeamList players={ players } team='B' />
        <br />
        <StartMessage
          thisUserPlaying={ thisUserPlaying }
          playingNow={ game.playingNow }
          errorMsg={ error }
          onClick={ this.onClick }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  players: state.players,
  auth: state.auth,
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  startTurn: () => dispatch(startTurn()),
  setNextPlayer: (player) => dispatch(setNextPlayer(player)),
  resetNextPlayer: () => dispatch(resetNextPlayer()),
});

const connectedWithLiveData = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLiveData,
);

export default connectedWithLiveData(StartPage);
