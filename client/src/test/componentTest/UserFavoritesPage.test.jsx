import React from 'react';
import { shallow } from 'enzyme';
import { UserFavoritesPage } from '../../components/recipes/UserFavoritesPage';

const props = {
  userFavorites: [],
  fetchUserFavorites: jest.fn()
};

describe('RecipeDetailsPage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<UserFavoritesPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
