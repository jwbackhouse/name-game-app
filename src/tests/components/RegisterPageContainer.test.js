import React from 'react';
import { shallow, mount } from 'enzyme';
import auth, { authWithError, blankAuth } from '../fixtures/testAuth';
import players from '../fixtures/testPlayers';
import { RegisterPageContainer} from '../../components/RegisterPageContainer';


describe('<RegisterPageContainer mounted />', () => {
  let wrapper;
  let RegisterPage;
  const updateDisplayName = jest.fn();
  const startAddUserDetails = jest.fn();
  const history = {push: jest.fn()};

  beforeEach(() => {
    wrapper = mount(
      <RegisterPageContainer
        auth={ auth }
        players={ players }
        startAddUserDetails={ startAddUserDetails }
        updateDisplayName={ updateDisplayName }
        history = { history}
      />
    );
    RegisterPage = wrapper.find('RegisterPage');
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  
  test('Should render RegisterPageContainer correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Should pass initial state values to props', () => {
    expect(RegisterPage.props().username).toEqual(auth.username);
    expect(RegisterPage.props().team).toEqual('A');
  });
    
  test('Should handle username input correctly.', () => {
    const value = 'Brian';
    wrapper.find('input').simulate('change', {
      target: {value}
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
  });
    
  test('Should handle team input correctly.', () => {
    const value = 'B';
    wrapper.find('select').simulate('change', {
      target: {value}
    });
    expect(wrapper.find('select').prop('value')).toBe(value);
  });
  
  test('Should show error message if no username entered', () => {
    const value = '';
    expect(wrapper.find('.error').exists()).toEqual(false);
    wrapper.find('input').simulate('change', {
      target: {value}
    });
    wrapper.find('button').simulate('submit');
    // NB alternative way to simulate form submissions is as follows:
    // wrapper.find('form').simulate('submit', {
    //   preventDefault: () => {}
    // });
    expect(wrapper.find('.error').exists()).toEqual(true);
    expect(startAddUserDetails).not.toBeCalled();
    expect(history.push).not.toBeCalled();
    expect(updateDisplayName).not.toBeCalled();
  });
  
  test('Should call correct functions when form submitted', () => {
    const value = 'Malcolm Tucker';
    wrapper.find('input').simulate('change', {
      target: {value}
    });
    wrapper.find('button').simulate('submit');
    expect(wrapper.find('.error').exists()).toEqual(false);
    expect(startAddUserDetails).toBeCalledWith({ username: value, team: 'A' });
    expect(history.push).toBeCalledWith('/setup');
    expect(updateDisplayName).toBeCalledWith(value);
  });
});
