// Import module dependencies
import db from '../models/index';

const Vote = db.Vote;

/**
 * @description Middleware function for validating that a
 *user has not previously voted for a recipe
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const voteExists = (req, res, next) => {
  Vote
    .findOne({
      where: {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    })
    .then((recipe) => {
      if (recipe) {
        return res.status(404).send({
          status: 'fail',
          message: 'You can not vote more than once for this recipe.'
        });
      }
      next();
    })
    .catch(error => res.status(403).send(error));
};

export { voteExists };
