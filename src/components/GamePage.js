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
    prevIndex: undefined,
    names: [],
    passedNames: [],
    guessedNames: [],
    numberPasses: 0,
    revisitPassed: false,
  };
  
  componentDidMount = () => {
    // Generate random index for name choice
    const index = Math.floor(Math.random() * (this.props.names.length - 1));
    this.setState({index});
    
    // Populate local state with unguessed names
    const names = this.props.names;
    this.setState({ names});
  };

  nextName = (type) => {
    // Add guessed / passed name to state
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
    
    // Remove name from state.names
    this.removeName('names');
  };
  
  // Remove name from relevant state object + update index
  removeName = (arrayName) => {
    this.setState(prevState => {
      const prevIndex = prevState.index;
      const newArr = prevState[arrayName].filter((name, arrIndex) => arrIndex !== prevIndex);
      const newIndex = Math.floor(Math.random() * (prevState[arrayName].length - 1));    // update index based on new array length
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
  
  guessedAgain = () => {
    // Add guessed passed name to state.guessedNames
    this.setState(prevState => {
      const index = prevState.index;
      const guessedNames = [
        ...prevState.guessedNames,
        prevState.passedNames[index]
      ];
      return {
        guessedNames,
        revisitPassed: false,
        prevIndex: undefined
      };
    });
    
    this.removeName('passedNames');
  };
  
  revisitPassed = () => {
    this.setState(prevState => ({
      revisitPassed: true,
      index: 0,
      prevIndex: prevState.index
    }));
  };
  
  choosePlayer = (players) => {
    // Use selector to choose next player
    const lastTeamPlayed = this.props.game.playingNow.team;
    const nextPlayer = selectPlayer(lastTeamPlayed, players);

    // Check a player is returned
    if (!nextPlayer) {
      this.props.endGame(this.props.user.uid);
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
          this.props.endGame(this.props.user.uid)
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
    const allowPass = (passesAllowed - this.state.numberPasses) > 0;
    
    if (remainingNames > 0 && !this.state.revisitPassed) {
      const index = this.state.prevIndex ? this.state.prevIndex : this.state.index;
      guess =
        <LiveName
          index={ index }
          names={ this.state.names }
          passedNamesLength = { this.state.passedNames.length }
          pass={ this.nextName }
          guessed={ this.nextName }
          revisitPassed={ this.revisitPassed }
          allowPass={ allowPass }
        />
    } else if (passedNames > 0 || (passedNames > 0 && this.state.revisitPassed)) {
      guess =
        <LiveName
          index={ this.state.index }
          names={ this.state.passedNames }
          passedNamesLength = { this.state.passedNames.length }
          pass={ this.passAgain }
          guessed={ this.guessedAgain }
          revisitPassed={ this.revisitPassed }
          showingPassedNames={ true }
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
  endGame: (uid) => dispatch(endGame(uid)),
  setNextPlayer: (player) => dispatch(setNextPlayer(player))
});

export default connect (mapStateToProps, mapDispatchToProps)(GamePage);