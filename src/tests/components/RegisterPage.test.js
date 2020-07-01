import React from 'react';
import { shallow } from 'enzyme';
import auth, { authWithError, blankAuth } from '../fixtures/testAuth';
import players from '../fixtures/testPlayers';
import { RegisterPage } from '../../components/RegisterPage';


describe('<RegisterPage />', () => {
  const startAddGameInfo = jest.fn();
  const fetchData = jest.fn();
  const endFetchData = jest.fn();
  const updateDisplayName= jest.fn();
  const history={ push: jest.fn() };
  const newPlayer = {
    username: 'Bob',
    team: 'B',
  };
  const defaultState = {
    username: '',
    team: 'A',
    error: ''
  };
  let wrapper;
  beforeEach(() => {
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
  test('Should update state.team on input change', () => {
    const value = 'B';
    wrapper.find('select').simulate('change', {
      target: {value}    // pass second argument for 'e.target.value'
    });
    expect(wrapper.state('team')).toBe(value);   // this syntax is enzyme-specific
  });
  
  // On submit
  describe('onSubmit', () => {
    test('Should render error if no name entered', () => {
      wrapper.setState({ ...blankAuth })
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      console.log(wrapper.state('username'));
      expect(wrapper.state('error')).toBe('^^Please enter your name');
    });
    
    test('Should call startAddGameInfo() & updateDisplayName(), and redirect to /setup', () => {
      wrapper.setState({ ...newPlayer });
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      expect(startAddGameInfo).lastCalledWith(newPlayer);
      expect(updateDisplayName).lastCalledWith(newPlayer.username);
      expect(history.push).lastCalledWith('/setup');
    });
  });
});