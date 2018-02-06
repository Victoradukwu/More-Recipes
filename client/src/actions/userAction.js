import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  SET_USER_TOKEN
} from '../actionTypes/userActionTypes';
import setToken from '../helpers/setToken';

// sync action creators
export const creatingUser = bool => ({
  type: CREATE_USER_REQUEST,
  payload: bool
});
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


// Async action creators
export const createUser = userDetails => (dispatch) => {
  dispatch(creatingUser(true));
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
      dispatch(creatingUser(false));
    }).catch(error => dispatch(creatingUserHasErrored(true, error.response.data)));
};

export const authenticatingUser = bool => ({
  type: LOGIN_USER_REQUEST,
  payload: bool
});

export const authenticationFailed = (bool, error) => ({
  type: LOGIN_USER_FAILURE,
  payload: { status: bool, error }
});

export const authenticationSucess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export const siginUser = credentials => (dispatch) => {
  dispatch(authenticatingUser(true));

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
