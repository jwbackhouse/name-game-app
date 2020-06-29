import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import TeamList from './TeamList';
import { startAddUser } from '../actions/user';
import { fetchData, endFetchData } from '../actions/game';
import { updateDisplayName } from '../actions/auth';

// TODO - add live db call

export class RegisterPage extends React.Component {
  state = {
    username: this.props.auth.username || '',
    team: 'A',
    error: ''
  }
  
  componentDidMount = () => {
    this.props.fetchData();
  }
  
  componentDidUpdate = (prevProps) => {
    // Needed to force username to be rendered in name input
    prevProps.auth.username !== this.props.auth.username && this.setState({ username: this.props.auth.username });
  }
  
  componentWillUnmount = () => {
    this.props.endFetchData();
  }
  
  onTextChange = (e) => {
    const username = e.target.value;
    this.setState({username})
  }
  
  onSelectChange = (e) => {
    const team = e.target.value
    this.setState(() => ({team}))
  }
  
  onSubmit = (e) => {
    e.preventDefault();
  
    const {username, team} = this.state;
    
    // Check a name has been entered
    if (!username) {
      this.setState({error: '^^Please enter your name'});
    } else {
      const user = {
        username,
        team
      };
      this.props.startAddUser(user);
      
      // Update displayName in firebase.authUser if it doesn't match
      this.props.auth.username !== username && this.props.updateDisplayName(username);
      
      this.props.history.push('/setup');
    }
  }
  
  render() {
    console.log(this.props.auth.username);
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
            value={ this.state.username }
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
  fetchData: () => dispatch(fetchData()),
  endFetchData: () => dispatch(endFetchData()),
  updateDisplayName: (displayName) => dispatch(updateDisplayName(displayName))
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  players: state.players
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);