import React from 'react';
import { connect } from 'react-redux';

export const LiveName = ({ index, names, pass, guess, viewPassedNames, allowPass }) => {
  typeof names !== 'object' && console.log('<LiveName />: names not an object / array');
  
  const passButtonText =
    viewPassedNames
      ? 'Pass again'
      : 'Pass';
  const prevPassedMsg =
    viewPassedNames
      ? '(Previously passed)'
      : String.fromCharCode(160);
  const noMorePassMsg =
    !allowPass && <p className='guess-block__msg'>Sorry, no more passes allowed</p>;

  return (
    <>
      <p className='guess-block__msg'>{ prevPassedMsg }</p>
      <p className='guess-block__name'>{ names[index].name }</p>
      <div className='button-container'>
        <button
          className='button__starts-row button--hero button--fixed-percent'
          onClick={ () => guess('guess') }
        >
          Got it!
        </button>
        <button
          className='button'
          onClick={ () => pass('pass') }
          disabled={ !allowPass && !viewPassedNames}
        >
          { passButtonText }
        </button>
      </div>
      { noMorePassMsg }
    </>
  )
}

export default connect()(LiveName);
