import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import TeamList from './TeamList';
import { startAddUser } from '../actions/user';
import { getPlayersSuccess } from '../actions/players';

// TODO - add live db call

export class RegisterPage extends React.Component {
  state = {
    userName: '',
    team: 'A',
    teamAPlayers: [],
    teamBPlayers: []
  }
  
  componentDidMount() {
    // Listen for player updaed from Firebase
    console.log('Props players:', this.props.players)
    
    database.ref('users').on('value', snapshot => {
      let players = [];
      snapshot.forEach(childSnapshot => {
        const player = childSnapshot.val();
        players.push({
          uid: childSnapshot.key,
          ...player
        });
      });
      console.log('Players from db:', players)
      // Log changes to state.players
      this.props.getPlayersSuccess(players);
    })
  }
  
  onTextChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({userName}))
  }
  
  onSelectChange = (e) => {
    const team = e.target.value
    this.setState(() => ({team}))
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      userName: this.state.userName,
      team: this.state.team
    };
    this.props.startAddUser(user);
    this.setState(() => ({
      userName: '',
      team: 'A'
    }));
    this.props.history.push('/setup');
  }
  
  render() {
    return (
      <div>
        <h1>The Name Game</h1>
        <h2>Registration</h2>
        <form onSubmit={ this.onSubmit }>
          <input
            autoFocus
            placeholder='Name'
            onChange={ this.onTextChange }
            value={ this.state.userName }
          />
          <select
            onChange={ this.onSelectChange }
            value={ this.state.team }
          >
            <option value='A'>Team A</option>
            <option value='B'>Team B</option>
          </select>
          <div>
            <p>Already on Team A:</p>
            <TeamList players={this.props.players} team='A' />
            <p>Already on Team B:</p>
            <TeamList players={this.props.players} team='B' />
          </div>
          <br />
          <button>Go</button>
        </form>
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => ({
  startAddUser: (user) => dispatch(startAddUser(user)),
  getPlayersSuccess: (players) => dispatch(getPlayersSuccess(players)),
});

const mapStateToProps = (state) => ({
  players: state.players
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);