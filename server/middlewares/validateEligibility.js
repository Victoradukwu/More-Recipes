// Import module dependencies
import db from '../models/index';

const { Recipe } = db;

const validateEligibility = (req, res, next) => Recipe
  .findById(req.params.recipeId)
  .then((recipe) => {
    if (recipe.userId === req.decoded.id) {
      return res.status(403).send({
        status: 'fail',
        message: 'You can neither vote nor favorite your own recipe'
      });
    }
    return next();
  })
  .catch(error => res.status(403).send(error));
export default validateEligibility;

