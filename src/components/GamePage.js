import React from 'react';
import { connect } from 'react-redux';
import LiveName from './LiveName';
import { updateNames } from '../actions/names';
import { updateScore } from '../actions/game';
import { startResetPlayer } from '../actions/user';


// TODO - is there a better way to deal with repeated code (e.g. index setting)

// PROCESS
// fetch all names (from single list)
// pick random one
// mark as done or passed for round x
// send back to db (ignoring passed flag)
// next person pulls off non-done ones


export class GamePage extends React.Component {
  state = {
    index: undefined,
    names: [],
    passedNames: [],
    guessedNames: [],
    team: undefined
  };
  
  componentDidMount() {
    // Generate random index for name choice
    const index = Math.floor(Math.random() * (this.props.names.length - 1));    // BODGE - will not return array length to avoid error when array is shortened and {guess} renders below
    this.setState(() => ({index}));
    
    // Populate local state with names
    const names = this.props.names;
    this.setState(() => ({ names}));
    
    this.setState(() => ({team: this.props.user.team}));
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
    
    // Update index for new array
    // // Update guessed name property to guessed
    // this.setState(prevState => {
    //   const index = prevState.index;
    //   const names = prevState.names.map((name, arrIndex) => {
    //     if (index === arrIndex) {
    //       return {
    //         ...name,
    //         guessed:true
    //       }
    //     } else {
    //       return name
    //     }
    //   });
    //   return {names}
    // })
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
    let index;
    (this.state.passedNames.length - 1) >= this.state.index ? index = 0 : index = (this.state.index + 1);
    this.setState({index}, this.removeName('passedNames'));
  };
  
  finished = () => {
    const promisesArray = [
      this.props.updateNames(this.state.guessedNames),
      this.props.startResetPlayer(),
      this.props.updateScore(this.state.team, this.state.guessedNames.length)
    ]
    
    const handleAllPromises = Promise.all(promisesArray);
    handleAllPromises
      .then(() => this.props.names.length === 0 ? this.props.history.push('/end') : this.props.history.push('/scores'))
      .catch((err) => console.log('Something went wrong:', err));
    
    
    // // Update Firebase with guessedNames
    // this.props.updateNames(this.state.guessedNames);
    
    // // Reset isPlaying flag if appropriate for local user
    // this.props.user.isPlaying && this.props.startResetPlayer();
    
    // // Update team's score
    // this.props.updateScore(this.state.team, this.state.guessedNames.length);
    
    // // Send to ChangeoverPage
    // this.props.history.push('/scores');
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
          <button onClick={this.finished}>Next player</button>
        </div>
      )
    }
    
    // Define score
    const score = this.state.guessedNames.length
    
    // // Conditional rendering based on whether local user is playing
    // if (isPlaying) {
      return (
        <div>
          <h1>Let's play...</h1>
          <h3>You're up</h3>
          <div>
            {guess}
            <p>Score: {score}</p>
            <p>Passed: {passedNames}</p>
          </div>
        </div>
      )
    // } else {
    //   return (
    //     <div>
    //       <h1>Let's play...</h1>
    //       <h3>Ready?</h3>
    //     </div>
    //   )
    // }
  };
};

const mapStateToProps = (state) => ({
  user: state.user,
  names: state.names.filter(name => name.isGuessed === false)   // Only fetch unguessed names
});

const mapDispatchToProps = (dispatch) => ({
  updateNames: (names) => dispatch(updateNames(names)),
  startResetPlayer: () => dispatch(startResetPlayer()),
  updateScore: (team, score) => dispatch(updateScore(team, score))
});

export default connect (mapStateToProps, mapDispatchToProps)(GamePage);