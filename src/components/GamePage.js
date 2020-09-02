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
      <>
        <p className='guess-block__msg guess-block--hero'>All finished</p>
        <button className='button button--hero button--fixed-width' onClick={onFinished}>To the scores</button>
      </>
    )
  }
  
  const passedNamesText = toggleViewPassedNames ? 'Return to unguessed names >>' : 'Re-try your passed names >>'

  return (
    <div className='content-container'>
      <h1>You're up!</h1>
      
      <div className='gamePage-container'>
        <div className='guess-block'>
          { guess }
          <button className='button button--text-link' onClick={ toggleViewPassedNames }>
            { showPassedNamesButton ? passedNamesText : String.fromCharCode(160) }
          </button>
        </div>
        
        <div className='timing-block'>
          <Countdown
            onFinished={onFinished}
          />
          <div className='timing-block__container'>
            <div className='timing-block__score'>
              <h3>Score</h3>
              <p>{score}</p>
            </div>
            <div className='timing-block__score'>
              <h3>Number passed</h3>
              <p>{passedNames.length}</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(GamePage);
