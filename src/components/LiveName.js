import React from 'react';
import { connect } from 'react-redux';

export const LiveName = ({ index, names, pass, guess, viewPassedNames, allowPass }) => {
  typeof names !== 'object' && console.log('<LiveName />: names not an object / array');
  
  const passButtonText = viewPassedNames ? 'Pass again' : 'Pass';
  const prevPassedMsg =  viewPassedNames && <span>(Previously passed)</span>
  const noMorePassMsg = !allowPass && <p>Sorry, no more passes allowed</p>;

  return (
    <div>
      { prevPassedMsg }
      <p>{ names[index].name }</p>
      <button
        className='button__starts-row button--hero'
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
      { noMorePassMsg }
    </div>
  )
}

export default connect()(LiveName);
