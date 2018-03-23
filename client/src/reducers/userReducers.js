import {
  IS_AUTHENTICATING,
  AUTHENTICATE_USER_FAILURE,
  SET_USER_ID,
  LOG_OUT,
  SET_USER
} from '../actionTypes/userActionTypes';

export const initialState = {
  authId: 0,
  isAuthenticating: false,
  isAuthenticated: false,
  authError: '',
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
        authError: '',
        user: {}
      };
      return state;
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        authError: action.error
      };
    default:
      return state;
  }
};

export default userAuthentication;
