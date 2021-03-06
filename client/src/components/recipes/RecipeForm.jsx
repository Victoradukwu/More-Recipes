import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import ImageInput from '../common/ImageInput';

export const RecipeForm = ({
  recipe, onChange, errors, onSubmit, onImageUpload, defaultImgSrc
}) => (
  <form onSubmit={onSubmit} id="recipeForm">
    <TextInput
      name="recipeName"
      id="recipeName"
      label="Recipe Name"
      value={recipe.recipeName}
      onChange={onChange}
      error={errors.recipeName}
    />
    <TextInput
      name="category"
      label="Category"
      value={recipe.category}
      onChange={onChange}
      error={errors.category}
    />
    <TextArea
      name="ingredients"
      id="ingredients"
      label="Ingredients"
      value={recipe.ingredients}
      onChange={onChange}
      error={errors.ingredients}
    />
    <TextArea
      name="instructions"
      id="instructions"
      label="Instruction"
      value={recipe.instructions}
      onChange={onChange}
      error={errors.instructions}
    />
    <div className="row">
      <div className="col-sm-6">
        <ImageInput
          name="recipePicture"
          label="Recipe Picture"
          onChange={onImageUpload}
          error={errors.recipePicture}
        />
      </div>
      <div className="col-sm-6">
        <img
          src={defaultImgSrc}
          alt="recipe img"
          className="img-thumbnail img-fluid mb-3"
          style={{ height: '150px', width: '150px' }}
        />
      </div>
    </div>
    <button
      type="submit"
      id="addRecipebtn"
      className="btn btn-lg"
      style={{ backgroundColor: '#336600', color: 'white' }}
    >
      Submit Recipe
    </button>


  </form>
);

RecipeForm.propTypes = {
  recipe: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
  defaultImgSrc: PropTypes.string.isRequired,
};

RecipeForm.defaultProps = {
  recipe: {},
  errors: {}
};

export default RecipeForm;
