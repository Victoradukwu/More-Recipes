import React from 'react';
import { shallow } from 'enzyme';
import Ratings from '../../components/recipes/recipeDetails/Ratings';

const props = {
  recipe: { recipeName: 'theRecipe', id: 1 },
  upvoteRecipe: jest.fn(),
  downvoteRecipe: jest.fn(),
  favoriteRecipe: jest.fn()
};
describe('Ratings', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Ratings {...props} />);
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls upvoteRecipe function', () => {
    const wrapper = shallow(<Ratings {...props} />);
    const upvoteBtn = wrapper.find('.fa-thumbs-up');
    upvoteBtn.simulate('click');
    expect(props.upvoteRecipe).toHaveBeenCalled();
  });

  it('calls downvoteRecipe function', () => {
    const wrapper = shallow(<Ratings {...props} />);
    const downvoteBtn = wrapper.find('.fa-thumbs-down');
    downvoteBtn.simulate('click');
    expect(props.downvoteRecipe).toHaveBeenCalled();
  });

  it('calls favorite Recipe function', () => {
    const wrapper = shallow(<Ratings {...props} />);
    const favBtn = wrapper.find('.fa-heart');
    favBtn.simulate('click');
    expect(props.favoriteRecipe).toHaveBeenCalled();
  });
});
