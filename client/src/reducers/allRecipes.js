import {
  IS_RECIPES_FETCHING,
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_SUCCESS
} from '../actionTypes/recipeActionTypes';

export const initialState = {
  isFetching: false,
  fetchedAllRecipes: [],
  fetchRecipesFailure: '',
  pages: 1
};

const allRecipes = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_RECIPES_FETCHING:
      return {
        ...state,
        isFetching: action.bool
      };

    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        fetchedAllRecipes: action.allRecipes.recipes,
        pages: action.allRecipes.pages
      };

    case FETCH_RECIPES_FAILURE:
      return {
        ...state,
        fetchRecipesFailure: action.errorMessage
      };

    default:
      return state;
  }
};

export default allRecipes;
