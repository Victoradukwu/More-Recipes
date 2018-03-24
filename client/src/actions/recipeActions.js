import axios from 'axios';
import toastr from 'toastr';
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
  ADD_REVIEW_SUCCESS,
} from '../actionTypes/recipeActionTypes';

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

export const submitRecipe = recipeDetails => (dispatch) => {
  if (recipeDetails.id) {
    return axios.put(`/api/v1/recipes/${recipeDetails.id}`, recipeDetails)
      .then((res) => {
        if (res.status === 200) {
          const { message, recipe } = res.data;
          dispatch(modifyRecipeSuccess(recipe));
          toastr.success(message);
        }
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
        dispatch(modifyRecipeFailure(error.response.data));
      });
  }
  return axios.post('/api/v1/recipes', recipeDetails)
    .then((res) => {
      const { message, recipe } = res.data;
      toastr.success(message);
      dispatch(addRecipeSuccess(recipe));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
};


export const getSingleRecipeFailure = error => ({
  type: GET_SINGLE_RECIPE_FAILURE,
  payload: error
});
export const getSingleRecipeSuccess = recipe => ({
  type: GET_SINGLE_RECIPE_SUCCESS,
  payload: recipe
});

export const getSingleRecipe = id => dispatch =>
  axios.get(`/api/v1/recipes/${id}`)
    .then((res) => {
      dispatch(getSingleRecipeSuccess(res.data.recipe));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
      dispatch(getSingleRecipeFailure(error.response.data));
    });


export const fetchUserRecipesSuccess = recipes => ({
  type: FETCH_USER_RECIPES_SUCCESS,
  payload: recipes
});

export const fetchUserRecipes = () => dispatch =>
  axios.get('/api/v1/users/recipes')
    .then((res) => {
      dispatch(fetchUserRecipesSuccess(res.data.recipes));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });

export const deleteRecipeSuccess = id => ({
  type: DELETE_RECIPE_SUCCESS,
  payload: id
});


export const deleteRecipe = id => dispatch =>
  axios.delete(`/api/v1/recipes/${id}`)
    .then((res) => {
      dispatch(deleteRecipeSuccess(id));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });

export const upvoteSuccess = recipe => ({
  type: UPVOTE_SUCCESS,
  payload: recipe
});

export const upvoteRecipe = id => dispatch =>
  axios.put(`/api/v1/recipes/${id}/upvote`)
    .then((res) => {
      dispatch(upvoteSuccess(res.data.recipe));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });


export const downvoteSuccess = recipe => ({
  type: DOWNVOTE_SUCCESS,
  payload: recipe
});

export const downvoteRecipe = id => dispatch =>
  axios.put(`/api/v1/recipes/${id}/downvote`)
    .then((res) => {
      dispatch(downvoteSuccess(res.data.recipe));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });

export const favoriteSuccess = recipe => ({
  type: FAVORITE_SUCCESS,
  payload: recipe
});

export const favoriteRecipe = id => dispatch =>
  axios.post(`/api/v1/users/${id}/favorites`)
    .then((res) => {
      dispatch(favoriteSuccess(res.data.recipe));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });


export const fetchUserFavoritesCreator = favorites => ({
  type: FETCH_USER_FAVORITES,
  payload: favorites
});

export const fetchUserFavorites = () => dispatch =>
  axios.get('/api/v1/users/favorites')
    .then(res => dispatch(fetchUserFavoritesCreator(res.data.favorites)))
    .catch((error) => {
      toastr.error(error.response.data.message);
    });

export const addReviewSuccess = review => ({
  type: ADD_REVIEW_SUCCESS,
  payload: review
});

export const addRecipeReview = (id, comment) => dispatch =>
  axios.post(`/api/v1/recipes/${id}/review`, { comment })
    .then((res) => {
      dispatch(addReviewSuccess(res.data.review));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });

