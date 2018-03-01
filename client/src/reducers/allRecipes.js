import {
  IS_RECIPES_FETCHING,
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_SUCCESS
} from '../actionTypes/recipeActionTypes';

const initialState = {
  isFetching: false,
  fetchedAllRecipes: [],
  fetchRecipesFailure: '',
  pages: 1
};

const allRecipes = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_RECIPES_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.bool
      });
    case FETCH_RECIPES_SUCCESS:
      return Object.assign({}, state, {
        fetchedAllRecipes: action.allRecipes.recipes,
        pages: action.allRecipes.pages
      });
    case FETCH_RECIPES_FAILURE:
      return Object.assign({}, state, {
        fetchRecipesFailure: action.errorMessage
      });
    default:
      return state;
  }
};

export default allRecipes;
