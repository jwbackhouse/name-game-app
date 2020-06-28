import React from 'react';
import { connect } from 'react-redux';

export const LiveName = (props) => {
  typeof props.names !== 'object' && console.log('<LiveName />: names not an object / array');
  
  const passButtonText = props.viewingPassedNames ? 'Pass again' : 'Pass';
  const prevPassedMsg =  props.viewingPassedNames && <span>(Previously passed)</span>
  const noMorePassMsg = !props.allowPass && <p>Sorry, no more passes allowed</p>;

  return (
    <div>
      { prevPassedMsg }
      <p>{ props.names[props.index].name }</p>
      <button
        onClick={ () => props.guessed('guess') }
      >
        Guessed correctly
      </button>
      <button
        onClick={ () => props.pass('pass') }
        disabled={ !props.allowPass && !props.viewingPassedNames}
      >
        { passButtonText }
      </button>
      { noMorePassMsg }
    </div>
  )
}

export default connect()(LiveName);