import axios from 'axios';
import {
  IS_RECIPES_SEARCHING,
  SEARCH_RECIPES_SUCCESS,
  SEARCH_RECIPES_FAILURE
} from '../actionTypes/recipeActionTypes';

export const isRecipeSearching = bool => ({
  type: IS_RECIPES_SEARCHING,
  bool
});
export const searchRecipesFailure = errorMessage => ({
  type: SEARCH_RECIPES_FAILURE,
  errorMessage
});
export const searchRecipesSuccess = recipes => ({
  type: SEARCH_RECIPES_SUCCESS,
  recipes
});

export const searchRecipes = searchName => (dispatch) => {
  dispatch(isRecipeSearching(true));
  return axios
    .get(`/api/v1/recipes?search=${searchName}`)
    .then((res) => {
      dispatch(searchRecipesSuccess(res.data.recipes));
      dispatch(isRecipeSearching(false));
    })
    .catch((error) => {
      dispatch(searchRecipesFailure(error.response.data.message));
      dispatch(isRecipeSearching(false));
    });
};

export default searchRecipes;
