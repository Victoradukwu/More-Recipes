import db from '../models/index';

const { Recipe } = db;

const updateRecipeFavorites = async (favorite) => {
  const recipe = await Recipe.findById(favorite.recipeId);
  await recipe.decrement('favorites');
  return recipe;
};

export default updateRecipeFavorites;

