import React from 'react';
import { connect } from 'react-redux';
import Countdown from './Countdown';


export const GuessingPage = (props) => {
  const onFinished = () => {
    // Impose delay to allow state to be updated by playing user
    setTimeout(() => {
      props.names.length === 0
        ? props.history.push('/end')
        : props.history.push('/scores');
    }, 0);
  };

  
  return (
    <div>
      <h1>Guessing time</h1>
      <Countdown onFinished={ onFinished } />
    </div>
  )
}

const mapStateToProps = (state) => ({
  names: state.names
})

export default connect(mapStateToProps)(GuessingPage);