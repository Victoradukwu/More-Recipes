import {
  ADD_RECIPE_SUCCESS,
  MODIFY_RECIPE_SUCCESS,
  FETCH_USER_RECIPES_SUCCESS,
  GET_SINGLE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAILURE,
  FAVORITE_SUCCESS,
  FETCH_USER_FAVORITES,
  ADD_REVIEW_SUCCESS,
} from '../actionTypes/recipeActionTypes';

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
        ...state, action.payload
      ];
    case MODIFY_RECIPE_SUCCESS:
      return [
        ...state.filter(recipe => recipe.id !== action.payload.id),
        action.payload
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
    case UPVOTE_FAILURE:
      return { ...state, upvote: state.action.voteType - 1 };
    case DOWNVOTE_SUCCESS:
      return action.payload;
    case DOWNVOTE_FAILURE:
      return { ...state, upvote: state.action.voteType - 1 };
    case FAVORITE_SUCCESS:
      return action.payload;
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [action.payload].concat(state.reviews)
      };
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

