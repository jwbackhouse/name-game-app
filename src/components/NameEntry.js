import React from 'react';
import { connect } from 'react-redux';
import { startAddName } from '../actions/names';

export class NameEntry extends React.Component {
  state = {
    newName: '',
    error: ''
  };
  
  onNameChange = (e) => {
    const newName = e.target.value;
    this.setState(() => ({ newName }));
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    
    const name = this.state.newName.trim();
    if (!name) {
      this.setState({error: 'Please enter a name'})
    } else {
      this.props.startAddName(name);
      this.setState({ newName: '', error: '' });
    }
  };
  
  render() {
    return (
      <form
        onSubmit={ this.onSubmit }
      >
        <input
          autoFocus
          className='text-input'
          disabled={ this.props.disabled }
          placeholder='Your name'
          onChange={ this.onNameChange }
          value={ this.state.newName }
        />
        <button
          className='button button--input'
          disabled={ this.props.disabled }
        >Add</button>
        { this.state.error && <p>{ this.state.error }</p> }
      </form>
    )
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddName: (name) => dispatch(startAddName(name))
});

export default connect(undefined,mapDispatchToProps)(NameEntry)