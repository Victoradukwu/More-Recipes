import {
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  MODIFY_RECIPE_SUCCESS,
  FETCH_USER_RECIPES_SUCCESS,
  GET_SINGLE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  UPVOTE_SUCCESS,
  DOWNVOTE_SUCCESS,
  FAVORITE_SUCCESS,
  FETCH_USER_FAVORITES,
  ADD_REVIEW_SUCCESS
  // GET_SINGLE_RECIPE_FAILURE
} from '../actionTypes/recipeActionTypes';

const initialState = {
  postedReview: ''
};

export const addRecipeFailure = (state = { error: '' }, action) => {
  switch (action.type) {
    case ADD_RECIPE_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

export const modifyRecipeSuccess = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const fetchUserRecipesSuccess = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_RECIPES_SUCCESS:
      return action.payload;
    case DELETE_RECIPE_SUCCESS:
      return state.filter(data => data.id !== action.payload);
    case ADD_RECIPE_SUCCESS:
      return [
        ...state, Object.assign({}, action.payload)
      ];
    case MODIFY_RECIPE_SUCCESS:
      return [
        ...state.filter(recipe => recipe.id !== action.payload.id),
        Object.assign({}, action.payload)
      ];
    default:
      return state;
  }
};

export const singleRecipe = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_RECIPE_SUCCESS:
      return action.payload;
    case UPVOTE_SUCCESS:
      return action.payload;
    case DOWNVOTE_SUCCESS:
      return action.payload;
    case FAVORITE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const userFavorites = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_FAVORITES:
      return action.payload;
    default:
      return state;
  }
};

export const reviewRecipe = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW_SUCCESS:
      return Object.assign({}, ...state, { postedReview: action.payload });
    default:
      return state;
  }
};

