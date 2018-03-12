import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import {
  IS_AUTHENTICATING,
  AUTHENTICATE_USER_FAILURE,
  SET_USER_ID,
  LOG_OUT,
  SET_USER,
} from '../actionTypes/userActionTypes';
import setAuthorizationToken from '../helpers/setAuthorizationToken';


const isAuthenticating = bool => ({
  type: IS_AUTHENTICATING,
  bool
});

const userAuthenticationFailure = error => ({
  type: AUTHENTICATE_USER_FAILURE,
  error
});

const setUserId = userId => ({
  type: SET_USER_ID,
  userId
});

const setUser = user => ({
  type: SET_USER,
  user
});


export const authenticateUser = (userDetails, path) => (dispatch) => {
  const route = `/api/v1/users/${path}`;
  dispatch(isAuthenticating(true));
  axios.post(route, userDetails)
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch(setUserId(jwt.decode(token).id));
      dispatch(setUser(user));
      toastr.success(res.data.message);
      dispatch(isAuthenticating(false));
    })
    .catch((error) => {
      dispatch(userAuthenticationFailure(error.response.data.message));
      dispatch(isAuthenticating(false));
    });
};

export const logout = () => ({
  type: LOG_OUT,
  payload: null
});
