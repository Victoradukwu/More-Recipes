import db from '../models/index';

const { Review, User } = db;


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
    User.findOne({
      where: {
        id: req.decoded.id
      },
      attributes: ['id', 'name', 'profilePicture']
    })
      .then((user) => {
        const { id, name, profilePicture } = user;
        res.status(201).send({
          status: 'success',
          message: 'successfully posted a review for this recipe.',
          review: {
            comment: review.comment,
            id: review.id,
            createdAt: review.createdAt,
            User: { id, name, profilePicture }
          }
        });
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
const updateReview = (req, res) => {
  const { review } = req;
  review.update({
    comment: req.body.comment
  })
    .then(() => {
      res.status(200).send({
        status: 'success',
        message: 'Successfully edited review',
        comment: review.comment
      });
    })
    .catch(error => res.status(400).send(error));
};

/**
 * @description controller function that handles deleting of posted reviews
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */

const deleteReview = (req, res) => {
  const { review } = req;
  review.destroy().then(() =>
    res.status(200).send({
      status: 'success',
      message: 'review has been deleted successfully',
    }))
    .catch(error => res.status(400).send({
      status: 'error',
      message: error.message,
    }));
};

export {
  createReview, updateReview, deleteReview,
};
