import React from 'react';
import { shallow } from 'enzyme';
import { EntryPage } from '../../components/EntryPage';

describe('<EntryPage />', () => {
  let wrapper;
  const clearLoginFailure = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<EntryPage clearLoginFailure={ clearLoginFailure }/>)
  })
  
  test('Should render EntryPage', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Should show <SignupForm /> on button press', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.state().signup).toEqual(true);
    // Add delay to allow component to render
    setTimeout(() => {
      expect(wrapper.find('SignupForm')).to.have.lengthOf(1)
    },500)
  })
  
  test('Should show then hide <LoginForm /> on double button press', () => {
    wrapper.find('button').at(0).simulate('click');
    // Add delay to allow component to render
    setTimeout(() => {
      expect(wrapper.find('SignupForm')).to.have.lengthOf(1)
    },500)
    wrapper.find('button').at(0).simulate('click');
    // Add delay to allow component to render
    setTimeout(() => {
      expect(wrapper.find('SignupForm')).to.have.lengthOf(0)
    },500)
  })
  
  test('Should show <PasswordResetForm /> when called by <LoginForm />', () => {
    wrapper.setState({ login: true });
    setTimeout(() => {
      wrapper.find('LoginForm').props().showPasswordReset()
    }, 500);
    setTimeout(() => {
      expect(wrapper.find('PasswordResetForm')).to.have.lengthOf(1);
    }, 500);
  })
});