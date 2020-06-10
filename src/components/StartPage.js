import React from 'react';
import { connect } from 'react-redux';
import TeamList from './TeamList';
import { startSetPlayer } from '../actions/user';
import { getPlayers } from '../actions/players';
import { getNames } from '../actions/names';
import choosePlayer from '../selectors/choosePlayer';


export class StartPage extends React.Component {
  state = {
    nextPlayer: undefined,
    nextTeam: undefined
  }
  
  componentDidMount = () => {
    // Get final player list
    this.props.getPlayers()
      .then(() => {
        // Choose next player
        const lastTeamPlayed = this.props.game.teamJustPlayed;
        const players = this.props.players.players;
        const nextPlayer = choosePlayer(lastTeamPlayed, players);
        // Set isPlaying flag
        this.props.startSetPlayer(nextPlayer.uid);
        // Update local state
        this.setState({
          nextPlayer: nextPlayer.userName,
          nextTeam: nextPlayer.team
        });
      })
  }
  
  // TODO: check at least one person on each team
  // TODO: routing depends on who's playing
  
  onClick = () => {
    // Get latest names from Firebase before pushing to GamePage
    this.props.getNames().then(() => {
      this.props.history.push('/play');
    });
  }
  
  
  render() {
    let team
    this.state.nextPlayer && (team = <p>{`${this.state.nextPlayer} from team ${this.state.nextTeam} will start.`}</p>)

    return (
      <div>
        <h1>Ready to go?</h1>
        <h3>Team A</h3>
        <TeamList team='A' />
        <br />
        <h3>Team B</h3>
        <TeamList team='B' />
        <br />
        {team}
        <button onClick={this.onClick}>Let's play</button>
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
  getNames: () => dispatch(getNames())
});

export default connect(mapStateToProps,mapDispatchToProps)(StartPage);