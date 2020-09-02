import React from 'react';

export class NameEntry extends React.Component {
  state = {
    newName: '',
    error: ''
  };
  
  onChange = (e) => {
    const newName = e.target.value;
    this.setState(() => ({ newName }));
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    const name = this.state.newName.trim();
    if (!name) {
      this.setState({error: 'Please enter a name'})
    } else {
      this.props.onAddName(name);
      this.setState({ newName: '', error: '' });
    }
  };
  
  render() {
    return (
      <form onSubmit={ this.onSubmit } >
        <div className='form__container'>
          <input
            autoFocus
            className='input'
            disabled={ this.props.disabled }
            placeholder='Your name'
            onChange={ this.onChange }
            value={ this.state.newName }
          />
          <button
            className='button__mid-row button--no-margin'
            disabled={ this.props.disabled }
          >Add</button>
        </div>
        { this.state.error && <p>{ this.state.error }</p> }
      </form>
    )
  };
};

export default NameEntry;
