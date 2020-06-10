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
      this.setState(() => ({newName: ''}));
    }
  };
  
  render() {
    return (
      <div>
        <form
          onSubmit={ this.onSubmit }
        >
          <input
            autoFocus
            disabled={ this.props.disabled }
            placeholder='Enter a name'
            onChange={ this.onNameChange }
            value={ this.state.newName }
          />
          <button>Submit</button>
          { this.state.error && <p>{ this.state.error }</p> }
        </form>
      </div>
    )
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddName: (name) => dispatch(startAddName(name))
});

export default connect(undefined,mapDispatchToProps)(NameEntry)