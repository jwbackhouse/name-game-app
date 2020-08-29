import React from 'react';
import moment from 'moment';
// import { timerLength } from '../app';
import database from '../firebase/firebase';

// TODO - link state.timerLength to admin page
export class Countdown extends React.Component {
  state = {
    timerOn: false,
    timerTime: 0,
    timerStart: 0,
    timerLength: 120000,
    message: '',
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
    database.ref('game/startTime').off();
    this.stopTimer();
  }
  
  startTimer = () => {
    const { timerTime, timerLength, timerStart } = this.state;
    
    this.setState({
      timerOn: true,
      timerTime: timerTime
    });
    
    this.timer = setInterval(() => {
      const timeLeft = timerLength - timerTime;
      if (timeLeft >= 0)  {
        this.setState({ timerTime: Date.now() - timerStart });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
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
    const messageElement = message && message;
    return (
      <div>
        <p>{ messageElement }</p>
        <h3>Time left: {moment(timeLeft).format('m:ss')}</h3>
      </div>
    )
  }
};

<<<<<<< Updated upstream
export default Countdown;
=======
const mapStateToProps = (state) => ({
  game: state.game,
});

const connectedWithLiveData = compose(
  connect(mapStateToProps),
  withLiveData,
);

export default connectedWithLiveData(Countdown);
>>>>>>> Stashed changes
