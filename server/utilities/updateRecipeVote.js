import db from '../models/index';

const { Recipe } = db;

const updateRecipeVote = async (vote) => {
  const recipe = await Recipe.findById(vote.recipeId);
  if (vote.voteType === 'up') {
    await recipe.decrement('upvote');
  } else {
    await recipe.decrement('downvote');
  }
  return recipe;
};

export default updateRecipeVote;
