import React from 'react';
import { shallow } from 'enzyme';
import { RecipeSearchPage } from '../../components/recipes/RecipeSearchPage';

const props = {
  isSearching: true,
  searchedRecipes: [],
  searchError: 'someError'
};

describe('RecipeSearchPage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<RecipeSearchPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
