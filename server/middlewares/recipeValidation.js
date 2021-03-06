// Import module dependencies
import db from '../models/index';
import isEmpty from '../utilities/isEmpty';

const { Recipe } = db;

/**
 * @description Middleware function for handling input
 * validation for recipes
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const recipeBasicValidation = (req, res, next) => {
  if (!req.body.recipeName || isEmpty(req.body.recipeName)) {
    return res.status(406).send({
      status: 'fail',
      message: 'Please enter a recipe name'
    });
  }
  if (!req.body.ingredients || isEmpty(req.body.ingredients)) {
    return res.status(406).send({
      status: 'fail',
      message: 'Ingredients field cannot be empty'
    });
  }
  if (!req.body.instructions || isEmpty(req.body.instructions)) {
    return res.status(406).send({
      status: 'fail',
      message: 'Instructions field cannot be empty'
    });
  }
  next();
};

/**
 * @description Middleware function for validating if a recipe exists
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const recipeExists = (req, res, next) => {
  Recipe
    .find({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send({
          status: 'fail',
          message: 'Recipe not found'
        });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};


/**
 * @description Middleware function that prevents a user from adding multiple
 * recipes of the same name
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const preventRecipeDuplicate = (req, res, next) => {
  Recipe
    .find({
      where:
      { userId: req.decoded.id, recipeName: req.body.recipeName }
    })
    .then((recipe) => {
      if (recipe) {
        return res.status(403).send({
          status: 'fail',
          message: 'You can not have multiple recipes with same name'
        });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};


const confirmRecipeOwner = (req, res, next) => {
  Recipe
  // query the database using the supllied recipe id
    .findOne({
      where:
        { userId: req.decoded.id, id: req.params.recipeId }
    })
    .then((recipe) => {
      // user should not modify or delete recipe that is not his own
      if (!recipe) {
        res.status(401).send({
          status: 'fail',
          message: 'You are not authorised to carry out this action'
        });
        return;
      }
      next();
    });
};

export {
  recipeBasicValidation,
  recipeExists,
  confirmRecipeOwner,
  preventRecipeDuplicate };
