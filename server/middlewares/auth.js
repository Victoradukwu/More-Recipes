// import module dependencies
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorHandler } from '../utilities/responseHandler';


dotenv.load();
const { secret } = process.env;

/**
 * @description Middleware that authenticates token
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status
 */
const auth = (req, res, next) => {
  const token = req.body.token || req.query.token ||
  req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return errorHandler(
            403,
            'Expired session. Please sign in again', res
          );
        }
        return errorHandler(403, 'Bad Token', res);
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return errorHandler(403, 'No Token provided', res);
  }
};
export default auth;
