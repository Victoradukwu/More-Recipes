import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  GET_SINGLE_RECIPE_FAILURE,
  GET_SINGLE_RECIPE_SUCCESS,
  ADD_RECIPE_SUCCESS,
  MODIFY_RECIPE_FAILURE,
  MODIFY_RECIPE_SUCCESS,
  FETCH_USER_RECIPES_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  UPVOTE_SUCCESS,
  DOWNVOTE_SUCCESS,
  FAVORITE_SUCCESS,
  FETCH_USER_FAVORITES,
  ADD_REVIEW_SUCCESS
} from '../actionTypes/recipeActionTypes';

const addRecipeSuccess = recipe => ({
  type: ADD_RECIPE_SUCCESS,
  payload: recipe
});

const modifyRecipeFailure = error => ({
  type: MODIFY_RECIPE_FAILURE,
  payload: error
});
const modifyRecipeSuccess = recipe => ({
  type: MODIFY_RECIPE_SUCCESS,
  payload: recipe
});

export const submitRecipe = recipeDetails => (dispatch) => {
  if (recipeDetails.id) {
    return axios.put(`/api/v1/recipes/${recipeDetails.id}`, recipeDetails)
      .then((res) => {
        if (res.status === 200) {
          const { message, recipe } = res.data;
          dispatch(modifyRecipeSuccess(recipe));
          toastr.success('Modify Recipe', message);
        }
      })
      .catch((error) => {
        toastr.error('Modify Recipe', error.response.data.message);
        dispatch(modifyRecipeFailure(error));
      });
  }
  return axios.post('/api/v1/recipes', recipeDetails)
    .then((res) => {
      const { message, recipe } = res.data;
      toastr.success('Add Recipe', message);
      dispatch(addRecipeSuccess(recipe));
    })
    .catch((error) => {
      toastr.error('Add Recipe', error.response.data.message);
    });
};


const getSingleRecipeFailure = error => ({
  type: GET_SINGLE_RECIPE_FAILURE,
  payload: error
});
const getSingleRecipeSuccess = recipe => ({
  type: GET_SINGLE_RECIPE_SUCCESS,
  payload: recipe
});

export const getSingleRecipe = id => (dispatch) => {
  axios.get(`/api/v1/recipes/${id}`)
    .then((res) => {
      dispatch(getSingleRecipeSuccess(res.data.recipe));
    })
    .catch((error) => {
      toastr.error('Modify Recipe', error.response.data.message);
      dispatch(getSingleRecipeFailure(error));
    });
};


const fetchUserRecipesSuccess = recipes => ({
  type: FETCH_USER_RECIPES_SUCCESS,
  payload: recipes
});

export const fetchUserRecipes = () => dispatch =>
  axios.get('/api/v1/users/recipes')
    .then((res) => {
      dispatch(fetchUserRecipesSuccess(res.data.recipes));
    })
    .catch((error) => {
      toastr.error('Fetch user recipes', error.response.data.message);
    });

const deleteRecipeSuccess = id => ({
  type: DELETE_RECIPE_SUCCESS,
  payload: id
});


export const deleteRecipe = id => (dispatch) => {
  axios.delete(`/api/v1/recipes/${id}`)
    .then((res) => {
      dispatch(deleteRecipeSuccess(id));
      toastr.success('Delete recipe', res.data.message);
    })
    .catch((error) => {
      toastr.error('Delete recipe', error.response.data.message);
    });
};

const upvoteSuccess = recipe => ({
  type: UPVOTE_SUCCESS,
  payload: recipe
});

export const upvoteRecipe = id => (dispatch) => {
  axios.put(`/api/v1/recipes/${id}/upvote`)
    .then((res) => {
      dispatch(upvoteSuccess(res.data.recipe));
      toastr.success('Upvote recipe', res.data.message);
    })
    .catch((error) => {
      toastr.error('Upvote recipe', error.response.data.message);
    });
};


const downvoteSuccess = recipe => ({
  type: DOWNVOTE_SUCCESS,
  payload: recipe
});

export const downvoteRecipe = id => (dispatch) => {
  axios.put(`/api/v1/recipes/${id}/downvote`)
    .then((res) => {
      dispatch(downvoteSuccess(res.data.recipe));
      toastr.success('Downvote recipe', res.data.message);
    })
    .catch((error) => {
      toastr.error('Downvote recipe', error.response.data.message);
    });
};

const favoriteSuccess = recipe => ({
  type: FAVORITE_SUCCESS,
  payload: recipe
});

export const favoriteRecipe = (id, category) => (dispatch) => {
  axios.post(`/api/v1/users/${id}/favorites`, { category })
    .then((res) => {
      dispatch(favoriteSuccess(res.data.recipe));
      toastr.success('Favorite recipe', res.data.message);
    })
    .catch((error) => {
      toastr.error('Favorite recipe', error.response.data.message);
    });
};


const fetchUserFavoritesCreator = favorites => ({
  type: FETCH_USER_FAVORITES,
  payload: favorites
});

export const fetchUserFavorites = () => dispatch =>
  axios.get('/api/v1/users/favorites')
    .then(res => dispatch(fetchUserFavoritesCreator(res.data.favorites)))
    .catch((error) => {
      toastr.error('Fetch user Favorites', error.data.message);
    });

const addReviewSuccess = comment => ({
  type: ADD_REVIEW_SUCCESS,
  payload: comment
});

export const addRecipeReview = (id, comment) => dispatch =>
  axios.post(`/api/v1/recipes/${id}/review`, { comment })
    .then((res) => {
      dispatch(addReviewSuccess(res.data.comment));
      toastr.succces('Add Review', res.data.message);
    })
    .catch((error) => {
      toastr.error('Add Review', error.response.data.message);
    });
