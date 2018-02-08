import axios from 'axios';
import {toastr} from 'react-redux-toastr'
import { 
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_SUCCESS,
  ADD_RECIPE_REQUEST,
  ADD_RECIPE_FAILURE,
  ADD_RECIPE_SUCCESS } from '../actionTypes/recipeActionTypes';
// Async fetch recipes actions
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

// Sync fetch recipes action
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

// Async add recipe actions
export const addRecipeRequest = bool => ({
  type: ADD_RECIPE_REQUEST,
  payload: bool
});
export const addRecipeFailure = (bool, error) => ({
  type: ADD_RECIPE_FAILURE,
  payload: { status: bool, error }
});
export const addRecipeSuccess = message => ({
  type: ADD_RECIPE_SUCCESS,
  payload: message
});

// Sync add recipe actions
export const addRecipe = recipeDetails => (dispatch) => {
  dispatch(addRecipeRequest(true));
  axios.post('api/v1/recipes', recipeDetails)
    .then((res) => {
      if (res.status === 201) {
        const message = res.data.message;
        toastr.success('Create Recipe', message);
        dispatch(addRecipeSuccess(message));
        dispatch(addRecipeFailure(false, {}));
      }
      dispatch(addRecipeRequest(false));
    }).catch(error => dispatch(addRecipeFailure(true, error.response.data)));
};