import db from '../models/index';
import { recipeHandler } from '../helpers/responseHandler';

// Bring database models to scope
const User = db.User;
const Recipe = db.Recipe;
const Review = db.Review;

/**
 * @description This function handles creation of new recipes
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const createRecipe = (req, res) => Recipe
  .create({
    recipeName: req.body.recipeName,
    category: req.body.category,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    userId: req.decoded.id
  }, {
    // only the specified fields can be supplied by the user
    fields: [
      'recipeName', 'ingredients', 'instructions', 'userId', 'category'
    ]
  })
  .then((recipe) => {
    // return the create recipe to the user
    recipeHandler(201, recipe, res);
  })
  .catch(error => res.status(400).json(error));

/**
 * @description controller function for handling moddification of recipes
 * @param {object} req http request object
 * @param {object} res http response object
 * @returns {object} status message recipe
 */
const updateRecipe = (req, res) => Recipe
  .findOne({
    where: { userId: req.decoded.id, id: req.params.recipeId }
  })
  .then(recipe => recipe
    // If the recipe exists, update the field values using the values provided
    .update({
      recipeName: req.body.recipeName || recipe.recipeName,
      category: req.body.category || recipe.category,
      ingredients: req.body.ingredients || recipe.ingredients,
      instructions: req.body.instructions || recipe.instructions
    })
    .then(() => {
      // Return the modified recipe to the user.
      recipeHandler(200, recipe, res);
    }))
  .catch(error => res.status(400).json(error));

  /**
 * @description controller function that handles deletion of posted recipes
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const deleteRecipe = (req, res) => Recipe
// query the database using the supllied recipe id
  .findOne({
    where:
      { userId: req.decoded.id, id: req.params.recipeId }
  })
  .then((recipe) => {
    recipe
      .destroy()
      .then(() => {
        // Return a status message to user
        res.status(200).send({
          status: 'success',
          message: 'Recipe has been deleted'
        });
      });
  })

  .catch(error => res.status(400).json(error));

/**
* @description controller function for retrieving recipes from the database
* @param {object} req http request object
* @param {object} res http response object
* @param {function} next
* @returns {object} status message recipe
*/
const getRecipes = (req, res, next) => {
// Skip this function if the url has a query string
  if (req.query.ingredients || req.query.sort || req.query.category) {
    return next();
  }
  // If no query string, find all recipes. Also include their owners
  return Recipe
    .all({
      include: [{
        model: User,
        attributes: ['username']
      }]
    })
    .then(recipes => res.status(200).send({
      status: 'success',
      message: 'recipes successfully retrieved',
      recipes
    }))
    .catch(error => res.status(400).send(error));
};

/**
 * @description controller function that handles getting all recipes
 * posted by a prticular user
 * @param {object} req http request object from user
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const getUserRecipes = (req, res) => Recipe
  .findAll({ where: { userId: req.decoded.id } })
  .then((recipes) => {
  // if the user has not posted any recipe, notify him accordingly
    if (recipes.length === 0) {
      return res.status(200).send({
        message: 'You have not sumbitted any recipe yet'
      });
    }
    return res.status(200).send({
      status: 'success',
      message: 'recipes successfully retrieved',
      recipes
    });
  })
  .catch(error => res.status(400).json(error));

/**
* @description controller function that handles details of a given.
* @param {object} req http request object
* @param {object} res http response object
* @returns {object} status message recipe
*/
const viewRecipe = (req, res) => Recipe
// Use the id supplied in the params to query database for recipe
  .find({
    where: { id: req.params.recipeId },
    include: [{
      model: Review,
      attributes: ['comment'],
      as: 'reviews',
      include: [{
        model: User,
        attributes: ['name'],
      }]
    }],
  })
  .then((recipe) => {
  // Increment the view count and return new data
    recipe.increment('views').then(() => {
      recipe.reload()
        .then(() => res.status(200).send({
          status: 'success',
          message: 'recipe successfully retrieved',
          recipe
        }));
    });
  })
  .catch(error => res.status(400).send(error));

/**
* @description controller function for retrieving top recipes
* based on upvotes, returning the top 5
* @param {object} req http request object
* @param {object} res http response object
* @param {function} next
* @returns {object} status message recipe
*/
const getTopRecipes = (req, res, next) => {
// call next on the next function, if query string has no sort
  if (!req.query.sort) return next();

  return Recipe
    .findAll({
      order: [['upvote', 'DESC']],
      limit: 5
    })
    .then(recipes => res.status(200).send({
      status: 'success',
      message: 'recipes successfully retrieved',
      recipes
    }))
    .catch(error => res.status(400).json(error));
};

export { createRecipe, updateRecipe, deleteRecipe, getRecipes, getUserRecipes, viewRecipe,
  getTopRecipes };
