import React from 'react';
import { shallow } from 'enzyme';
import { HomePage, mapDispatchToProps }
  from '../../components/recipes/HomePage';

const props = {
  isFetching: true,
  fetchRecipes: jest.fn(),
  fetchedRecipes: [],
  fetchError: 'noerror',
  pages: 1
};

describe('HomePage', () => {
  describe('Snapshot', () => {
    it('matches snapshot', () => {
      const wrapper = shallow(<HomePage {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Render page element', () => {
    it('Should render the div element Correctly', () => {
      const wrapper = shallow(<HomePage {...props} />);
      expect(wrapper.find('div').exists()).toBeTruthy();
    });
  });

  describe('container functions', () => {
    it('mapDispatchToProps', () => {
      const dispatch = jest.fn();

      expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchRecipes');
      expect(mapDispatchToProps(dispatch)).toBeInstanceOf(Object);

      const { fetchRecipes } = mapDispatchToProps(dispatch);
      fetchRecipes(1);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
