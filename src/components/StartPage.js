import React from 'react';
import { connect } from 'react-redux';
import TeamList from './TeamList';
import { startSetActivePlayer } from '../actions/user';
import { getPlayersSuccess } from '../actions/players';
import { getNames } from '../actions/names';
import { setStartTime } from '../actions/game';
import selectPlayer from '../selectors/selectPlayer';
import database from '../firebase/firebase';

  
// TODO: routing depends on who's playing
// TODO: force redirect for guessing users
  
export class StartPage extends React.Component {
  state = {
    nextPlayer: undefined,
    nextTeam: undefined,
    error: ''
  }
  
  componentDidMount = () => {
    // Check all players are ready before choosing next player
    database.ref(`users`).on('value', snapshot => {
      let allReady = true;
      let players = [];
      snapshot.forEach(childSnapshot => {
        const player = childSnapshot.val();
        allReady = player.isReady === false ? false : allReady;
        players.push({
          uid: childSnapshot.key,
          ...player
        });
      });
      if (allReady) {
        this.choosePlayer(players);
        this.props.getPlayersSuccess(players);
      }
    })
  }
  
  componentWillUnmount = () => {
    // Unsubscribe from Firebase call
    database.ref('users').off();
  }

  choosePlayer = (players) => {
    // Use selector to choose next player
    const lastTeamPlayed = this.props.game.teamJustPlayed;
    const nextPlayer = selectPlayer(lastTeamPlayed, players);

    if (nextPlayer) {
      // Set isPlaying flag
      this.props.startSetActivePlayer(nextPlayer.uid, nextPlayer.team);
      // Update local state
      this.setState({
        nextPlayer: nextPlayer.userName,
        nextTeam: nextPlayer.team
      });
    } else {
      // Render message because one team currently empty
      this.setState({ error: 'Waiting for more people to join.' });
    }
  }
  
  onClick = () => {
    // Get latest names from Firebase before starting game
    this.props.getNames().then(() => {
      if (this.props.user.isPlaying) {
        this.props.history.push('/play');
        this.props.setStartTime();
      } else {
        this.props.history.push('/guess');
      }
    });
  }
  
  
  render() {
    // Populate element containing next player message
    let playElement
    if(this.state.nextPlayer) {
      playElement = (
        <div>
          <p>{`${this.state.nextPlayer} from team ${this.state.nextTeam} will start.`}</p>
          <p>Once everyone is here, click the button...</p>
          <button onClick={this.onClick}>Let's play</button>
        </div>
      )
    } else if (this.state.error) {
      playElement = <p>{this.state.error}</p>
    } else {
      playElement = <p>Waiting for the other players to submit their names...</p>
    }

    return (
      <div>
        <h1>Ready to go?</h1>
        <h3>Team A</h3>
        <TeamList players={this.props.players} team='A' />
        <br />
        <h3>Team B</h3>
        <TeamList players={this.props.players} team='B' />
        <br />
        { playElement }
      </div>
    )
  };
};

const mapStateToProps = (state) => ({
  players: state.players,
  user: state.user,
  game: state.game
});

const mapDispatchToProps = (dispatch) => ({
  startSetActivePlayer: (uid, team) => dispatch(startSetActivePlayer(uid, team)),
  getPlayersSuccess: (players) => dispatch(getPlayersSuccess(players)),
  getNames: () => dispatch(getNames()),
  setStartTime: () => dispatch(setStartTime())
});

export default connect(mapStateToProps,mapDispatchToProps)(StartPage);