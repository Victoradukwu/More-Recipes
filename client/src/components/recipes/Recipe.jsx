import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const Recipe = ({ recipe }) => (
  <div className="card-holder">
    <div className="card bg-light text-black">
      <img
        className="card-img"
        src={recipe.recipePicture || 'http://res.cloudinary.com/victoradukwu/image/upload/v1520512629/hd1.jpg'}
        alt="Sample recipe"
        style={{ height: '250px' }}
      />
      <p
        className="card-text mt-0"
        style={{ backgroundColor: 'white', padding: '10px' }}
      >
        <span
          className="fa fa-thumbs-up fa-lg "
          style={{ float: 'left' }}
        >{recipe.upvote}
        </span>
        <span
          className="fa fa-thumbs-down fa-lg"
          style={{ float: 'right' }}
        >{recipe.downvote}
        </span>
      </p>

      <div className="card-body">
        <h4 className="card-title">{recipe.recipeName}</h4>

        <Link
          to={`/recipeDetail/${recipe.id}`}
          className="btn search"
        >Check Details
        </Link>
      </div>
    </div>
  </div>
);

Recipe.propTypes = {
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
  }).isRequired,
};
Recipe.defaultProps = {

};

export default Recipe;
