import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import database from '../firebase/firebase';

export class Countdown extends React.Component {
  state = {
    timerOn: false,
    timerEnded: false,
    timerTime: 0,
    timerStart: 0,
    timerLength: this.props.game.timerLength * 1000,
    message: '',
  }
  
  componentDidMount = () => {
    // Check for start time on Firebase
    database.ref('game/startTime').on('value', snapshot => {
      const startTime = snapshot.val();
      if (startTime) {
        this.setState({ timerStart: startTime, message: '' });
        this.startTimer();
      } else if (this.state.timerEnded) {
        this.setState({ message: 'Time\'s up'});
      } else {
        this.setState({ message: 'Hang on a second...' });
      }
    });
  }
  
  componentWillUnmount = () => {
    database.ref('game/startTime').off();
    this.stopTimer();
  }
  
  startTimer = () => {
    this.setState({
      timerOn: true,
    });
    
    this.timer = setInterval(() => {
      const timeLeft = this.state.timerLength - this.state.timerTime;
      if (timeLeft >= 0)  {
        this.setState({ timerTime: Date.now() - this.state.timerStart });
      } else {
        clearInterval(this.timer);
        this.setState({
          timerOn: false,
          timerEnded: true,
        });
        this.props.onFinished();
      }
    }, 50);
  }

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  
  // // Unused functionality
  // resetTimer = () => {
  //   this.setState({
  //     timerTime: 0,
  //     timerStart: 0
  //   });
  // };
  
  
  render = () => {
    const { timerLength, timerTime, message } = this.state;
    const timeLeft = Math.max(0, timerLength - timerTime);
    return (
      <div className='timer-block__timer'>
        <h3>Time left</h3>
        { message
          ? <p className='timing-block--background'>{ message }</p>
          : <p className='timing-block--highlight'>{ moment(timeLeft).format('m:ss') }</p>
        }
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Countdown);
