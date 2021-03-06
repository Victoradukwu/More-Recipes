import React from 'react';
import PropTypes from 'prop-types';

const ReviewForm = ({
  handleCommentChange, comment, addReview
}) => (
  <div>
    <h4>Leave a Review:</h4>
    <form id="reviewform">
      <div className="form-group" style={{ border: '2px solid grey' }}>
        <textarea
          id="reviewtext"
          className="form-control"
          rows="3"
          name="comment"
          onChange={handleCommentChange}
          value={comment}
        />
      </div>
      <button
        id="reviewbtn"
        name="reviewtext"
        className="btn search"
        type="submit"
        onClick={event => addReview(event)}
      >
        Submit
      </button>
    </form>
    <br /><br />

  </div>
);

ReviewForm.propTypes = {
  handleCommentChange: PropTypes.func.isRequired,
  comment: PropTypes.string,
  addReview: PropTypes.func.isRequired
};

ReviewForm.defaultProps = {
  comment: '',
};
export default ReviewForm;
