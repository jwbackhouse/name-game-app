import React from 'react';
import moment from 'moment';
import database from '../firebase/firebase';

// TODO - link state.timerLength to admin page
export class Countdown extends React.Component {
  state = {
    timerOn: false,
    timerTime: 0,
    timerStart: 0,
    timerLength: 60000,
    message: ''
  }
  
  componentDidMount = () => {
    // Check for start time on Firebase
    database.ref('game/startTime').on('value', snapshot => {
      const startTime = snapshot.val();
      if (startTime) {
        this.setState({ timerStart: startTime, message: '' });
        this.startTimer();
      } else {
        this.setState({ message: 'Hang on a second...' });
      }
    });
  }
  
  componentWillUnmount = () => {
    // Unsubscribe from Firebase call
    database.ref('game/startTime').off()
  }
  
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime
    });
    
    this.timer = setInterval(() => {
      const timeLeft = this.state.timerLength - this.state.timerTime;
      if (timeLeft >= 0)  {
        this.setState({ timerTime: Date.now() - this.state.timerStart });
      } else {
        clearInterval(this.timer)
        this.setState({ timerOn: false });
        this.props.onFinished();
      }
    }, 50);
  }
    
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  
  resetTimer = () => {
    this.setState({
      timerTime: 0,
      timerStart: 0
    });
  };
  
  
  render = () => {
    const timeLeft = Math.max(0, this.state.timerLength - this.state.timerTime);
    const messageElement = this.state.message && this.state.message
    return (
      <div>
        <p>{ messageElement }</p>
        <h3>Time left: {moment(timeLeft).format('m:ss')}</h3>
      </div>
    )
  }
}

export default Countdown