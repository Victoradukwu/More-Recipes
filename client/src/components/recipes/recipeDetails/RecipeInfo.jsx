import React from 'react';
import PropTypes from 'prop-types';

const RecipeInfo = ({ recipe }) => (
  <div>
    <br /><br /><br />
    <h2>{recipe.recipeName}</h2>
    <h5>{recipe.User && recipe.User.name}, on  {(new Date(recipe.createdAt)).toLocaleDateString()}.</h5><br />
    <h4 id="ingredients">Ingredients:</h4>
    <p>{recipe.ingredients}</p>
    <br /><br />

    <h4 id="instructions">Instructions:</h4>
    <p>{recipe.instructions}</p>
    <br /><br />
  </div>
);
RecipeInfo.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    recipeName: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    views: PropTypes.number,
    favorites: PropTypes.number,
    createdAt: PropTypes.any,
    updatedAt: PropTypes.any,
    userId: PropTypes.number,
    reviews: PropTypes.array,
    User: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  })
};
RecipeInfo.defaultProps = {
  recipe: {}
};
export default RecipeInfo;
