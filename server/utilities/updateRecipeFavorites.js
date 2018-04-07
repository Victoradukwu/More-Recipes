import db from '../models/index';

const { Recipe, Favorite } = db;

// const updateRecipeFavorites = async (favorite) => {
//   const recipe = await Recipe.findById(favorite.recipeId);
//   await recipe.decrement('favorites');
//   return recipe;
// };


const updateRecipeFavorites = async (favorite) => {
  const recipe = await Recipe.findOne({
    where: { id: favorite.recipeId },
    include: [
      {
        model: Favorite,
        attributes: ['userId']
      }
    ]

  });
  await recipe.decrement('favorites');
  return recipe;
};

export default updateRecipeFavorites;

