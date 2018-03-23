import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import moxios from 'moxios';
import sinon from 'sinon';
import { ManageRecipePage } from '../../components/recipes/ManageRecipePage';

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

describe('ManageRecipesPage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<ManageRecipePage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});


describe('Manage Recipe Page', () => {
  it('Should render Manage Recipe Page Correctly', () => {
    const wrapper = shallow(<ManageRecipePage {...props} />);
    expect(wrapper.find('RecipeForm').exists()).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

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
    expect(wrapper.state('errors').recipeName.length).toBeGreaterThan(0);
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
    expect(wrapper.state('errors').instructions.length).toBeGreaterThan(0);
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
    expect(wrapper.state('errors').ingredients.length).toBeGreaterThan(0);
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
    expect(spy.called).toBeTruthy();
  });
});
