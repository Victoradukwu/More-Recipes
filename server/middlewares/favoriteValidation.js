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
    .findOne({
      where: {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    })
    .then((favorite) => {
      // if this user has not voted for this recipe, go ahead and vote
      if (!favorite) {
        return next();
      }
      favorite
        .destroy()
        .then(() => {
          updateRecipeFavorites(favorite.dataValues)
            .then(recipe => res.status(200).send({
              status: 'success',
              message: 'recipe has been removed from favorites',
              recipe,
            }));
        });
    })
    .catch(error => res.status(403).send(error));
};


export { validRecipe, isFavorited };
