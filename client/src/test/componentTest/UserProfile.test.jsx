import React from 'react';
import { shallow } from 'enzyme';
import { UserProfile } from '../../components/users/UserProfile';

const props = {
  user: {
    recipes: []
  }
};

describe('UserProfile', () => {
  it('Should render user profile Page Correctly', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
