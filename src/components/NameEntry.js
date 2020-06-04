import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { startAddName } from '../actions/names';

export class NameEntry extends React.Component {
  state = {
    newName: ''
  };
  
  onNameChange = (e) => {
    const newName = e.target.value;
    this.setState(() => ({ newName }));
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    const newNameTrimmed = this.state.newName.trim()
    this.props.startAddName(newNameTrimmed);
    this.setState(() => ({newName: ''}));
  };
  
  render() {
    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <input
            autoFocus
            placeholder='Enter a name'
            onChange={ this.onNameChange }
            value={ this.state.newName }
          />
          <button>Submit</button>
        </form>
      </div>
    )
  };
};


const mapDispatchToProps = (dispatch) => ({
  startAddName: (name) => dispatch(startAddName(name))
});

export default connect(undefined,mapDispatchToProps)(NameEntry)