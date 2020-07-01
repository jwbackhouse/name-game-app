import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import LiveName from './LiveName';
import Countdown from './Countdown';
import { passesAllowed } from '../app';
import selectPlayer from '../selectors/selectPlayer';
import { updateNames } from '../actions/names';
import { startUpdateScore, endTurn, endGame, setNextPlayer } from '../actions/game';


// TODO - is there a better way to deal with repeated code (e.g. index setting)


export class GamePage extends React.Component {
  state = {
    index: undefined,
    names: [],
    passedNames: [],
    guessedNames: [],
    numberPasses: 0,
    viewingPassedNames: false,
    unguessedIndex: undefined
  };
  
  componentDidMount = () => {
    // Generate random index for name choice
    const index = Math.floor(Math.random() * (this.props.names.length - 1));
    this.setState({index});
    
    // Populate local state with unguessed names
    const names = this.props.names;
    this.setState({ names});
  };

  // Handle name being guessed or passed
  nextName = (type) => {
    this.setState(prevState => {
      const index = prevState.index;
      
      if (type === 'guess') {
        const guessedNames = [
          ...prevState.guessedNames,
          prevState.names[index]
        ];
        return { guessedNames };
      } else if (type === 'pass') {
        const passedNames = [
          ...prevState.passedNames,
          prevState.names[index]
        ];
        return { passedNames, numberPasses: prevState.numberPasses + 1 };
      }
    });
    this.removeName('names');
  };
  
  // Remove name from relevant state object + update index
  removeName = (arrayName) => {
    this.setState(prevState => {
      const prevIndex = prevState.index;
      const newArr = prevState[arrayName].filter((name, arrIndex) => arrIndex !== prevIndex);
      const newIndex = Math.floor(Math.random() * (prevState[arrayName].length - 1));
      return {
        [arrayName]: newArr,
        index: newIndex
      };
    });
  };
  
  // Update index to cycle through state.passedNames
  passAgain = () => {
    let index;
    if (this.state.passedNames.length - 1 === this.state.index) {
      index = 0;
    } else {
      index = this.state.index + 1;
    }
    this.setState({ index });
  };
  
  // Add successfully-guessed passed name to state.guessedNames
  guessedAgain = () => {
    this.setState(prevState => {
      const index = prevState.index;
      const guessedNames = [
        ...prevState.guessedNames,
        prevState.passedNames[index]
      ];
      return { guessedNames };
    });
    this.removeName('passedNames');
  };
  
  // Handle button toggling whether to display unguessed or passed names
  toggleViewPassedNames = () => {
    if (this.state.viewingPassedNames) {
      this.setState(prevState => ({
        viewingPassedNames: false,
        unguessedIndex: '',
        index: this.state.unguessedIndex
      }));
    } else {
      this.setState(prevState => ({
        viewingPassedNames: true,
        // Save index of the last unguessed name
        unguessedIndex: prevState.index,
        index: 0
      }));
    }
  };
  
  // Choose next player
  choosePlayer = (players) => {
    const lastTeamPlayed = this.props.game.playingNow.team;
    const nextPlayer = selectPlayer(lastTeamPlayed, players);

    // Check a player is returned
    if (!nextPlayer) {
      this.props.endGame(this.props.auth.playersUid);
    } else {
      return this.props.setNextPlayer(nextPlayer);
    }
  };
  
  // Handle timer expiry or all names being guesses
  onFinished = () => {
    // Await Firebase update
    const promisesArray = [
      this.choosePlayer(this.props.players.players),
      this.props.updateNames(this.state.guessedNames),
      this.props.startUpdateScore(this.props.game.playingNow.team, this.state.guessedNames.length)
    ];
    
    const handleAllPromises = Promise.all(promisesArray);
    
    handleAllPromises
      .then(() => {
        // Check if game has ended
        if (this.state.names.length === 0) {
          this.props.endGame(this.props.auth.playersUid);
          this.props.history.push('/end');
        } else {
          this.props.endTurn(this.props.auth.playersUid);
          this.props.history.push('/scores');
        }
      })
      .catch((err) => console.log('onFinished(): error from promisesArray:', err));
  };
    
  render = () => {
    // Render name for guessing
    let guess;
    const remainingNames = this.state.names.length;
    const passedNames = this.state.passedNames.length;
    const allowPass = (passesAllowed - this.state.numberPasses) > 0;
    
    if (remainingNames > 0 && !this.state.viewingPassedNames) {
      const index = this.state.prevIndex ? this.state.prevIndex : this.state.index;
      guess =
        <LiveName
          index={ index }
          names={ this.state.names }
          pass={ this.nextName }
          guessed={ this.nextName }
          allowPass={ allowPass }
          viewingPassedNames={ false }
        />
    } else if (passedNames > 0 || (passedNames > 0 && this.state.revisitPassed)) {
      guess =
        <LiveName
          index={ this.state.index }
          names={ this.state.passedNames }
          pass={ this.passAgain }
          guessed={ this.guessedAgain }
          allowPass={ true }
          viewingPassedNames={ true }
        />
    } else {
      guess = (
        <div>
          <p>All finished</p>
          <button onClick={this.onFinished}>To the scores</button>
        </div>
      )
    }
    
    // Render button to toggle between unguessed & passed names
    let viewPassedNamesButton;
    if (this.state.passedNames.length > 0 && this.state.names.length > 0) {
      viewPassedNamesButton = (
        <button onClick={ this.toggleViewPassedNames }>
          { this.state.viewingPassedNames ? 'Return to unguessed names' : 'Re-try your passed names' }
        </button>
      );
    }
    
    // Set score
    const score = this.state.guessedNames.length
    
    return (
      <div className='content-container'>
        <div className='timer-block'>
          <Countdown
            onFinished={this.onFinished}
            className='timer-block__timer'
          />
          <div className='scores-block'>
            <p>Score: {score}</p>
            <p>Passed: {passedNames}</p>
          </div>
        </div>
        <div className='word-block'>
          <h4>Your word:</h4>
          <span className='word-block__word'>{guess}</span>
          { viewPassedNamesButton }
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  names: state.names.names.filter(name => name.isGuessed === false),   // Only fetch unguessed names
  game: state.game,
  players: state.players
});

const mapDispatchToProps = (dispatch) => ({
  updateNames: (names) => dispatch(updateNames(names)),
  startUpdateScore: (team, score) => dispatch(startUpdateScore(team, score)),
  endTurn: (uid) => dispatch(endTurn(uid)),
  endGame: (uid) => dispatch(endGame(uid)),
  setNextPlayer: (player) => dispatch(setNextPlayer(player))
});

export default connect (mapStateToProps, mapDispatchToProps)(GamePage);