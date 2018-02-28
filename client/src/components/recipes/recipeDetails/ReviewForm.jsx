import React from 'react';
import PropTypes from 'prop-types';

const ReviewForm = ({
  handleCommentChange, comment, addReview, recipeId
}) => (
  <div>
    <h4>Leave a Review:</h4>
    <form>
      <div className="form-group" style={{ border: '2px solid grey' }}>
        <textarea
          className="form-control"
          rows="3"
          name="comment"
          onChange={handleCommentChange}
          value={comment}
        />
      </div>
      <button className="btn search" onClick={() => addReview(recipeId, comment)}>
        Submit
      </button>
    </form>
    <br /><br />

  </div>
);

ReviewForm.propTypes = {
  handleCommentChange: PropTypes.func.isRequired,
  comment: PropTypes.string,
  addReview: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired
};

ReviewForm.defaultProps = {
  comment: '',
};
export default ReviewForm;
