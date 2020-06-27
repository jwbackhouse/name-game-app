import React from 'react';
import { shallow } from 'enzyme';
import { RegisterPage } from '../../components/RegisterPage';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<RegisterPage />);
});

test('Should render RegisterPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// User name field
test('Should update state.userName on input change', () => {
  const value = 'Joe Bloggs';
  wrapper.find('input').simulate('change', {
    target: {value}    // pass second argument for 'e.target.value'
  });
  expect(wrapper.state('userName')).toBe(value);   // this syntax is enzyme-specific
});

// Team selector
test('Should update state.userName on input change', () => {
  const value = 'B';
  wrapper.find('select').simulate('change', {
    target: {value}    // pass second argument for 'e.target.value'
  });
  expect(wrapper.state('team')).toBe(value);   // this syntax is enzyme-specific
});

// On submit
describe('Test onSubmit', () => {
  let wrapper, history, onSubmitSpy, startAddUserSpy, mockState, defaultState;
  beforeEach(() => {
    onSubmitSpy = jest.fn();
    startAddUserSpy = jest.fn();
    history = {   // Have to use object to setup spy for history.push
      push: jest.fn()
    };
    mockState = {
      userName: 'Bob',
      team: 'B'
    };
    defaultState = {
      userName: '',
      team: 'A',
      teamAPlayers: [],
      teamBPlayers: [],
      error: ''
    };
    wrapper = shallow(<RegisterPage onSubmit={ onSubmitSpy } startAddUser={ startAddUserSpy } history={ history } />);
  })
  
  test('Should render error if no name entered', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('^^Please enter your name');
  });
  test('Should submit correctly when name & team entered', () => {
    wrapper.setState({ ...mockState });
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state()).toEqual(defaultState);
    expect(startAddUserSpy).lastCalledWith(mockState);
    expect(history.push).lastCalledWith('/setup');
  });
  
});