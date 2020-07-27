import React from 'react';
import { shallow } from 'enzyme';
import { EditNamesButtonBase } from '../../components/EditNamesButton';
import auth from '../fixtures/testAuth';

describe('<EditNamesButton />', () => {
  let wrapper;
  const togglePlayerReady = jest.fn();
  const history = { push: jest.fn() };
  beforeEach(() => {
    wrapper = shallow(
      <EditNamesButtonBase
        togglePlayerReady={ togglePlayerReady }
        history={ history }
        auth={ auth }
      />)
  })
  
  test('Should render EditNamesButton', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Should call togglePlayerReady on click and redirect to /setup', () => {
    wrapper.find('button').simulate('click');
    expect(togglePlayerReady).toBeCalled();
    expect(history.push).toBeCalledWith('/setup');
  });
});
