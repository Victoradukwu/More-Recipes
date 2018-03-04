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
const reviewExists = (req, res, next) => {
  Review
    .find({ where: { id: req.params.reviewId } })
    .then((review) => {
      if (!review) {
        return res.status(404).send({
          status: 'fail',
          message: 'No such review'
        });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

const confirmReviewOwner = (req, res, next) => {
  Review
  // query the database using the supllied recipe id
    .findOne({
      where:
        { userId: req.decoded.id, id: req.params.reviewId }
    })
    .then((review) => {
      // user should not deleted review that is not his own
      if (req.decoded.id !== review.userId) {
        res.status(401).send({
          status: 'fail',
          message: 'You are not authorised to carry out this action'
        });
      }
      next();
    });
};

export {
  reviewBasicValidation, reviewExists, confirmReviewOwner
};
