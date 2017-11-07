import db from '../models/index';
import { errorHandler } from '../helpers/responseHandler';

// Database models
const Favorite = db.Favorite;
const Recipe = db.Recipe;

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
 * @description Middleware function for checking if the user has already favorited the recipe
 * @param {object} req http request object
 * @param {object} res http response object
 * @param {function} next
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
        next();
      } else {
        return favorite
          .destroy()
          .then(() => errorHandler(409, 'Recipe has already been favorited', res));
      }
    })
    .catch(error => res.status(400).send(error));
};

/**
 * @description Middleware function validating user favorite befor delete
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const isValidFavorite = (req, res, next) => {
  Favorite
    .find({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    })
    .then((favorite) => {
      if (!favorite) {
        return errorHandler(409, 'This user has not favorited this recipe', res);
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};
export { validRecipe, isFavorited, isValidFavorite };
