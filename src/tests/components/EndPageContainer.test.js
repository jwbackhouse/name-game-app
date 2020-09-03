import React from 'react';
import { shallow, mount } from 'enzyme';
import database from '../../firebase/firebase';
import game from '../fixtures/testGame';
import { EndPageContainer} from '../../components/EndPageContainer';

// jest.mock('../../actions/game', () => {
//   return {
//     fetchScores: jest.fn(() => Promise.resolve()),
//   };
// });


describe('<EndPageContainer mounted />', () => {
  let wrapper;
  let EndPage;
  const fetchScores = jest.fn(() => Promise.resolve(''));
  const initialiseGame = jest.fn();
  const removeAllNames = jest.fn();
  const resetGame = jest.fn();
  const history = { push: jest.fn() };

  beforeEach(() => {
    wrapper = mount(
      <EndPageContainer
        fetchScores={ fetchScores }
        initialiseGame={ initialiseGame }
        removeAllNames={ removeAllNames }
        resetGame={ resetGame }
        game={ game }
        history = { history}
      />
    );
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  
  test('Should render empty component', () => {
    // State is set as ready, but think something about how Jest/Enzyme works is running snapshot before EndPage renders
    expect(wrapper).toMatchSnapshot();
    expect(fetchScores).toBeCalled();
    expect(wrapper.state().ready).toBe(true);
  });
  
  test('Should render EndPage if state set to ready: true', () => {
    wrapper.setState({ ready: true });
    const EndPage = wrapper.find('EndPage');
    expect(EndPage.exists()).toBe(true);
  });
  
  test('Should pass correct values to props for EndGame component', () => {
    wrapper.setState({ ready: true });
    const EndPage = wrapper.find('EndPage');
    expect(EndPage.props().teamAScore).toEqual(game.teamAScore);
    expect(EndPage.props().teamBScore).toEqual(game.teamBScore);
  });
  
  test('Should handle button click correctly.', () => {
    // // Need to mock database.ref().remove() in order to trigger initialiseGame
    // const promise = new Promise((resolve, reject) => {
    //   resolve('abc');
    //   done();
    // });
    // database.ref.remove = jest.fn(() => promise);
    // expect(initialiseGame).toBeCalled();
    
    wrapper.setState({ ready: true });
    wrapper.find('button').simulate('click');
    // Add delay to allow Firebase query to complete
    setTimeout(() => {
      expect(removeAllNames).toBeCalled();
      expect(resetGame).toBeCalled();
      expect(history.push).toBeCalledWith('/');
    },500)
  });
});
