import React from 'react';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import sinon from 'sinon';
import {
  ManageRecipePage,
  mapDispatchToProps
} from '../../components/recipes/ManageRecipePage';

const props = {
  errors: {},
  history: {
    push: jest.fn()
  },
  actions: {},
  recipe: {
    id: 1,
    recipeName: 'beans',
    category: 'breakfast',
    ingredients: 'palm oil',
    instructions: 'how to cook beans',
    upvote: 0,
    downvote: 0,
    views: 0,
    favorites: 0,
    createdAt: {},
    updatedAt: {},
    userId: 1,
    reviews: [],
    User: { id: 1, name: 'Mark' }
  }
};

describe('ManageRecipePage', () => {
  describe('Display Page element and validate snapshot', () => {
    it('Should render the form Correctly', () => {
      const wrapper = shallow(<ManageRecipePage {...props} />);
      expect(wrapper.find('RecipeForm').exists()).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('form field validation and submission', () => {
    it('Should render error if recipe name field is empty', () => {
      const wrapper = shallow(<ManageRecipePage {...props} />);
      wrapper.instance().setState({
        recipe: {
          recipeName: '',
          ingredients: 'some ingredients',
          instructions: 'the instructions',
          category: 'the category'
        }
      });
      wrapper.update();
      expect(wrapper.find('RecipeForm').simulate('submit', {
        preventDefault: () => {}
      }));
      expect(wrapper.state('errors').recipeName).toBe('Recipe name field is required');
    });

    it('Should render error if recipe instruction field is empty', () => {
      const wrapper = shallow(<ManageRecipePage {...props} />);
      wrapper.instance().setState({
        recipe: {
          recipeName: 'myRecipe',
          ingredients: 'some ingredients',
          instructions: '',
          category: 'the category'
        }
      });
      wrapper.update();
      expect(wrapper.find('RecipeForm').simulate('submit', {
        preventDefault: () => {}
      }));
      expect(wrapper.state('errors').instructions).toBe('Instructions field is required');
    });

    it('Should render error if ingredients field is empty', () => {
      const wrapper = shallow(<ManageRecipePage {...props} />);
      wrapper.instance().setState({
        recipe: {
          recipeName: 'myRecipe',
          ingredients: '',
          instructions: 'the instructions',
          category: 'the category'
        }
      });
      wrapper.update();
      expect(wrapper.find('RecipeForm').simulate('submit', {
        preventDefault: () => {}
      }));
      expect(wrapper.state('errors').ingredients).toBe('Ingredients field is required');
    });

    it('should set recipe name state on input change', () => {
      const value = 'theRecipe';
      const name = 'recipeName';
      const wrapper = mount(<ManageRecipePage {...props} />);
      wrapper.find('input').at(0).simulate('change', {
        target: { name, value },
        preventDefault: () => {}
      });
      expect(wrapper.state('recipe').recipeName).toBe(value);
    });

    it('should submit recipe for valid form input', () => {
      const response = {
        url: 'image_url'
      };

      moxios.stubRequest(
        'https://api.cloudinary.com/v1_1/dsj9ygnq2/upload',
        {
          status: 200,
          response
        }
      );
      const spy = sinon.spy(ManageRecipePage.prototype, 'onSubmit');
      const wrapper = mount(<ManageRecipePage {...props} />);
      wrapper.instance().setState({
        recipeName: 'nameText',
        ingredients: 'recipeIngredients',
        instructions: 'instructions'
      });
      wrapper.update();
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      const componentWillReceivePropsSpy = jest
        .spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({ error: { status: true }, recipe: '' });
      expect(spy.called).toBeTruthy();
      expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    });
  });


  describe('instance methods', () => {
    test('getImgURL', () => {
      const wrapper = shallow(<ManageRecipePage {...props} />);
      wrapper.instance().getImgURL();
    });

    test('handleImageChange', () => {
      const event = {
        persist: jest.fn(),
        target: { files: [1] }
      };
      const wrapper = shallow(<ManageRecipePage {...props} />);
      const setStateSpy = jest.spyOn(wrapper.instance(), 'setState');
      try { wrapper.instance().handleImageChange(event); } catch (error) {} // eslint-disable-line
      expect(event.persist).toHaveBeenCalled();
      expect(setStateSpy).toHaveBeenCalled();
    });
  });

  describe('container functions', () => {
    it('mapDispatchToProps', () => {
      const dispatch = jest.fn();
      expect(mapDispatchToProps(dispatch)).toHaveProperty('actions');
      expect(mapDispatchToProps(dispatch)).toBeInstanceOf(Object);

      const { submitRecipe } = mapDispatchToProps(dispatch).actions;
      submitRecipe();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
