import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import moxios from 'moxios';
import sinon from 'sinon';
import { HomePage } from '../../components/recipes/HomePage';

const props = {
  isFetching: true,
  fetchRecipes: jest.fn(),
  fetchedRecipes: [],
  fetchError: 'noerror',
  pages: 1
};

describe('HomePage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<HomePage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});


describe('Home Page', () => {
  it('Should render Manage Recipe Page Correctly', () => {
    const wrapper = shallow(<HomePage {...props} />);
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
