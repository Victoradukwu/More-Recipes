import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_SUCCESS,
  GET_SINGLE_RECIPE_FAILURE,
  GET_SINGLE_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  ADD_RECIPE_SUCCESS,
  MODIFY_RECIPE_FAILURE,
  MODIFY_RECIPE_SUCCESS,
  SET_SINGLE_RECIPE } from '../actionTypes/recipeActionTypes';
// Sync fetch recipes actions
export const fetchRecipesFailure = (bool, error) => ({
  type: FETCH_RECIPES_FAILURE,
  payload: { status: bool, error }
});
export const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes
});

// Async fetch recipes action (thunk)
export const fetchRecipes = url => (dispatch) => {
  axios.get(url).then((res) => {
    if (res.status === 200) {
      dispatch(fetchRecipesSuccess(res.data));
    } else {
      dispatch(fetchRecipesFailure(true));
    }
  }).catch((error) => {
    dispatch(fetchRecipesFailure(true, error));
  });
};

// Sync add recipe actions
export const addRecipeFailure = error => ({
  type: ADD_RECIPE_FAILURE,
  payload: error
});
export const addRecipeSuccess = recipe => ({
  type: ADD_RECIPE_SUCCESS,
  payload: recipe
});

export const modifyRecipeFailure = error => ({
  type: MODIFY_RECIPE_FAILURE,
  payload: error
});
export const modifyRecipeSuccess = message => ({
  type: MODIFY_RECIPE_SUCCESS,
  payload: message
});

// Async submit recipe actions --handles add recipe and modify recipe
export const submitRecipe = recipeDetails => (dispatch) => {
  if (!recipeDetails.id) {
    axios.post('api/v1/recipes', recipeDetails)
      .then((res) => {
        if (res.status === 201) {
          const { message, recipe } = res.data;
          toastr.success('Create Recipe', message);
          dispatch(addRecipeSuccess(recipe));
        }
      })
      .catch(error => dispatch(addRecipeFailure(true, error.response.data)));
  } else {
    axios.post('api/v1/recipes/:id', recipeDetails)
      .then((res) => {
        if (res.status === 201) {
          const { message, recipe } = res.data;
          toastr.success('Modify Recipe', message);
          dispatch(modifyRecipeSuccess(recipe));
        }
      })
      .catch(error => dispatch(addRecipeFailure(true, error.response.data)));
  }
};

// Sync get single recipe actions
export const getSingleRecipeFailure = (bool, error) => ({
  type: GET_SINGLE_RECIPE_FAILURE,
  payload: { status: bool, error }
});
export const getSingleRecipeSuccess = recipe => ({
  type: GET_SINGLE_RECIPE_SUCCESS,
  payload: recipe
});

// Async get signle recipe actions (Thunk)
export const getSingleRecipe = id => (dispatch) => {
  axios.get(`/api/v1/recipes/${id}`)
    .then((res) => {
      dispatch(getSingleRecipeFailure(false, {}));
      dispatch(getSingleRecipeSuccess(res.data.recipe));
    })
    .catch(error => dispatch(getSingleRecipeFailure(true, error.response.data)));
};

export const setSingleRecipe = payload => ({
  type: SET_SINGLE_RECIPE,
  payload
});

