import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  RecipeDetailsPage,
  mapStateToProps,
  mapDispatchToProps
} from '../../components/recipes/recipeDetails/RecipeDetailsPage';

const props = {
  match: {
    params: { id: 1 }
  },
  getSingleRecipe: jest.fn(),
  history: {
    push: jest.fn()
  },
  upvoteRecipe: jest.fn(),
  downvoteRecipe: jest.fn(),
  reviewRecipe: jest.fn(),
  favoriteRecipe: jest.fn(),
  commentChange: jest.fn()
};

describe('RecipeDetailsPage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<RecipeDetailsPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('instance and lifecycle methods', () => {
    describe('handeleUpvote method', () => {
      it('calls the upvoteRecipe prop function', () => {
        const wrapper = shallow(<RecipeDetailsPage {...props} />);
        wrapper.instance().handleUpvote();
        expect(props.upvoteRecipe).toHaveBeenCalled();
      });
    });

    describe('handeleDownvote method', () => {
      it('calls the downvoteRecipe prop function', () => {
        const wrapper = shallow(<RecipeDetailsPage {...props} />);
        wrapper.instance().handleDownvote();
        expect(props.downvoteRecipe).toHaveBeenCalled();
      });
    });

    describe('handeleFavorite method', () => {
      it('calls the favoriteRecipe prop function', () => {
        const wrapper = shallow(<RecipeDetailsPage {...props} />);
        wrapper.instance().handleFavorite();
        expect(props.favoriteRecipe).toHaveBeenCalled();
      });
    });

    it('handle comment change', () => {
      const value = 'Awesome';
      const name = 'comment';
      const wrapper = mount(<RecipeDetailsPage {...props} />);
      wrapper.find('textarea').simulate('change', {
        target: { name, value },
        preventDefault: () => {}
      });
      expect(wrapper.state('comment')).toBe(value);
    });


    describe('handleReview method', () => {
      it('calls reviewRecipe props function', () => {
        const eventMock = {
          preventDefault: jest.fn()
        };
        const wrapper = shallow(<RecipeDetailsPage {...props} />);
        wrapper.instance().handleReview(eventMock);
        expect(props.reviewRecipe).toHaveBeenCalled();
      });

      it('calls setState with the comment from the component state', () => {
        const eventMock = {
          preventDefault: jest.fn()
        };
        const wrapper = shallow(<RecipeDetailsPage {...props} />);
        const setState = jest.spyOn(wrapper.instance(), 'setState');
        wrapper.instance().handleReview(eventMock);
        expect(setState).toHaveBeenCalledWith({ comment: '' });
      });
    });
  });

  describe('conatiner functions', () => {
    test('mapStateToProps', () => {
      expect(mapStateToProps({ user: {} })).toHaveProperty('recipe');
      expect(mapStateToProps({ user: {} })).toBeInstanceOf(Object);
    });

    it('mapDispatchToProps', () => {
      const dispatch = jest.fn();
      expect(mapDispatchToProps(dispatch)).toHaveProperty('upvoteRecipe');
      expect(mapDispatchToProps(dispatch)).toHaveProperty('downvoteRecipe');
      expect(mapDispatchToProps(dispatch)).toHaveProperty('favoriteRecipe');
      expect(mapDispatchToProps(dispatch)).toHaveProperty('reviewRecipe');
      expect(mapDispatchToProps(dispatch)).toHaveProperty('getSingleRecipe');
      expect(mapDispatchToProps(dispatch)).toBeInstanceOf(Object);

      const { upvoteRecipe } = mapDispatchToProps(dispatch);
      upvoteRecipe();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
