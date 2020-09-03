import React from 'react';
import { shallow, mount } from 'enzyme';
import database from '../../firebase/firebase';
import testGame from '../fixtures/testGame';
import { Countdown } from '../../components/Countdown';

// // This and commented-out lines below can be used to mock Firebase
// jest.mock('../../firebase/firebase', () => {
//   const on = jest.fn();
//   return {
//     ref: jest.fn(() => ({
//       on,
//     })),
//   };
// });

describe('<Countdown />', () => {
  let wrapper, on;
  const onFinished = jest.fn();
  beforeEach(() => {
    // on = database.ref().on;
    wrapper = shallow(
      <Countdown
        onFinished={ onFinished }
        game={ testGame }
      />);
  })
  
  test('Should render Countdown with time remaining', (done) => {
    const timeNow = Date.now();
    database.ref('game/startTime').set(timeNow).then(() => done());    // Call done() once database promise has resolved
    expect(wrapper).toMatchSnapshot();
    // expect(on).toBeCalled();
  });
  
    
  test('Should render Countdown with please wait message', (done) => {
    const timeNow = new Date(2020, 0, 1);
    database.ref('game/startTime').set('').then(() => done());
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Should call onFinished when timer expires', () => {
    wrapper.setState({ timerLength: 0 });
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot()
      expect(onFinished).toBeCalled();
    }, 1000);
  });
});