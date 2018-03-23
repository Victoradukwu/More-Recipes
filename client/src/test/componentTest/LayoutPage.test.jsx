import React from 'react';
import { shallow } from 'enzyme';
import LayoutPage from '../../components/LayoutPage';


describe('LayoutPage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<LayoutPage />);
    expect(wrapper.find('main').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
