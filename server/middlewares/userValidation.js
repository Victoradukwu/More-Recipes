
import isAlphaNumeric from '../utilities/isAlphaNum';
import cleanString from '../utilities/cleanString';
import { errorHandler } from '../utilities/responseHandler';
import db from '../models/index';


const { User } = db;

// validating user-creation input
export const basicValidation = (req, res, next) => {
  if (req.body.username && req.body.password) {
    req.body.username = cleanString(req.body.username);
    req.body.password = cleanString(req.body.password);
    req.body.confirmPassword = req.body.confirmPassword;
  }
  if (!req.body.name) {
    return errorHandler(400, 'Please enter a name for the user', res);
  }
  if (!req.body.email) {
    return errorHandler(400, 'Please enter user email', res);
  }
  if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(req.body.email))) {
    return errorHandler(400, 'Please enter a valid email', res);
  }
  if (!req.body.username) {
    return errorHandler(400, 'Please enter a username', res);
  }
  if (!isAlphaNumeric(req.body.username)) {
    return errorHandler(400, 'Only numbers and letters allowed for username', res);
  }
  if (req.body.username.length < 3) {
    return errorHandler(400, 'Username should be at least three characters', res);
  }

  if (!req.body.password) {
    return errorHandler(400, 'Please enter a password', res);
  }
  if (req.body.password.length < 5) {
    return errorHandler(400, 'minimum length of the password is 5', res);
  }
  if (req.body.password !== req.body.confirmPassword) {
    return errorHandler(409, 'Password does not match', res);
  }
  next();
};
// User login input validation
export const loginValidation = (req, res, next) => {
  if (!req.body.username) {
    return errorHandler(400, 'Please enter a username', res);
  }
  if (!req.body.password) {
    return errorHandler(400, 'Please enter a password', res);
  }
  next();
};


/**
 * @description Middleware to validate username and email existence
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} error object
 */
export const validateUsernameAndEmail = (req, res, next) => {
  const { username, email } = req.body;
  User.findOne({
    where: {
      $or: [
        { username: { $iLike: username } },
        { email: { $iLike: email } }
      ]
    }
  }).then((foundUser) => {
    const errors = {};
    if (foundUser) {
      if (foundUser.username === username) {
        errors.username = 'Username already exist';
      }
      if (foundUser.email === email) {
        errors.email = 'Email already exist';
      }
      // return response.status(409).json({
      //   status: 'Failed',
      //   errors
      // });
      return errorHandler(409, errors, res);
    }
    return next();
  });
};
