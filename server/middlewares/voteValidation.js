// Import module dependencies
import db from '../models/index';
import updateRecipeVote from '../helpers/updateRecipeVote';

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
    .then((vote) => {
      // if this user has not voted for this recipe, go ahead and vote
      if (!vote) {
        return next();
      }
      return vote
        .destroy()
        .then(() => {
          updateRecipeVote(vote);
          res.status(404).send({
            status: 'fail',
            message: 'You cannot vote more than once for this recipe. Your existing vote has been cancelled.'
          });
        });
    })
    .catch(error => res.status(403).send(error));
};


export default voteExists;
