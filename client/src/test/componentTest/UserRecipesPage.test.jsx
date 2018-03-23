import React from 'react';
import { shallow } from 'enzyme';
import { UserRecipesPage } from '../../components/recipes/UserRecipesPage';

const props = {
  fetchUserRecipes: jest.fn(),
  userRecipes: [{ recipeName: 'theOneRecipe' }],
  history: {
    push: jest.fn()
  },
  deleteRecipe: jest.fn(),
};

describe('UserRecipesPage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<UserRecipesPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
