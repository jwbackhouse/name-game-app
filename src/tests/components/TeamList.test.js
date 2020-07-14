import React from 'react';
import { shallow } from 'enzyme';
import { TeamList } from '../../components/TeamList';
import testPlayers from '../fixtures/testPlayers';


describe('<TeamList />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TeamList players={ testPlayers } team='A' />)
  });
  
  test('Should render player list with two teamA players', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Should render message saying "Loading..."', () => {
    const players = {
      ...testPlayers,
      isLoading: true
    };
    const wrapper = shallow(<TeamList players={ players } team='A' />)
    expect(wrapper.text()).toEqual('Loading...');
  });
  
  test('Should render message saying "No one yet"', () => {
    const players = {
      ...testPlayers,
      players: [],
      isLoading: false
    };
    const wrapper = shallow(<TeamList players={ players } team='A' />)
    expect(wrapper.text()).toEqual('No one yet');
  });
  
  
  test('Should render error message', () => {
    const players = {
      ...testPlayers,
      error: 'test error',
      isLoading: false
    };
    const wrapper = shallow(<TeamList players={ players } team='A' />)
    expect(wrapper.text()).toEqual('Oops, something went wrong');
  });
});