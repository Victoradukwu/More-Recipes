// Import module dependencies
import db from '../models/index';
import updateRecipeVote from '../utilities/updateRecipeVote';

const { Vote } = db;

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
      vote
        .destroy()
        .then(() => {
          updateRecipeVote(vote.dataValues).then((recipe) => {
            return res.status(200).send({
              status: 'success',
              message: 'vote has been removed on recipe',
              recipe,
            });
          });
        });
    })
    .catch(error => res.status(403).send(error));
};


export default voteExists;
