// Import module dependencies
import db from '../models/index';
import { errorHandler } from '../helpers/responseHandler';

// Reference database models
const Favorite = db.Favorite;
const Recipe = db.Recipe;

/**
 * @description Middleware function for validating if a recipe exists
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const validRecipe = (req, res, next) => {
  Recipe
    .find({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      if (recipe) return next();
      return errorHandler(
        404, 'Recipe not found', res
      );
    })
    .catch(error => res.status(400).send(error));
};

/**
 * @description Middleware function for validating if a favorite recipe exists
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const favoriteExists = (req, res, next) => {
  Favorite
    .find({ where: {
      userId: req.decoded.user.id,
      recipeId: req.params.recipeId }
    })
    .then((favorite) => {
      if (favorite) {
        return errorHandler(
          409, 'Recipe has already been favorited', res
        );
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

const isValidFavorite = (req, res, next) => {
  Favorite
    .find({ where: {
      userId: req.decoded.user.id,
      recipeId: req.params.recipeId }
    })
    .then((favorite) => {
      if (!favorite) {
        return errorHandler(
          409, 'Recipe has not been added to favorite', res
        );
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};
export { validRecipe, favoriteExists, isValidFavorite };
