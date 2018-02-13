import {
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_SUCCESS,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  // SET_SINGLE_RECIPE,
  GET_SINGLE_RECIPE_SUCCESS,
  // GET_SINGLE_RECIPE_FAILURE
} from '../actionTypes/recipeActionTypes';

export const fetchRecipeFailure = (state =
  { status: false, error: '' }, action) => {
  switch (action.type) {
    case FETCH_RECIPES_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

export const fetchRecipeSuccess = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
};

export const addRecipeFailure = (
  state = { status: false, error: '' },
  action
) => {
  switch (action.type) {
    case ADD_RECIPE_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

export const addRecipeSuccess = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case ADD_RECIPE_SUCCESS:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
};

export const singleRecipe = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_RECIPE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

