import db from '../models/index';

// Favorites databsae table
const Favorite = db.Favorite;

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
    category: req.body.category
  })
  .then(() => res.status(201).send({
    status: 'success',
    message: 'Recipe successfully added to favorites'
  }))
  // if any error occurs
  .catch(error => res.status(400).send(error));

/**
 * @description controller function to get a user favorite recipes
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const getUserFavorites = (req, res) => {
  // validate user identity using the token received
  const userId = req.decoded.id;
  return Favorite
    .findAll({ where: { userId } })
    .then((favorites) => {
      if (!favorites.length) {
        return res.status(200).send({
          message: 'Your favorite recipe list is empty'
        });
      }
      return res.status(200).send(favorites);
    })
    .catch(error => res.status(400).send(error));
};

/**
 * @description function that deletes a user favorite on recipe
 * @param {object} req http request object
 * @param {object} res http response object
 * @returns {object} status message
 */
const deleteFavorite = (req, res) => {
  const userId = req.decoded.id,
    recipeId = req.params.recipeId;
  return Favorite
    .findOne({ where: { userId, recipeId } })
    .then(favorite =>
      favorite.destroy().then(() => res.status(200).send({
        status: 'success',
        message: 'Recipe successfully removed from favorites'
      })))
    .catch(error => res.status(400).send(error));
};


export { addFavorite, getUserFavorites, deleteFavorite };
