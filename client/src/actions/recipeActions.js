import axios from 'axios';
import { FETCH_RECIPES_REQUEST, FETCH_RECIPES_FAILURE, FETCH_RECIPES_SUCCESS } from '../actionTypes/recipeActionTypes';
// Async actions
export const fetchRecipesRequest = bool => ({
  type: FETCH_RECIPES_REQUEST,
  payload: bool
});
export const fetchRecipesFailure = (bool, error) => ({
  type: FETCH_RECIPES_FAILURE,
  payload: { status: bool, error }
});
export const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes
});

// Sync action
export const fetchRecipes = url => (dispatch) => {
  dispatch(fetchRecipesRequest(true));
  axios.get(url).then((response) => {
    if (response.status === 200) {
      dispatch(fetchRecipesSuccess(response.data));
    } else {
      dispatch(fetchRecipesFailure(true));
    }
    dispatch(fetchRecipesRequest(false));
  }).catch(error => dispatch(fetchRecipesFailure(true, error)));
};
