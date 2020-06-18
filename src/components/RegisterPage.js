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
    teamBPlayers: [],
    error: ''
  }
  
  componentDidMount() {
    // Listen for player updaed from Firebase
    database.ref('users').on('value', snapshot => {
      let players = [];
      snapshot.forEach(childSnapshot => {
        const player = childSnapshot.val();
        players.push({
          uid: childSnapshot.key,
          ...player
        });
      });
      // Log changes to state.players
      this.props.getPlayersSuccess(players);
    })
  }
  
  onTextChange = (e) => {
    const userName = e.target.value;
    this.setState({userName})
  }
  
  onSelectChange = (e) => {
    const team = e.target.value
    this.setState(() => ({team}))
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    // Check a name has been entered
    if (!this.state.userName) {
      this.setState({error: '^^Please enter your name'})
    } else {
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
  }
  
  render() {
    const errorMsg = this.state.error && <p className='error'>{this.state.error}</p>
    return (
      <div className='content-container'>
        <h1>Sign up here</h1>
        <form onSubmit={ this.onSubmit }>
          <input
            autoFocus
            className='text-input'
            placeholder='Name'
            onChange={ this.onTextChange }
            value={ this.state.userName }
          />
          <select
            className='select'
            onChange={ this.onSelectChange }
            value={ this.state.team }
          >
            <option value='A'>Team A</option>
            <option value='B'>Team B</option>
          </select>
          <button className='button button--input'>Go</button>
          { errorMsg }
          <div>
            <p className='list-header'>Already on Team A:</p>
            <TeamList players={this.props.players} team='A' />
            <p className='list-header'>Already on Team B:</p>
            <TeamList players={this.props.players} team='B' />
          </div>
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