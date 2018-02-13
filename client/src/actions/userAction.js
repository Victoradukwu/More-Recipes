import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  SET_USER_TOKEN
} from '../actionTypes/userActionTypes';
import setToken from '../helpers/setToken';

// sync action creators
export const creatingUserHasErrored = (bool, error) => ({
  type: CREATE_USER_FAILURE,
  payload: { status: bool, error }
});
export const createdUser = token => ({
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
      if (res.status === 201) {
        const { token } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        dispatch(setUserToken(token));
        dispatch(createdUser(token));
        dispatch(creatingUserHasErrored(false, {}));
      }
      if (res.data.status === 'fail') {
        dispatch(creatingUserHasErrored(true));
      }
    }).catch(error =>
      dispatch(creatingUserHasErrored(true, error.response.data)));
};

export const authenticationFailed = (bool, error) => ({
  type: LOGIN_USER_FAILURE,
  payload: { status: bool, error }
});

export const authenticationSucess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export const siginUser = credentials => (dispatch) => {
  axios.post('api/v1/users/signin', credentials)
    .then((response) => {
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        dispatch(setUserToken(token));
        dispatch(authenticationSucess(response.data));
        dispatch(authenticationFailed(false, {}));
      } else {
        dispatch(authenticationFailed(true, response.data));
      }
    }).catch(error => dispatch(authenticationFailed(true, error.response.data)));
};
