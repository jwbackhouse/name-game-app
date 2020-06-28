import React from 'react';

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
    console.log('state before:', this.state, 'Name:', name)
    console.log(this.props);
    if (!name) {
      this.setState({error: 'Please enter a name'})
    } else {
      this.props.onAddName(name);
      this.setState({ newName: '', error: '' });
    }
    console.log('state after', this.state);
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

export default NameEntry;