import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review.jsx';

const ReviewsList = ({ recipe }) => {
  const { reviews } = recipe;
  return (
    <div>
      <p><span className="badge">{reviews.length}</span> Reviews:</p><br />
      { reviews.map(review => <Review key={review.id} review={review} />) }
    </div>
  );
};

ReviewsList.propTypes = {
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
ReviewsList.defaultProps = {
  recipe: {}
};
export default ReviewsList;
