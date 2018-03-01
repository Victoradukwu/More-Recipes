import isEmpty from 'lodash/isEmpty';
import cleanString from '../../../server/utilities/cleanString';

export const signUpValidation = (data) => {
  const name = cleanString(data.name),
    email = cleanString(data.email),
    username = cleanString(data.username),
    password = cleanString(data.password),
    confirmPassword = cleanString(data.confirmPassword),
    errors = {};

  if (!name) {
    errors.name = 'Please enter a name for the user';
  }
  if (email) {
    if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))) {
      errors.email = 'Please enter a valid email';
    }
  } else { errors.email = 'Please enter user email'; }

  if (username) {
    if (username.length < 3) {
      errors.username = 'Username should be at least three characters';
    }
  } else { errors.username = 'Please enter user name'; }

  if (password) {
    if (password.length < 5) {
      errors.password = 'minimum length of the password is 5';
    }
  } else { errors.password = 'Please enter a password'; }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Password does not match';
  }
  return { errors, isValid: isEmpty(errors) };
};


export const signInValidation = (data) => {
  const username = cleanString(data.username),
    password = cleanString(data.password),
    errors = {};
  if (!username) {
    errors.username = 'Please enter a username';
  }
  if (!password) {
    errors.password = 'Please enter a password';
  }
  return { errors, isValid: isEmpty(errors) };
};
