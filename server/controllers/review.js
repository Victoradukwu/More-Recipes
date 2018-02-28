import db from '../models/index';

// database models
const { Review } = db;
const { Recipe } = db;


/**
 * @description function which handles posting of recipe reviews
 *
 * @param {object} req http request object
 * @param {object} res http response object
 *
 * @returns {object} status message comment
 */
const createReview = (req, res) => Review
  .create({
    recipeId: req.params.recipeId,
    userId: req.decoded.id,
    comment: req.body.comment
  })
  .then((review) => {
    res.status(201).send({
      status: 'success',
      message: 'succeSssfully posted a review for this recipe.',
      comment: review.comment
    });
  })
  .catch(error => res.status(400).send(error));


/**
 * @description function which handles editing recipe reviews
 *
 * @param {object} req http request object
 * @param {object} res http response object
 *
 * @returns {object} status message comment
 */
const updateReview = (req, res) => Review
  .findById(req.params.reviewId)
  .then(review => review
    .update({
      comment: req.body.comment
    })
    .then(() => {
      res.status(200).send({
        status: 'success',
        message: 'SucceSssfully edited review',
        comment: review.comment
      });
    }))
  .catch(error => res.status(400).send(error));
/**
 * @description controller function that handles deleting of posted reviews
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const deleteReview = (req, res) => Recipe
// query the database using the supllied review id
  .findOne({
    where:
      { userId: req.decoded.id, id: req.params.reviewId }
  })
  .then((review) => {
    review
      .destroy()
      .then(() => {
        // Return a status message to user
        res.status(200).send({
          status: 'success',
          message: 'Review has been deleted'
        });
      });
  })

  .catch(error => res.status(400).json(error));


export {
  createReview, updateReview, deleteReview,
};
