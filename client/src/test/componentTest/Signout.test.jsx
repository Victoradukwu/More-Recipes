import React from 'react';
import { shallow } from 'enzyme';
import { SignoutPage } from '../../components/users/SignOutPage';

const props = {
  logout: jest.fn(),
  history: {
    push: jest.fn()
  }

};

describe('SignoutPage', () => {
  it('matches snapshot and display page element properly', () => {
    const wrapper = shallow(<SignoutPage {...props} />);
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
