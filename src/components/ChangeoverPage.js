import React from 'react';
import { connect } from 'react-redux';
import { startSetPlayer } from '../actions/user';
import { getNames } from '../actions/names';
import selectPlayer from '../selectors/selectPlayer';



export class ChangeoverPage extends React.Component {
  state = {
    nextPlayer: undefined,
    nextTeam: undefined
  }
  
  componentDidMount = () => {
    this.choosePlayer();
  }
  
  choosePlayer = () => {
    const lastTeamPlayed = this.props.game.teamJustPlayed;
    const players = this.props.players.players;
    
    // Use selector to return next player
    const nextPlayer = selectPlayer(lastTeamPlayed, players);
    
    // Set isPlaying flag
    this.props.startSetPlayer(nextPlayer.uid);
    
    // Update local state
    this.setState({
      nextPlayer: nextPlayer.userName,
      nextTeam: nextPlayer.team
    });
  }

  onClick = () => {
    // Get latest names from Firebase then push to GamePage
    this.props.getNames().then(() => {
      this.props.history.push('/play');
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
  players: state.players
});

const mapDispatchToProps = (dispatch) => ({
  startSetPlayer: (id) => dispatch(startSetPlayer(id)),
  getNames: () => dispatch(getNames())
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangeoverPage);

