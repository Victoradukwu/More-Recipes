import axios from 'axios';
import jwt from 'jsonwebtoken';
import { toastr } from 'react-redux-toastr';
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  SET_USER_TOKEN,
  LOG_OUT
} from '../actionTypes/userActionTypes';
import setToken from '../helpers/setToken';

// sync action creators
export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: error
});
export const createUserSuccess = token => ({
  type: CREATE_USER_SUCCESS,
  payload: jwt.decode(token)
});

export const setUserToken = token => ({
  type: SET_USER_TOKEN,
  payload: token
});


// Async action creators (thunk)
export const createUser = userDetails => (dispatch) => {
  axios.post('api/v1/users/signup', userDetails)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      dispatch(setUserToken(token));
      dispatch(createUserSuccess(token));
      toastr.success('User Registration', res.data.message);
    })
    .catch((error) => {
      toastr.error('User Registration', error.data.message);
      dispatch(createUserFailure(error));
    });
};

export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: error
});

export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export const siginUser = credentials => (dispatch) => {
  axios.post('api/v1/users/signin', credentials)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      dispatch(setUserToken(token));
      dispatch(loginUserSuccess(res.data));
      toastr.success('User login', res.data.message);
    })
    .catch((error) => {
      toastr.error('User login', error.message);
      dispatch(loginUserFailure(error));
    });
};

export const logout = () => ({
  type: LOG_OUT,
  payload: null
});
