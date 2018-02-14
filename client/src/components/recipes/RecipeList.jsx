import React from 'react';
import PropTypes from 'prop-types';
import UserRecipe from './UserRecipe';

const RecipeList = ({ userRecipes }) => {
  return (
    <table className="table">
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
          <UserRecipe key={userRecipe.Id} userRecipe={userRecipe} />) }

      </tbody>
    </table>
  );
};
RecipeList.propTypes = {
  userRecipes: PropTypes.array.isRequired
};

export default RecipeList;
