import 'jsonwebtoken';
import db from '../models/index';
import isEmpty from '../utilities/isEmpty';

const { Review } = db;

/**
 * @description Middleware function for handling input
 * validation for reviews
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const reviewBasicValidation = (req, res, next) => {
  if (!req.body.comment || isEmpty(req.body.comment)) {
    return res.status(406).send({
      status: 'fail',
      message: 'Please enter a comment'
    });
  }
  next();
};

/**
 * @description Middleware function for validating if a review exists
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const confirmReviewOwner = (req, res, next) => {
  // query the database using the supllied recipe id
  Review.findOne({
    where:
      { id: req.params.reviewId }
  })
    .then((review) => {
      if (!review) {
        return res.status(400).send({
          status: 'fail',
          message: 'this review cannot be found'
        });
      }
      if (review.userId !== req.decoded.id) {
        return res.status(401).send({
          status: 'fail',
          message: 'You are not authorised to carry out this action'
        });
      }
      req.review = review;
      next();
    });
};

export {
  reviewBasicValidation, confirmReviewOwner
};
