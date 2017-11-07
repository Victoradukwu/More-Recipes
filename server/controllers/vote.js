
import db from '../models/index';

const Recipe = db.Recipe;
const Vote = db.Vote;

/**
 *
 * @description controller function that handles upvoting a posted recipe.
 * if a user has voted a recipe before, his current attempt becomes invalid
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message upvote downvote
 */
const upvote = (req, res) => Vote
  // Create model instance and persist data to database
  // if not found indicating user has not voted on recipe
  .create({
    userId: req.decoded.id,
    recipeId: req.params.recipeId,
    voteType: 'up'
  })
  .then(() => Recipe
    .findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      recipe.increment('upvote')
        .then(() => {
          recipe.reload()
            .then(() => res.status(200).send({
              status: 'success',
              message: 'You hav successfully upvoted this recipe.',
              upvote: recipe.upvote,
              downvote: recipe.downvote
            }));
        });
    }))

  .catch(error => res.status(400).send(error));


  /**
 *
 * @description controller function that handles downvoting a posted recipe.
 * if a user has voted a recipe before, his current attempt becomes invalid
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message upvote downvote
 */
const downvote = (req, res) => {
  Vote
  // Create model instance and persist data to database
  // if not found indicating user has not voted on recipe
    .create({
      userId: req.decoded.id,
      recipeId: req.params.recipeId,
      voteType: 'down'
    })
    .then(() => Recipe
      .findOne({ where: { id: req.params.recipeId } })
      .then((recipe) => {
        recipe.increment('downvote')
          .then(() => {
            recipe.reload()
              .then(() => res.status(200).send({
                status: 'success',
                message: 'You hav successfully downvoted this recipe.',
                upvote: recipe.upvote,
                downvote: recipe.downvote
              }));
          });
      }))

    .catch(error => res.status(400).send(error)); 
};


const getVotes = (req, res) =>
  Vote
    .all({
      include: [{
        model: Recipe,
        attributes: ['recipeName']
      }]
    })
    .then(recipes => res.status(200).send(recipes))
    .catch(error => res.status(400).send(error));
export { upvote, downvote, getVotes };

