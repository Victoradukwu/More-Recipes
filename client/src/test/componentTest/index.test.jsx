import React from 'react';
import { shallow } from 'enzyme';
import { RecipeDetailsPage } from '../../components/recipes/recipeDetails/RecipeDetailsPage';

const props = {
  match: {
    params: { id: 1 }
  },
  getSingleRecipe: jest.fn(),
  history: {
    push: jest.fn()
  }
};

describe('RecipeDetailsPage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<RecipeDetailsPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
