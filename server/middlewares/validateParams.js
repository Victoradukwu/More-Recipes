// Import module dependencies
import isNumber from '../helpers/isNumber';
import { errorHandler } from '../helpers/responseHandler';

/**
 * @description Middleware function for validating params
 * is an integer
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const validate = (req, res, next) => {
  if (isNumber(req.params.recipeId)) return next();
  return errorHandler(422, 'You have entered an invalid parameter', res);
};

export default validate;
