import db from '../models/index';

const { Recipe } = db;

const updateRecipeVote = (vote) => {
  Recipe
    .findById(vote.recipeId)
    .then((recipe) => {
      if (vote.voteType === 'up') {
        return recipe.decrement('upvote');
      }
      return recipe.decrement('downvote');
    });
};

export default updateRecipeVote;
