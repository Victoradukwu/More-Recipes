import db from '../models/index';

// database models
const Review = db.Review;
const Recipe = db.Recipe;
const User = db.User;


/**
 * @description function which handles posting of recipe reviews
 * @param {object} req http request object
 * @param {object} res http response object
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
 * @description function which handles retrieval of reviews by a user
 * @param {object} req http request object
 * @param {object} res http response object
 * @returns {object} status message comment
 */
const getUserReviews = (req, res) => Review
  .findAll({
    where: {
      userId: req.decoded.id
    },
    include: [{
      model: Recipe,
      attributes: [Recipe.recipeName]
    }]
  })
  .then((reviews) => {
    res.status(200).send(reviews);
  })
  .catch(error => res.status(400).send(error));


/**
 * @description function which handles retrieval of reviews on a given recipe
 * @param {object} req http request object
 * @param {object} res http response object
 * @returns {object} status message comment
 */
const getRecipeReviews = (req, res) => Review
  .findAll({
    where: { recipeId: req.params.recipeId },
    include: [{
      model: User,
      attributes: [User.name]
    }]

  })
  .then((reviews) => {
    res.status(200).send(reviews);
  })
  .catch(error => res.status(400).send(error));


/**
 * @description function which handles editing recipe reviews
 * @param {object} req http request object
 * @param {object} res http response object
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

/* const viewReview = (req, res) => Review
  // Use the id supplied in the params to query database for review
  .findOne({ where: { id: req.params.reviewId } })
  .then((review) => {
    res.status(200).send(review);
  })
  .catch(error => res.status(400).send(error));
*/

export {
  createReview, getUserReviews, getRecipeReviews, updateReview, deleteReview,
};
