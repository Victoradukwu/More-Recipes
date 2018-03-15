import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/index';
import cleanString from '../utilities/cleanString';
import generateToken from '../utilities/generateToken';
import { errorHandler } from '../utilities/responseHandler';


dotenv.load();
const { User, Recipe } = db;

/**
 *
 * @description controller function that handles creation of new user account
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message token
 */
const signup = (req, res) => {
  User.create(req.body, { fields: Object.keys(req.body) })
    .then((user) => {
      if (user) {
        const token = generateToken(user);
        return res.status(201).send({
          status: 'success',
          message: 'Account created',
          token,
          user
        });
      }
    })
    .catch(error => res.status(400).send(error.message));
};

/**
 * @description controller function that handles changing user password
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const changePassword = (req, res) => User
  .findById(req.decoded.id)
  .then((user) => {
    if (!user) {
      // If user not found return an error response
      return errorHandler(404, 'User does not exist', res);
    }
    // If user exists, verify identity matches before completing request
    if (user && req.body.password && user.id === req.decoded.id) {
      // verify the length of the new password
      if (cleanString(req.body.password).length > 5) {
        return user
        // If all is well and good do the change
          .update({
            password: req.body.password
          }).then(() => res.status(200).send({
            status: 'success',
            message: 'Password changed successfully'
          }));
      }
    }
    // if password change is not successful
    return res.status(401).send({
      status: 'fail',
      message: 'Your request could not be authorized'
    });
  })
  .catch(error => res.status(400).send(error));

  /**
 * @description controller function that handles login
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message token
 */
const signin = (req, res) => {
  User.findOne({
    where: { username: req.body.username },
    include: [{
      model: Recipe,
      as: 'recipes',
      attributes: ['recipeName']
    }]
  })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          status: 'fail',
          message: 'User does not exist'
        });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).send({
          status: 'success',
          message: 'You have successfully signed in.',
          token,
          user
        });
      // If user exists but password verifcation fails, return an
      // authentication failure message to user
      } else {
        res.status(401).send({
          status: 'fail',
          message: 'Invalid Username or password'
        });
      }
    })
    .catch(error => res.status(400).send(error));
};

export { signup, changePassword, signin };
