import {
  IS_RECIPES_SEARCHING,
  SEARCH_RECIPES_SUCCESS,
  SEARCH_RECIPES_FAILURE
} from '../actionTypes/recipeActionTypes';

const initialState = {
  isSearching: false,
  searchedRecipes: [],
  searchRecipesFailure: ''
};

const searchRecipes = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_RECIPES_SEARCHING:
      return {
        ...state,
        isFetching: action.bool,
      };
    case SEARCH_RECIPES_SUCCESS:
      return {
        ...state,
        searchedRecipes: action.recipes
      };
    case SEARCH_RECIPES_FAILURE:
      return {
        ...state,
        searchRecipesFailure: action.errorMessage
      };
    default:
      return state;
  }
};

export default searchRecipes;
