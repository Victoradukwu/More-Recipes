import React from 'react';

const ReviewForm = () => (
  <div>
  <h4 id = "reviews">Leave a Review:</h4>
      <form role="form">
        <div className="form-group" style = {{border: '2px solid grey'}}>
          <textarea className="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn search">Submit</button>
      </form>
      <br/><br/>
   
  </div>
);
export default ReviewForm;