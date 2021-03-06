import React from 'react';
import PropTypes from 'prop-types';
import UserRecipe from './UserRecipe';

const RecipeList = ({ userRecipes, deleteRecipe }) => (
  <table id="userRecipes" className="table tableResponsive w-auto table-hover">
    <thead>
      <tr>
        <th>Recipe Name</th>
        <th>Upvotes</th>
        <th>Downvotes</th>
        <th>Favorites</th>
        <th>views</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      { userRecipes.map(userRecipe =>
        (<UserRecipe
          key={userRecipe.id}
          deleteRecipe={deleteRecipe}
          userRecipe={userRecipe}
        />)) }

    </tbody>
  </table>
);
RecipeList.propTypes = {
  userRecipes: PropTypes.array.isRequired,
  deleteRecipe: PropTypes.func.isRequired
};

export default RecipeList;
