import React from 'react';
import { connect } from 'react-redux';
import NameListItem from './NameListItem';
import NameEntry from './NameEntry';
import { startSetPlayer } from '../actions/user';

export class SetupPage extends React.Component {
  remainingNames = () => {
    const namesSubmitted = this.props.names.length;
    const numberAllowed = 5;   // TODO - import from admin page (also below in JSX)
    return numberAllowed - namesSubmitted;
  }
  
  onClick = () => {   // TODO add check that 5 names have been submitted
    this.props.history.push('/start');
  }
  
  render() {
    const remainingNames = this.remainingNames();
    return (
      <div>
        <h1>The Name Game</h1>
        <h3>{ `You have ${ remainingNames } names still to add` }</h3>
        
        <NameEntry />
        
        <button
          disabled={this.props.names.length !== 5}
          onClick={this.onClick}
        >
          Go
        </button>
        
        <div>
          <h4>Your names:</h4>
          { this.props.names.length === 0
            ? <div>
                <span>Nothing added yet</span>
              </div>
            : this.props.names.map((name) => <NameListItem key={ name.id } id={name.id} name={name.name} />)
          }
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => ({
  names: state.names
});

const mapDispatchToProps = (dispatch) => ({
  startSetPlayer: (id) => dispatch(startSetPlayer(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupPage);