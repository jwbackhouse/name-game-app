import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import { firebase } from '../../firebase/firebase';


test('Should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
