import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import { firebase } from '../../firebase/firebase';


describe('<Header />', () => {
  let wrapper;
  const startLogoutSpy = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<Header startLogout={ startLogoutSpy }/>);
  });
    
  test('Should render Header correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Click on button should call startLogout()', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(startLogoutSpy).toBeCalled;
  });
});
