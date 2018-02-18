import React from 'react';
import PropTypes from 'prop-types';

const Ratings = ({ recipe }) => (
  <div>
    <br /><br />

    <div className="card bg-light text-black px-0 text-center">
      <img className="card-img" src={require('../../../assets/img/lg5.jpg')} alt="Sample recipe" style={{ height: '250px' }} />
      <div className="card-body">
        <div>
          <span className="fa fa-thumbs-up fa-lg " style={{ float: 'left' }}>{recipe.upvote}</span>
          <span className="fa fa-star fa-lg" style={{ float: 'none' }}>{recipe.favorites}</span>
          <span className="fa fa-thumbs-down fa-lg" style={{ float: 'right' }}>{recipe.downvote}</span>
        </div>
      </div>
    </div>
  </div>

);
Ratings.propTypes = {
  recipe: PropTypes.object.isRequired
};
export default Ratings;
