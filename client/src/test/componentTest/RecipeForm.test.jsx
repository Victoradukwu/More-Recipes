import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { RecipeForm } from '../../components/recipes/RecipeForm';

describe('Recipe Form', () => {
  const props = {
    onChange: jest.fn(),
    onImageUpload: jest.fn(),
    errors: {},
    onSubmit: jest.fn(),
    defaultImgSrc: '',
  };

  it('Should render RecipeForm Correctly', () => {
    const wrapper = shallow(<RecipeForm {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  // it('Should render if recipe name field is empty', () => {
  //   const recipe = {
  //     recipeName: '',
  //     ingredients: 'some ingredients',
  //     instructions: 'the instructions',
  //     category: 'the category'
  //   }
  //   const wrapper = shallow(<RecipeForm {...props} recipe />);
    
  // });
});
