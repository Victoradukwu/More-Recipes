import db from '../models/index';

// Favorites databsae table
const { Favorite } = db;
const { Recipe } = db;


/**
 * @description controller function for favoriting recipes
 * @param {object} req http request object
 * @param {object} res http response object
 * @returns {object} status message
 */
const addFavorite = (req, res) => Favorite
  .create({
    userId: req.decoded.id,
    recipeId: req.params.recipeId,
    category: req.body.category || ''
  })
  .then(() => Recipe
    .findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      recipe.increment('favorites')
        .then(() => {
          recipe.reload()
            .then(() => res.status(200).json({
              status: 'success',
              message: 'You have successfully added this recipe to favorites.',
              recipe
            }));
        });
    }))

  // if any error occurs
  .catch(error => res.status(400).send(error));

/**
 * @description controller function to get a user favorite recipes
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message
 */
const getUserFavorites = (req, res) => {
  // validate user identity using the token received
  const userId = req.decoded.id;
  return Favorite
    .findAll({
      where: { userId },
      attributes: ['category'],
      include: [
        {
          model: Recipe,
          attributes: ['recipeName', 'id']
        }
      ]
    })
    .then((favorites) => {
      if (!favorites.length) {
        return res.status(200).send({
          message: 'Your favorite recipe list is empty'
        });
      }
      return res.status(200).send({
        status: 'success',
        message: 'recipes successfully retrieved',
        favorites
      });
    })
    .catch(error => res.status(400).send(error));
};


export { addFavorite, getUserFavorites };
