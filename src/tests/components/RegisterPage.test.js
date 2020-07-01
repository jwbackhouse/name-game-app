import React from 'react';
import { shallow } from 'enzyme';
import auth, { authWithError, blankAuth } from '../fixtures/testAuth';
import players from '../fixtures/testPlayers';
import { RegisterPage } from '../../components/RegisterPage';


let wrapper, startAddGameInfo, fetchData, endFetchData, updateDisplayName, history, newPlayer, defaultState;
beforeEach(() => {
  startAddGameInfo = jest.fn();
  fetchData = jest.fn();
  endFetchData = jest.fn();
  updateDisplayName= jest.fn();
  history={ push: jest.fn() }
  wrapper = shallow(
    <RegisterPage
      // Redux state
      auth={ auth }
      players={ players }
      // Redux dispatch
      startAddGameInfo={ startAddGameInfo }
      fetchData={ fetchData }
      endFetchData={ endFetchData }
      updateDisplayName={ updateDisplayName }
      history={ history }
    />
  );
  newPlayer = {
    username: 'Bob',
    team: 'B',
  };
  defaultState = {
    username: '',
    team: 'A',
    error: ''
  };
});

test('Should render RegisterPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// User name field
test('Should update state.username on input change', () => {
  const value = 'Joe Bloggs';
  wrapper.find('input').simulate('change', {
    target: {value}    // pass second argument for 'e.target.value'
  });
  expect(wrapper.state('username')).toBe(value);   // this syntax is enzyme-specific
});

// Team selector
test('Should update state.username on input change', () => {
  const value = 'B';
  wrapper.find('select').simulate('change', {
    target: {value}    // pass second argument for 'e.target.value'
  });
  expect(wrapper.state('team')).toBe(value);   // this syntax is enzyme-specific
});

// On submit
test('Should render error if no name entered', () => {
  wrapper.setState({ ...blankAuth })
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  console.log(wrapper.state('username'));
  expect(wrapper.state('error')).toBe('^^Please enter your name');
});

test('Should submit correctly when name & team entered', () => {
  wrapper.setState({ ...newPlayer });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(startAddGameInfo).lastCalledWith(newPlayer);
  expect(updateDisplayName).lastCalledWith(newPlayer.username);
  expect(history.push).lastCalledWith('/setup');
});
