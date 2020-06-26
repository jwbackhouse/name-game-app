import React from 'react';
import { connect } from 'react-redux';

export const LiveName = (props) => {
  const passMessage = props.runPassed ? 'Pass again' : 'Pass';

  return (
    <div>
      { props.runPassed && <p>(Previously passed)</p> }
      <p>{ props.names[props.index].name }</p>
      <button onClick={ () => props.pass('pass') }>{ passMessage }</button>
      <button onClick={ () => props.guessed('guess') }>Correct</button>
    </div>
  )
}

export default connect()(LiveName);