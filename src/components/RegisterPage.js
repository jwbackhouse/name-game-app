import React from 'react';
import { connect } from 'react-redux';
import TeamList from './TeamList';
import { startAddUser } from '../actions/user';
import { getPlayers } from '../actions/players';

// TODO - add live db call

export class RegisterPage extends React.Component {
  state = {
    userName: '',
    team: 'A',
    players: []
  }
  
  componentDidMount() {
    this.props.getPlayers()
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
            <TeamList team='A' />
            <br />
            <p>Already on Team B:</p>
            <TeamList team='B' />
          </div>
          <button>Go</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  players: state.players
});

const mapDispatchToProps = (dispatch) => ({
  startAddUser: (user) => dispatch(startAddUser(user)),
  getPlayers: () => dispatch(getPlayers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);