// import shortid from 'short-id';
import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_SUCCESS
} from '../actionTypes/recipeActionTypes';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  SET_USER_TOKEN
} from '../actionTypes/userActionTypes';
// import {
//   ADD_MESSAGE_REQUEST,
//   ADD_MESSAGE_FAILURE,
//   ADD_MESSAGE_SUCCESS

// } from '../actionTypes/flashMessageActionTypes';

export const fetchingRecipes = (state = false, action) => {
  switch (action.type) {
    case FETCH_RECIPES_REQUEST:
      return action.payload;
    default:
      return state;
  }
};

export const fetchingRecipesHasErrored = (state = { status: false, error: '' }, action) => {
  switch (action.type) {
    case FETCH_RECIPES_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

export const fetchedRecipes = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
};


export const creatingUser = (state = false, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return action.payload;
    default:
      return state;
  }
};

export const creatingUserHasErrored = (state = { status: false, error: '' }, action) => {
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

export const authenticatingUser = (state = false, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return action.payload;
    default:
      return state;
  }
};

export const authenticationFailed = (state = {status: false, error: {}}, action) => {
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
    default:
      return state;
  }
};

// export const addMessage = (state = [], action) => {
//   switch (action.type) {
//     case ADD_MESSAGE_SUCCESS:
//       return [...state, {
//         id: shortid.generate(),
//         type: action.message.type,
//         text: action.message.text
//       }];
//     default:
//       return state;
//   }
// };
