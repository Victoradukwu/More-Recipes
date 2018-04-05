import axios from 'axios';
import {
  IS_RECIPES_FETCHING,
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_SUCCESS
} from '../actionTypes/recipeActionTypes';

export const isRecipesFetching = bool => ({
  type: IS_RECIPES_FETCHING,
  bool
});
export const fetchRecipesFailure = errorMessage => ({
  type: FETCH_RECIPES_FAILURE,
  errorMessage
});
export const fetchRecipesSuccess = allRecipes => ({
  type: FETCH_RECIPES_SUCCESS,
  allRecipes
});

export const fetchRecipesRequest = (sortTerm, selectedPage = 1) =>
  (dispatch) => {
    dispatch(isRecipesFetching(true));
    return axios
      .get(`/api/v1/recipes?sort=${sortTerm}&order=des&page=${selectedPage}`)
      .then((res) => {
        dispatch(fetchRecipesSuccess(res.data));
        dispatch(isRecipesFetching(false));
      })
      .catch((error) => {
        dispatch(fetchRecipesFailure(error.response.data.message));
        dispatch(isRecipesFetching(false));
      });
  };

export default fetchRecipesRequest;
