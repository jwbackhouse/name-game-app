import React from 'react';
import { connect } from 'react-redux';

export const LiveName = (props) => {
  const passButtonText = props.showingPassedNames ? 'Pass again' : 'Pass';
  const prevPassedMsg =  props.showingPassedNames && <span>(Previously passed)</span>
  const noMorePassMsg = !props.allowPass && <p>Sorry, no more passes allowed</p>;
  
  let revisitPassedButton;
  if (!props.allowPass && props.passedNamesLength > 0) {
    revisitPassedButton = (
      <button onClick={ props.revisitPassed }>Re-try passed names</button>
    )
  }
    
  let passButton;
  if (props.allowPass) {
    passButton =
      <button
        onClick={ () => props.pass('pass') }
        disabled={ !props.allowPass }
      >
        { passButtonText }
      </button>
  }

  return (
    <div>
      { prevPassedMsg }
      <p>{ props.names[props.index].name }</p>
      { noMorePassMsg }
      <button
        onClick={ () => props.guessed('guess') }
      >
        Guessed correctly
      </button>
      { passButton }
      { revisitPassedButton }
    </div>
  )
}

export default connect()(LiveName);