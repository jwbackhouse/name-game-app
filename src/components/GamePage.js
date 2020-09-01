import React from 'react';
import { connect } from 'react-redux';
import LiveName from './LiveName';
import Countdown from './Countdown';
import PassedNamesButton from './PassedNamesButton';

export const GamePage = props => {
  const {
    names,
    passedNames,
    guessedNames,
    index,
    prevIndex,
    numberPasses,
    viewPassedNames,
    nextName,
    passAgain,
    guessPassedName,
    onFinished,
    toggleViewPassedNames,
    game,
  } = props;
  const allowPass = (game.numPasses - numberPasses) > 0;
  const score = guessedNames.length;
  const showPassedNamesButton = passedNames.length > 0 && names.length > 0;
  let guess;
  
  // Using unguessed names list
  if (names.length > 0 && !viewPassedNames) {
    const newIndex = prevIndex ? prevIndex : index;
    guess =
      <LiveName
        index={ newIndex }
        names={ names }
        pass={ nextName }
        guess={ nextName }
        allowPass={ allowPass }
        viewPassedNames={ false }
      />
  // Using passed names
  } else if (passedNames.length > 0) {
    guess =
      <LiveName
        index={ index }
        names={ passedNames }
        pass={ passAgain }
        guess={ guessPassedName }
        allowPass={ true }
        viewPassedNames={ true }
      />
  // No names left
  } else {
    guess = (
      <div>
        <p>All finished</p>
        <button className='button button--hero' onClick={onFinished}>To the scores</button>
      </div>
    )
  }

  return (
    <div className='content-container'>
      <div className='timer-block'>
        <Countdown
          onFinished={onFinished}
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
            toggleViewPassedNames={ toggleViewPassedNames }
            viewPassedNames={ viewPassedNames }
          />
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(GamePage);
