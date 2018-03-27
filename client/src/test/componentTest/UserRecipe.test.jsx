import React from 'react';
import { shallow } from 'enzyme';
import UserRecipe from '../../components/recipes/UserRecipe';

const props = {
  userRecipe: [{ id: 1 }],
  deleteRecipe: jest.fn(),
};

describe('UserRecipesPage', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<UserRecipe {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('simulates click', () => {
    const wrapper = shallow(<UserRecipe {...props} />);
    const btn = wrapper.find('button.btn.btn-danger');
    btn.simulate('click');
    expect(props.deleteRecipe).toHaveBeenCalled();
  });
});
