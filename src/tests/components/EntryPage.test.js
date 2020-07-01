import React from 'react';
import { shallow } from 'enzyme';
import { EntryPage } from '../../components/EntryPage';

test('Should render EntryPage', () => {
  const wrapper = shallow(<EntryPage />);
  expect(wrapper).toMatchSnapshot();
})