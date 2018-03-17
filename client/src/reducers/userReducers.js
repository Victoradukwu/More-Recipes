import {
  IS_AUTHENTICATING,
  AUTHENTICATE_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  SET_USER_ID,
  LOG_OUT,
  SET_USER
} from '../actionTypes/userActionTypes';

const initialState = {
  authId: 0,
  isAuthenticating: false,
  isAuthenticated: false,
  signupError: {},
  signinError: '',
  user: {}
};

const userAuthentication = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_AUTHENTICATING:
      return {
        ...state, isAuthenticating: action.bool
      };
    case SET_USER_ID:
      return {
        ...state,
        authId: action.userId,
        isAuthenticated: !state.isAuthenticated
      };
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
      
    case LOG_OUT:
      state = {
        authId: 0,
        isAuthenticating: false,
        isAuthenticated: false,
        signupError: {},
        signinError: ''
      };
      return state;
    case AUTHENTICATE_USER_FAILURE:
      if (typeof action.error === 'string') {
        return {
          ...state,
          signinError: action.error
        };
      }
      return {
        ...state,
        signupError: action.error
      };
    default:
      return state;
  }
};

export default userAuthentication;

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
