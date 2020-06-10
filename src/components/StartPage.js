import React from 'react';
import { connect } from 'react-redux';
import TeamList from './TeamList';
import { startSetPlayer } from '../actions/user';
import { getPlayers } from '../actions/players';
import { getNames } from '../actions/names';
import { setStartTime } from '../actions/game';
import selectPlayer from '../selectors/selectPlayer';
import database from '../firebase/firebase';


export class StartPage extends React.Component {
  state = {
    nextPlayer: undefined,
    nextTeam: undefined,
    allReady: false,
    error: ''
  }
  
  componentDidMount = () => {
    // Check all players are ready
    database.ref(`users`).on('value', snapshot => {
      let allReady = true;
      snapshot.forEach(childSnapshot => {
        const player = childSnapshot.val();
        allReady = player.isReady === false ? false : allReady;
      });
      this.props.getPlayers();
      
      this.setState({allReady});
      
      // Update state with final player list & choose active player
      if(allReady === true) {
        this.props.getPlayers();
        this.choosePlayer();
      }
    })
  }
  
  componentWillUnmount = () => {
    // Unsubscribe from Firebase call
    database.ref('users').off;
  }
  
  // TODO: check at least one person on each team
  // TODO: routing depends on who's playing
  
  choosePlayer = () => {
    const lastTeamPlayed = this.props.game.teamJustPlayed ? this.props.game.teamJustPlayed : undefined;
    const players = this.props.players.players;
    
    // Use selector to return next player or handle error
    const nextPlayer = selectPlayer(lastTeamPlayed, players);
    
    if (nextPlayer) {
      // Set isPlaying flag
      this.props.startSetPlayer(nextPlayer.uid);
      
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
          <p>{`${this.state.nextPlayer} from team ${this.state.nextTeam} will start (unless someone else joins the game).`}</p>
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
        <TeamList team='A' />
        <br />
        <h3>Team B</h3>
        <TeamList team='B' />
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
  startSetPlayer: (id) => dispatch(startSetPlayer(id)),
  getPlayers: () => dispatch(getPlayers()),
  getNames: () => dispatch(getNames()),
  setStartTime: () => dispatch(setStartTime())
});

export default connect(mapStateToProps,mapDispatchToProps)(StartPage);