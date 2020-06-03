import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addName } from '../actions/names';

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
    const name = {
      id: uuidv4(),
      name: this.state.newName
    };
    this.props.addName(name);
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
  addName: (name) => dispatch(addName(name))
});

const mapStateToProps = (state) => ({
  names: state.names
})

export default connect(mapStateToProps,mapDispatchToProps)(NameEntry)