import React from 'react';
import { connect } from 'react-redux';
import { startAddUser } from '../actions/users';


export class RegisterPage extends React.Component {
  state = {
    userName: '',
    team: 'A'
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
          <button>Go</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddUser: (user) => dispatch(startAddUser(user))
});

export default connect(undefined, mapDispatchToProps)(RegisterPage);