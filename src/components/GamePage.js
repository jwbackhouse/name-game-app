import React from 'react';
import { connect } from 'react-redux';
import LiveName from './LiveName';
import Countdown from './Countdown';
import PassedNamesButton from './PassedNamesButton';
import { passesAllowed } from '../app';
import selectPlayer from '../selectors/selectPlayer';
import { updateNames } from '../actions/names';
import { startUpdateScore, endTurn, endGame, setNextPlayer } from '../actions/game';


export class GamePage extends React.Component {
  state = {
    index: undefined,
    names: [],
    passedNames: [],
    guessedNames: [],
    numberPasses: 0,
    viewPassedNames: false,
    unguessedIndex: undefined
  };
  
  componentDidMount = () => {
    const { names } = this.props;
    
    // Generate random index for name choice
    const index = this.getIndex(names);
    this.setState({index});
    
    // Populate local state with unguessed names
    this.setState({ names });
  };

  // Handle name being guessed or passed
  nextName = type => {
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
  
  // Update index to cycle through state.passedNames
  passAgain = () => {
    const { index, passedNames } = this.state;
    let newIndex;
    if (passedNames.length - 1 === index) {
      newIndex = 0;
    } else {
      newIndex = index + 1;
    }
    this.setState({ index: newIndex });
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
  
  // Remove name from relevant state object + update index
  removeName = arrayName => {
    this.setState(prevState => {
      const prevIndex = prevState.index;
      const newArr = prevState[arrayName].filter((name, arrIndex) => arrIndex !== prevIndex);
      const newIndex = this.getIndex(prevState[arrayName]);
      return {
        [arrayName]: newArr,
        index: newIndex
      };
    });
  };
  
  // Recalculate random index
  getIndex = arrayName => Math.floor(Math.random() * (arrayName.length - 1))
  
  // Handle button toggling whether to display unguessed or passed names
  toggleViewPassedNames = () => {
    const { viewPassedNames, unguessedIndex } = this.state;
    
    if (viewPassedNames) {
      this.setState(prevState => ({
        viewPassedNames: false,
        unguessedIndex: '',
        index: unguessedIndex
      }));
    } else {
      this.setState(prevState => ({
        viewPassedNames: true,
        // Save index of the last unguessed name
        unguessedIndex: prevState.index,
        index: 0
      }));
    }
  };
  
  // Choose next player
  choosePlayer = (players) => {
    const { game, auth, endGame, setNextPlayer } = this.props;
    
    const lastTeamPlayed = game.playingNow.team;
    const nextPlayer = selectPlayer(lastTeamPlayed, players);

    // Check a player is returned
    if (!nextPlayer) {
      endGame(auth.playersUid);
    } else {
      return setNextPlayer(nextPlayer);
    }
  };
  
  // Handle timer expiry or all names being guessed
  onFinished = () => {
    const { guessedNames, names } = this.state;
    const { players, game, auth, history, endGame, endTurn, updateNames, startUpdateScore } = this.props;
    
    // Await Firebase update
    const promisesArray = [
      this.choosePlayer(players.players),
      updateNames(guessedNames),
      startUpdateScore(game.playingNow.team, guessedNames.length)
    ];
    
    const handleAllPromises = Promise.all(promisesArray);
    
    handleAllPromises
      .then(() => {
        // Check if game has ended
        if (names.length === 0) {
          endGame(auth.playersUid);
          history.push('/end');
        } else {
          endTurn(auth.playersUid);
          history.push('/scores');
        }
      })
      .catch((err) => console.log('onFinished(): error from promisesArray:', err));
  };
    
  render = () => {
    const { names, passedNames, guessedNames, index, prevIndex, numberPasses, viewPassedNames } = this.state;
    
    const allowPass = (passesAllowed - numberPasses) > 0;
    const score = guessedNames.length;
    const showPassedNamesButton = passedNames.length > 0 && names.length > 0;
    let guess;
        
    if (names.length > 0 && !viewPassedNames) {
      const newIndex = prevIndex ? prevIndex : index;
      guess =
        <LiveName
          index={ newIndex }
          names={ names }
          pass={ this.nextName }
          guessed={ this.nextName }
          allowPass={ allowPass }
          viewPassedNames={ false }
        />
    } else if (passedNames.length > 0) {
      guess =
        <LiveName
          index={ index }
          names={ passedNames }
          pass={ this.passAgain }
          guessed={ this.guessedAgain }
          allowPass={ true }
          viewPassedNames={ true }
        />
    } else {
      guess = (
        <div>
          <p>All finished</p>
          <button onClick={this.onFinished}>To the scores</button>
        </div>
      )
    }

    return (
      <div className='content-container'>
        <div className='timer-block'>
          <Countdown
            onFinished={this.onFinished}
            className='timer-block__timer'
          />
          <div className='scores-block'>
            <p>Score: {score}</p>
            <p>Passed: {passedNames.length}</p>
          </div>
        </div>
        <div className='word-block'>
          <h4>Your word:</h4>
          <span className='word-block__word'>
            {guess}
          </span>
          { showPassedNamesButton &&
            <PassedNamesButton
              toggleViewPassedNames={ this.toggleViewPassedNames }
              viewPassedNames={ viewPassedNames }
            />
          }
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