import React from 'react';
import { shallow } from 'enzyme';
import { ChangeoverPage } from '../../components/ChangeoverPage';
import testPlayers from '../fixtures/testPlayers';
import testGame from '../fixtures/testGame';
import testAuth from '../fixtures/testAuth';

describe('<ChangeoverPage />', () => {
  let wrapper;
  const fetchDataSpy = jest.fn();
  const endFetchDataSpy = jest.fn();
  const getNamesSpy = jest.fn();
  const startTurnSpy = jest.fn();
  const historySpy = { push: jest.fn() };
  
  beforeEach(() => {
    wrapper = shallow(
      <ChangeoverPage
        // State
        players={ testPlayers }
        game={ testGame }
        auth={ testAuth }
        // Props
        fetchData={ fetchDataSpy }
        endFetchData={ endFetchDataSpy }
        getNames={ getNamesSpy }
        startTurn={ startTurnSpy }
        history={ historySpy }
      />
    )
  });

  test('Should render ChangeoverPage', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Should call fetchData() and getNames on mounting', () => {
    expect(fetchDataSpy).toBeCalled;
    expect(getNamesSpy).toBeCalled;
  });
  
  test('Should redirect to /guess on game.startTurn change', () => {
    wrapper.setProps({
      game: {
        ...testGame,
        startTurn: true
      }
    });
    expect(historySpy.push).lastCalledWith('/guess');
  });
  
  test('Should redirect to /end on game.endGame change', () => {
    wrapper.setProps({
      game: {
        ...testGame,
        endGame: true
      }
    });
    expect(historySpy.push).lastCalledWith('/end');
  });
  
  test('Should call startTurn() and redirect to /play via <StartMessage /> onClick', () => {
    // Set up spy on child component prop
    const onClickSpy = ChangeoverPage.prototype.onClick;
    wrapper.find('StartMessage').props().onClick();
    expect(historySpy.push).lastCalledWith('/play');
    expect(startTurnSpy).toBeCalled;
  })
  
  test('Should pass true to thisUserPlaying prop of <StartMessage />', () => {
    const thisUserPlaying = wrapper.find('StartMessage').props().thisUserPlaying;
    // Check fixtures data is still providing identical uids
    expect(testAuth.firebaseUID).toEqual(testGame.playingNow.uid);
    expect(thisUserPlaying).toEqual(true);
  })
});