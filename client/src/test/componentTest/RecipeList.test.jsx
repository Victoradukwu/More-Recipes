import React from 'react';
import { shallow } from 'enzyme';
import RecipeList from '../../components/recipes/RecipeList';

describe('RecipeList', () => {
  const props = {
    userRecipes: [{ id: 1 }],
    deleteRecipe: jest.fn()
  };
  it('matches snapshot', () => {
    const wrapper = shallow(<RecipeList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
