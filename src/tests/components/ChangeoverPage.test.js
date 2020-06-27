import React from 'react';
import { shallow } from 'enzyme';
import { ChangeoverPage } from '../../components/ChangeoverPage';
import testPlayers from '../fixtures/testPlayers';
import testGame from '../fixtures/testGame';
import testUser from '../fixtures/testUser';

let wrapper, getNames, getPlayers, startSetActivePlayer, updateLocalScore, setStartTime;
beforeEach(() => {
  getNames = jest.fn();
  getPlayers = jest.fn().mockResolvedValue();
  startSetActivePlayer = jest.fn();
  updateLocalScore = jest.fn();
  setStartTime = jest.fn();
  
  wrapper = shallow(
    <ChangeoverPage
      // State
      players={ testPlayers }
      game={ testGame }
      user={ testUser }
      // Props
      getNames={ getNames }
      getPlayers={ getPlayers }
      startSetActivePlayer={ startSetActivePlayer }
      updateLocalScore={ updateLocalScore }
      setStartTime={ setStartTime }
    />
  )
});


test('Should render ChangeoverPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('ChangeoverPage should call getPlayers then make state changes on mounting', () => {
  const didMountSpy = jest.spyOn(ChangeoverPage.prototype, 'ComponentDidMount');
  expect(didMountSpy).lastCalledWith(getPlayers);
})