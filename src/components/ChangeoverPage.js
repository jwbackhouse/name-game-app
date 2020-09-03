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
    nextPlayer: undefined,
  }

  componentDidUpdate = (prevProps) => {
    const { game, history } = this.props;

    if (!prevProps.game.startTurn) {
      game.startTurn && history.push('/guess');
    }
    if (game.endGame) {
      history.push('/end');
    }
  }

  onClick = () => {
    const { startTurn, history } = this.props;
    startTurn();
    history.push('/play');
  }

  render = () => {
    const { game, auth } = this.props;
    const thisUserPlaying = auth.uid === game.playingNow.uid;

    return (
      <div className='content-container'>
        <h1>The scores on the doors</h1>
        <p>
          Team A: {game.teamAScore}
        </p>
        <p>
          Team B: {game.teamBScore}
        </p>
        <StartMessage
          thisUserPlaying={ thisUserPlaying }
          playingNow={ game.playingNow }
          errorMsg=''
          onClick={ this.onClick }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  startTurn: () => dispatch(startTurn()),
  getNames: () => dispatch(getNames()),
});

const connectedWithLiveData = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLiveData,
);

export default connectedWithLiveData(ChangeoverPage);
