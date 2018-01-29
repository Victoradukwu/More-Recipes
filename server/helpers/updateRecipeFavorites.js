import db from '../models/index';

const Recipe = db.Recipe;

const updateRecipeFavorites = (favorite) => {
  Recipe
    .findById(favorite.recipeId)
    .then(recipe => recipe.decrement('favorites'));
};

export default updateRecipeFavorites;
