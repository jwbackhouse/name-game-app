import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import { startSetActivePlayer } from '../actions/user';
import { getNames } from '../actions/names';
import { setStartTime, updateLocalScore } from '../actions/game';
import { getPlayers } from '../actions/players';
import selectPlayer from '../selectors/selectPlayer';



export class ChangeoverPage extends React.Component {
  state = {
    nextPlayer: undefined,
    nextTeam: undefined,
    teamAScore: '...',
    teamBScore: '...'
  }
  
  componentDidMount = () => {
    // Listen for score update from Firebase
    database.ref('game/scores').on('value', snapshot => {
      const scores = snapshot.val();
      // Default to zero if not present
      const teamAScore = scores.A ? scores.A : 0;
      const teamBScore = scores.B ? scores.B : 0;
      // Update state.game
      this.props.updateLocalScore(teamAScore, teamBScore);
      // this.setState({
      //   teamAScore,
      //   teamBScore
      // });
    });
    this.props.getPlayers()
      .then(() => this.choosePlayer());
  }
  
  componentWillUnmount = () => {
    // Unsubscribe from Firebase call
    database.ref('game/scores').off();
  }
  
  choosePlayer = () => {
    // Use selector to return next player
    const lastTeamPlayed = this.props.game.playingTeam;
    const players = this.props.players.players;
    const nextPlayer = selectPlayer(lastTeamPlayed, players);
    console.log('Changeover Page: Last team played:', lastTeamPlayed);
    console.log('Changeover Page: nextPlayer:', nextPlayer);
    
    if (nextPlayer) {
      // Set isPlaying flag
      this.props.startSetActivePlayer(nextPlayer.uid, nextPlayer.team);
      // Update local state
      this.setState({
        nextPlayer: nextPlayer.userName,
        nextTeam: nextPlayer.team
      });
    } else {
      // Game over
      this.setState({ error: "GAME OVER..." });
      setTimeout(() => this.props.history.push('/end'), 0);
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
  
  render = () => {
    let team;
    this.state.nextPlayer && (team = <p>{`${this.state.nextPlayer} from team ${this.state.nextTeam} is up next.`}</p>);
    
    return (
      <div>
        <h1>The scores on the doors</h1>
        <p>Team A: {this.props.game.teamAScore}</p>
        <p>Team B: {this.props.game.teamBScore}</p>
        {team}
        <button onClick={this.onClick}>Go</button>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => ({
  game: state.game,
  players: state.players,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  getNames: () => dispatch(getNames()),
  getPlayers: () => dispatch(getPlayers()),
  startSetActivePlayer: (uid, team) => dispatch(startSetActivePlayer(uid, team)),
  updateLocalScore: (teamAScore, teamBScore) => dispatch(updateLocalScore(teamAScore, teamBScore)),
  setStartTime: () => dispatch(setStartTime())
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangeoverPage);

