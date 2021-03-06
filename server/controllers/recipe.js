import db from '../models/index';
import { successHandler } from '../utilities/responseHandler';

const {
  User, Recipe, Review, Favorite
} = db;

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
    recipePicture: req.body.recipePicture,
    userId: req.decoded.id
  })
  .then((recipe) => {
    successHandler(201, recipe, res);
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
    .update({
      recipeName: req.body.recipeName || recipe.recipeName,
      category: req.body.category || recipe.category,
      ingredients: req.body.ingredients || recipe.ingredients,
      instructions: req.body.instructions || recipe.instructions,
      recipePicture: req.body.recipePicture || recipe.recipePicture
    })
    .then(() => {
      successHandler(200, recipe, res);
    }))
  .catch(error => res.status(400).json(error));

  /**
 * @description controller function that handles deletion of posted recipes
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message
 */
const deleteRecipe = (req, res) => Recipe
  .findOne({
    where:
      { userId: req.decoded.id, id: req.params.recipeId }
  })
  .then((recipe) => {
    recipe
      .destroy()
      .then(() => {
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
  if (req.query.ingredients || req.query.sort || req.query.category) {
    return next();
  }
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
 *
 * @returns {object} status message recipe
 */
const getUserRecipes = (req, res) => Recipe
  .findAll({
    where: { userId: req.decoded.id },
    order: [['id', 'DESC']]
  })
  .then((recipes) => {
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
*
* @param {object} req http request object
* @param {object} res http response object
* @returns {object} status message recipe
*/
const viewRecipe = (req, res) => Recipe
  .findOne({
    where: { id: req.params.recipeId },
    include: [
      {
        model: Review,
        as: 'reviews',
        attributes: ['comment', 'createdAt'],
        include: [{ model: User, attributes: ['name', 'profilePicture'] }]
      },
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Favorite,
        attributes: ['userId']
      }
    ]
  })
  .then((recipe) => {
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
* based on upvotes or favorites.
* @param {object} req http request object
* @param {object} res http response object
* @param {function} next
*
* @returns {object} status message recipe
*/
const getTopRecipes = (req, res, next) => {
  if (req.query.search) return next();
  if (!req.query.sort) return next();
  const { page, sort } = req.query;
  const limit = 6;
  const offset = page ? limit * (page - 1) : 0;

  return Recipe
    .findAndCountAll({
      order: [[sort, 'DESC']],
      offset,
      limit
    })
    .then((recipes) => {
      if (recipes.count > 0) {
        const pages = Math.ceil(recipes.count / limit);
        return res.status(200).json({
          status: 'success',
          message: 'recipes successfully retrieved',
          recipes: recipes.rows,
          count: recipes.count,
          pages
        });
      }
      return res.status(404).json({
        status: 'failed',
        message: 'There are no available recipes'
      });
    })
    .catch(error => res.status(500).json({
      status: 'failed',
      message: error.messsage
    }));
};


const searchRecipeName = ({ query }, res) => {
  const { search } = query;
  if (search.length < 3) {
    return res.status(403).send({
      status: 'fail',
      message: 'search string must have minimum of 3 characters'
    });
  }

  Recipe
    .findAndCountAll({
      where: {
        $or: {
          recipeName: { $iLike: `%${search}%` },
          ingredients: { $iLike: `%${search}%` },
        }
      },
    })
    .then((foundRecipes) => {
      if (foundRecipes.rows.length === 0) {
        return res.status(404).json({
          status: 'success',
          message: 'Nothing found!',
          recipes: []
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Recipe(s) found',
        recipes: foundRecipes.rows
      });
    })
    .catch(error => res.status(500).json({
      status: 'fail',
      message: `Error fetching recipes ${error.message}`
    }));
};

export { createRecipe, updateRecipe, deleteRecipe,
  getRecipes, getUserRecipes, viewRecipe, getTopRecipes, searchRecipeName };
