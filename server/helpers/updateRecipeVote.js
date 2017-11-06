import db from '../models/index';

const Recipe = db.Recipe;

const updateRecipeVote = vote => Recipe
  .findById(vote.recipedId)
  .then((recipe) => {
    if (vote.voteType === 'up') {
      return recipe.decrement('upvote');
    }
    return recipe.decrement('downvote');
  });

export default updateRecipeVote;
