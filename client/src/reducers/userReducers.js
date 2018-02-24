import {
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  SET_USER_TOKEN,
  LOG_OUT
} from '../actionTypes/userActionTypes';

export const creatingUserHasErrored = (
  state = { status: false, error: '' },
  action
) => {
  switch (action.type) {
    case CREATE_USER_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

export const createdUser = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
};

export const authenticationFailed =
  (state = { status: false, error: {} }, action) => {
    switch (action.type) {
      case LOGIN_USER_FAILURE:
        return action.payload;
      default:
        return state;
    }
  };

export const authenticationSuccess = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const authToken = (state = null, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return action.payload;
    case LOG_OUT:
      return action.payload;
    default:
      return state;
  }
};
