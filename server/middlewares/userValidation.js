
import isAlphaNumeric from '../utilities/isAlphaNum';
import cleanString from '../utilities/cleanString';
import { errorHandler } from '../utilities/responseHandler';
import db from '../models/index';


const { User } = db;

// validating user-creation input
const basicValidation = (req, res, next) => {
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
  next();
};
// User login input validation
const loginValidation = (req, res, next) => {
  if (!req.body.username) {
    return errorHandler(400, 'Please enter a username', res);
  }
  if (!req.body.password) {
    return errorHandler(400, 'Please enter a password', res);
  }
  next();
};


/**
 * @description Middleware to valid username does not exist
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const validateUsername = (req, res, next) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) next();
      else {
        return errorHandler(409, 'Username is already taken', res);
      }
    })
    .catch(error => res.status(400).send(error));
};

// Middleware function validating if email is already used
const emailValidation = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) next();
      else {
        return errorHandler(409, 'Email already exists', res);
      }
    })
    .catch(error => res.status(400).send(error));
};

/** @description Middleware function for validating if password and confirmpassword are same.
 * has an account
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message
 */
const validatePassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return errorHandler(409, 'Password does not match', res);
  }
  next();
};

export { basicValidation, validateUsername,
  emailValidation, validatePassword, loginValidation };
