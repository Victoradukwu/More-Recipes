import React from 'react';
import PropTypes from 'prop-types';


const Ratings = ({
  recipe,
  upvoteRecipe,
  downvoteRecipe,
  favoriteRecipe,
  className
}) => (
  <div>
    <br />
    <br />

    <div id="ratings" className="card bg-light text-black px-0 text-center">
      <img
        className="card-img"
        src={
          recipe.recipePicture || 'http://res.cloudinary.com/victoradukwu/' +
          'image/upload/v1520509962/hd7.jpg'}
        alt="Sample recipe"
        style={{ height: '400px' }}
      />
      <div className="card-body">
        <div>
          <button
            id="upvote"
            onClick={() =>
              upvoteRecipe(recipe.id)}
            className=" btn btn-lg fa fa-thumbs-up fa-lg "
            style={{ float: 'left' }}
          >  &nbsp;
            {recipe.upvote}
          </button>
          <button
            id="favorite"
            onClick={() => {
              favoriteRecipe(recipe.id);
            }}
            className={className}
            style={{ float: 'none' }}
          />
          <button
            id="downvote"
            onClick={() =>
              downvoteRecipe(recipe.id)}
            className="btn btn-lg fa fa-thumbs-down fa-lg"
            style={{ float: 'right' }}
          >&nbsp;
            {recipe.downvote}
          </button>
        </div>
      </div>
    </div>
  </div>
);
Ratings.propTypes = {
  recipe: PropTypes.object.isRequired,
  upvoteRecipe: PropTypes.func,
  downvoteRecipe: PropTypes.func,
  favoriteRecipe: PropTypes.func,
  className: PropTypes.string.isRequired
};
Ratings.defaultProps = {
  upvoteRecipe: '',
  downvoteRecipe: '',
  favoriteRecipe: '',
};
export default Ratings;
