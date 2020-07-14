import React from 'react';
import { shallow, mount } from 'enzyme';
import auth, { authWithError, blankAuth } from '../fixtures/testAuth';
import players from '../fixtures/testPlayers';
import RegisterPage from '../../components/RegisterPage';


describe('<RegisterPage /> shallow render', () => {
  const error = undefined;
  const username = 'Jonathan';
  const team = 'B';
  const onSubmit = jest.fn();
  const onNameChange = jest.fn();
  const onTeamChange = jest.fn();

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <RegisterPage
        error={ error }
        username={ username }
        team={ team }
        players={ players }
        onSubmit={ onSubmit }
        onNameChange={ onNameChange }
        onTeamChange={ onTeamChange }
      />
    );
  });
  
  test('Should render RegisterPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  describe('input fields', () => {
    // User name field
    test('Should update state.username on input change', () => {
      const value = 'Joe Bloggs';
      wrapper.find('input').simulate('change', {
        target: {value}    // pass second argument for 'e.target.value'
      });
      expect(onNameChange).toBeCalled();
    });
    
    test('Should update field contents when new username passed via props', () => {
      const newName = 'Joel'
      wrapper.setProps({ username: newName });
      expect(wrapper.find('input').props().value).toEqual(newName);
    });
  
    // Team selector
    test('Should update state.team on input change', () => {
      const value = 'A';
      wrapper.find('select').simulate('change', {
        target: {value}
      });
      expect(onTeamChange).toBeCalled();
    });
  });
  
  describe('error field', () => {
    test('Should render error message if present', () => {
      const errorMsg = 'this is an error';
      wrapper.setProps({ error: errorMsg });
      expect(wrapper.find('.error').text()).toBe(errorMsg);
    });
  });
});

describe('<RegisterPage /> mount', () => {
  const error = undefined;
  const username = 'Alex';
  const team = 'A';
  const onSubmit = jest.fn();
  const onNameChange = jest.fn();
  const onTeamChange = jest.fn();

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RegisterPage
        error={ error }
        username={ username }
        team={ team }
        players={ players }
        onSubmit={ onSubmit }
        onNameChange={ onNameChange }
        onTeamChange={ onTeamChange }
      />
    );
  });
  
  test('Should render RegisterPage & child components correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
