import PropTypes from 'prop-types';
import React from 'react';

const Review = ({ review }) => (
  <div>
    <div className="row">
      <div className="col-sm-2 text-center">
        <img src={require('../../../assets/img/avatar.jpg')} className="rounded-circle" height="65" width="65" alt="Avatar" />
      </div>
      <div className="col-sm-10">
        <h5 className="media-left">{review.User.name}:<small>{(new Date(review.createdAt)).toLocaleDateString()}</small></h5>
        <p>{review.comment}</p>
      </div>
      <div className="col-sm-2" />
    </div>
    <br /><br />
  </div>
);

Review.propTypes = {
  review: PropTypes.object.isRequired
};
export default Review;
