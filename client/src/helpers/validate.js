import isEmpty from 'lodash/isEmpty';

const validate = (field) => {
  const errors = {};

  if (!field.recipeName) {
    errors.recipeName = 'Recipe name field is required';
  }

  if (!field.ingredients) {
    errors.ingredients = 'Ingredients field is required';
  }

  if (!field.instructions) {
    errors.instructions = 'Instructions field is required';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};

export default validate;
