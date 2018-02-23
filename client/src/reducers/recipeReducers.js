import {
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_SUCCESS,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  MODIFY_RECIPE_SUCCESS,
  FETCH_USER_RECIPES_SUCCESS,
  GET_SINGLE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  UPVOTE_SUCCESS,
  DOWNVOTE_SUCCESS,
  FAVORITE_SUCCESS
  // GET_SINGLE_RECIPE_FAILURE
} from '../actionTypes/recipeActionTypes';

export const fetchRecipeFailure = (state = { error: '' }, action) => {
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
      return action.payload;
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

export const modifyRecipeSuccess = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case ADD_RECIPE_SUCCESS:
      return [
        ...state, Object.assign({}, action.payload)
      ];
    case MODIFY_RECIPE_SUCCESS:
      return [
        ...state.filter(recipe => recipe.id !== action.payload.id),
        action.payload
      ];
    case UPVOTE_SUCCESS:
      return [
        ...state.filter(recipe => recipe.id !== action.payload.id),
        action.payload
      ];
    case DOWNVOTE_SUCCESS:
      return [
        ...state.filter(recipe => recipe.id !== action.payload.id),
        action.payload
      ];
    case FAVORITE_SUCCESS:
      return [
        ...state.filter(recipe => recipe.id !== action.payload.id),
        action.payload
      ];
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

// export const deleteRecipe = (state = [], action) => {
//   switch (action.type) {
//     case DELETE_RECIPE_SUCCESS:
//       return state.filter((data, i) => i !== action.id);
//     default:
//       return state;
//   }
// };

