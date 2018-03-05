import db from '../models/index';
import updateRecipeFavorites from '../utilities/updateRecipeFavorites';
import { errorHandler } from '../utilities/responseHandler';

// Database models
const { Favorite } = db;
const { Recipe } = db;

/**
 * @description Middleware function to check for existing recipe
 * @param {object} req http request object
 * @param {object} res http response object
 * @param {function} next
 * @returns {object} status message
 */
const validRecipe = (req, res, next) => {
  Recipe
    .find({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      if (recipe) return next();
      return errorHandler(404, 'Recipe not found', res);
    })
    .catch(error => res.status(400).send(error));
};

/**
 * @description Middleware function for checking if the user has already f
 * avorited the recipe
 *
 * @param {object} req http request object
 * @param {object} res http response object
 * @param {function} next
 *
 * @returns {object} status message
 */
const isFavorited = (req, res, next) => {
  Favorite
    .find({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    })
    .then((favorite) => {
      if (!favorite) {
        return next();
      }
      return favorite
        .destroy()
        .then(() => {
          updateRecipeFavorites(favorite.dataValues);
          errorHandler(409, 'Recipe has already been favorited', res);
        });
    })
    .catch(error => res.status(400).send(error));
};
export { validRecipe, isFavorited };
