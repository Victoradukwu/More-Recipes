import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const UserRecipe = ({ userRecipe }) => {
  return (
    <tr>
      <td><Link to={`/recipe/${userRecipe.id}`}>{userRecipe.recipeName}</Link></td>
      <td>{userRecipe.upvote}</td>
      <td>{userRecipe.downvote}</td>
      <td>{userRecipe.favorites}</td>
      <td>{userRecipe.views}</td>
      <td><button className="btn btn-danger">Delete</button></td>

    </tr>
  );
};

UserRecipe.propTypes = {
  userRecipe: PropTypes.object.isRequired
};
export default UserRecipe;
