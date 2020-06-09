import React from 'react';
import { connect } from 'react-redux';
import TeamList from './TeamList';
import { startSetPlayer } from '../actions/user';
import { getPlayers } from '../actions/players';
import { getNames, addName, removeAllNames } from '../actions/names';


export class StartPage extends React.Component {
  state = {
    teamLetter: undefined
  }
  
  componentDidMount() {
    this.props.getPlayers().then(() => this.choosePlayer());
  }
  
  // Choose starting team & player
  choosePlayer = () => {
    const teamLetter = Math.random() < 0.5 ? 'A' : 'B';
    const team = `team${teamLetter}`;
    
    // FOR LIVE
    // const startingTeam = this.props.players.players.filter(player => player.team === teamLetter && !player.hasPlayed);
    // const index = Math.floor(Math.random() * startingTeam.length);
    // const player = startingTeam[index];
    
    // FOR TESTING
    const startingTeam = this.props.players.players.filter(player => player.team === 'A' && !player.hasPlayed);
    const index = startingTeam.length - 1;
    const player = startingTeam[index];
    console.log('Player:', player.userName, 'from team', teamLetter);

    this.props.startSetPlayer(player.uid);
    this.setState({teamLetter});
  }
  
  
  // TODO: check at least one person on each team
  // TODO: can this dispatch go back into actions file, before db call?
  onClick = () => {
    // Get latest names from Firebase then send to GamePage
    this.props.getNames().then(() => {
      this.props.history.push('/play');
    });
  }
  
  
  render() {
    let team
    if (this.state.teamLetter) { team = <p>{`Team ${this.state.teamLetter} will start.`}</p> }

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
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  startSetPlayer: (id) => dispatch(startSetPlayer(id)),
  getPlayers: () => dispatch(getPlayers()),
  getNames: () => dispatch(getNames()),
  addName: (name) => dispatch(addName(name)),
  removeAllNames: () => dispatch(removeAllNames()),
});

export default connect(mapStateToProps,mapDispatchToProps)(StartPage);