import React from 'react';
import {connect} from 'react-redux';

export const LiveName = (props) => {
  const index = props.index;
  const passMessage = props.runPassed ? 'Pass again' : 'Pass';

  return (
    <div>
      {props.runPassed && <p>Passed: </p>}
      <p>{props.names[index].name}</p>
      <button onClick={props.pass}>{passMessage}</button>
      <button onClick={props.guessed}>Correct</button>
    </div>
  )
}

// const mapStateToProps = (state) => ({
//   names: state.names
// })


export default connect()(LiveName);