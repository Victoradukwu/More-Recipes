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
  FETCH_USER_RECIPES_FAILURE,
  FETCH_USER_RECIPES_SUCCESS,
  /* SET_SINGLE_RECIPE */ } from '../actionTypes/recipeActionTypes';
// Sync fetch recipes actions
export const fetchRecipesFailure = error => ({
  type: FETCH_RECIPES_FAILURE,
  payload: error
});
export const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes
});

// Async fetch recipes action (thunk)
export const fetchRecipes = url => (dispatch) => {
  axios.get(url).then((res) => {
    if (res.status === 200) {
      toastr.success('Fetch Recipes', res.data.message);
      dispatch(fetchRecipesSuccess(res.data));
    } else {
      dispatch(fetchRecipesFailure(true));
    }
  }).catch((error) => {
    toastr.error('Fetch Recipes', error.message);
    dispatch(fetchRecipesFailure(error));
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
export const modifyRecipeSuccess = recipe => ({
  type: MODIFY_RECIPE_SUCCESS,
  payload: recipe
});

// Async submit recipe actions --handles add recipe and modify recipe
export const submitRecipe = recipeDetails => (dispatch) => {
  if (recipeDetails.id) {
    axios.put(`api/v1/recipes/${recipeDetails.id}`, recipeDetails)
      .then((res) => {
        if (res.status === 200) {
          const { message, recipe } = res.data;
          toastr.success('Modify Recipe', message);
          dispatch(modifyRecipeSuccess(recipe));
        }
      })
      .catch((error) => {
        toastr.error('Modify Recipe', error.message);
        dispatch(modifyRecipeFailure(error));
      });
  } else {
    axios.post('api/v1/recipes', recipeDetails)
      .then((res) => {
        const { message, recipe } = res.data;
        toastr.success('Add Recipe', message);
        dispatch(addRecipeSuccess(recipe));
      })
      .catch(error => dispatch(addRecipeFailure(error)));
  }
};

// Sync get single recipe actions
export const getSingleRecipeFailure = error => ({
  type: GET_SINGLE_RECIPE_FAILURE,
  payload: error
});
export const getSingleRecipeSuccess = recipe => ({
  type: GET_SINGLE_RECIPE_SUCCESS,
  payload: recipe
});

// Async get signle recipe actions (Thunk)
export const getSingleRecipe = id => (dispatch) => {
  axios.get(`/api/v1/recipes/${id}`)
    .then((res) => {
      toastr.success('Get a recipe', res.data.message);
      dispatch(getSingleRecipeSuccess(res.data.recipe));
    })
    .catch((error) => {
      toastr.success('Modify Recipe', error.message);
      dispatch(getSingleRecipeFailure(error));
    });
};

// export const setSingleRecipe = payload => ({
//   type: SET_SINGLE_RECIPE,
//   payload
// });
export const fetchUserRecipesFailure = error => ({
  type: FETCH_USER_RECIPES_FAILURE,
  payload: error
});
export const fetchUserRecipesSuccess = recipes => ({
  type: FETCH_USER_RECIPES_SUCCESS,
  payload: recipes
});

// Async get user recipes actions (Thunk)
export const fetchUserRecipes = () => dispatch =>
  axios.get('/api/v1/users/recipes')
    .then((res) => {
      // toastr.success('Fetch user recipes', res.data.message);
      dispatch(fetchUserRecipesSuccess(res.data.recipes));
    })
    .catch((error) => {
      toastr.success('Fetch user recipes', error.message);
      dispatch(fetchUserRecipesFailure(error));
    });

