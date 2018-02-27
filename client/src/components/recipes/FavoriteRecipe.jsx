import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FavoriteRecipe = ({ userFavorite }) => (
  <tr>
    <td> {userFavorite.Recipe.recipeName}</td>
    <td>{userFavorite.category}</td>
    <td>
      <Link
        to={`/recipeDetail/${userFavorite.Recipe.id}`}
        className="btn search"
      >Check Details
      </Link>
    </td>

  </tr>
);

FavoriteRecipe.propTypes = {
  userFavorite: PropTypes.object.isRequired
};

export default FavoriteRecipe;
