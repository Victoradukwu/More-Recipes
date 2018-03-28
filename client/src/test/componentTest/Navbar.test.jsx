import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../components/Navbar';

const props = {
  isAuthenticated: true,
  searchRecipes: jest.fn(),
};

describe('Navbar', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Navbar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

