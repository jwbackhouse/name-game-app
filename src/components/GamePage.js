import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import LiveName from './LiveName';
import Countdown from './Countdown';
import selectPlayer from '../selectors/selectPlayer';
import { updateNames } from '../actions/names';
import { startUpdateScore, endTurn, endGame, setNextPlayer } from '../actions/game';


// TODO - is there a better way to deal with repeated code (e.g. index setting)


export class GamePage extends React.Component {
  state = {
    index: undefined,
    names: [],
    passedNames: [],
    guessedNames: []
  };
  
  componentDidMount = () => {
    // Generate random index for name choice
    const index = Math.floor(Math.random() * (this.props.names.length - 1));    // BODGE - will not return array length to avoid error when array is shortened and {guess} renders below
    this.setState({index});
    
    // Populate local state with unguessed names
    const names = this.props.names;
    this.setState({ names});
  };
  
  // Remove name from relevant state object + update index
  removeName = (arr) => {
    this.setState(prevState => {
      const index = prevState.index;
      const newArr = prevState[arr].filter((name, arrIndex) => arrIndex !== index);
      const newIndex = Math.floor(Math.random() * (prevState.names.length - 1));    // update index based on new array length
      if (arr === 'names') {
        return {
          names: newArr,
          index: newIndex
        }
      } else {
        return {
          passedNames: newArr,
          index:newIndex
        };
      }
    });
  };
  
  pass = () => {
    // Add passed name to state.passedNames
    this.setState(prevState => {
      const index = prevState.index;
      const passedNames = [
        ...prevState.passedNames,
        prevState.names[index]
      ];
      return {passedNames};
    });
    
    // Remove name from state.name
    this.removeName('names');
  };

  guessed = () => {
    // Add guessed name to state.guessedNames
    this.setState(prevState => {
      const index = prevState.index;
      const guessedNames = [
        ...prevState.guessedNames,
        prevState.names[index]
      ];
      return {guessedNames};
    });
    
    // Remove name from state.names
    this.removeName('names');
  };
  
  // Update index to cycle through state.passedNames
  passAgain = () => {
    let index;
    (this.state.passedNames.length - 1) === this.state.index ? index = 0 : index = (this.state.index + 1);
    this.setState({index});
  };
  
  guessedAgain = () => {
    // Add guessed passed name to state.guessedNames
    this.setState(prevState => {
      const index = prevState.index;
      const guessedNames = [
        ...prevState.guessedNames,
        prevState.passedNames[index]
      ];
      return {guessedNames};
    });
    
    // Update index for shorter array, then remove name from state.passedNames
    const index = (this.state.passedNames.length - 1) >= this.state.index ? 0 : (this.state.index + 1);
    this.setState({index}, this.removeName('passedNames'));
  };
  
  choosePlayer = (players) => {
    // Use selector to choose next player
    const lastTeamPlayed = this.props.game.playingNow.team;
    const nextPlayer = selectPlayer(lastTeamPlayed, players);

    // Check a player is returned
    if (!nextPlayer) {
      this.props.endGame();
      // this.props.history.push('/end');
      
    } else {
      return this.props.setNextPlayer(nextPlayer);
    }
  }
  
  onFinished = () => {
    const promisesArray = [
      // Choose next player & send to Firebase
      this.choosePlayer(this.props.players.players),
      
      // Update names in Firebase
      this.props.updateNames(this.state.guessedNames),
      
      // Send score to Firebase
      this.props.startUpdateScore(this.props.game.playingNow.team, this.state.guessedNames.length)
    ];
    
    const handleAllPromises = Promise.all(promisesArray);
    
    handleAllPromises
      // Check if game has ended
      .then(() => {
        if (this.state.names.length === 0) {
          this.props.endGame()
          this.props.history.push('/end')
        } else {
          this.props.endTurn(this.props.user.uid);
          this.props.history.push('/scores')
        }
      })
      .catch((err) => console.log('Something went wrong:', err));
  };
    
  render () {
    // Check if current user is playing
    const isPlaying = !!this.props.user.isPlaying;

    // Define which name is to be rendered for guessing
    let guess;
    const remainingNames = this.state.names.length;
    const passedNames = this.state.passedNames.length;
    if (remainingNames > 0) {
      guess =
        <LiveName
          index={this.state.index}
          names={this.state.names}
          pass={this.pass}
          guessed={this.guessed}
        />
    } else if (passedNames > 0) {
      // const index = Math.floor(Math.random() * (this.state.passedNames.length))
      guess =
        <LiveName
          index={this.state.index}
          names={this.state.passedNames}
          pass={this.passAgain}
          guessed={this.guessedAgain}
          runPassed={true}
        />
    } else {
      guess = (
        <div>
          <p>All finished</p>
          <button onClick={this.onFinished}>To the scores</button>
        </div>
      )
    }
    
    // Define score
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
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => ({
  user: state.user,
  names: state.names.filter(name => name.isGuessed === false),   // Only fetch unguessed names
  game: state.game,
  players: state.players
});

const mapDispatchToProps = (dispatch) => ({
  updateNames: (names) => dispatch(updateNames(names)),
  startUpdateScore: (team, score) => dispatch(startUpdateScore(team, score)),
  endTurn: (uid) => dispatch(endTurn(uid)),
  endGame: () => dispatch(endGame()),
  setNextPlayer: (player) => dispatch(setNextPlayer(player))
});

export default connect (mapStateToProps, mapDispatchToProps)(GamePage);