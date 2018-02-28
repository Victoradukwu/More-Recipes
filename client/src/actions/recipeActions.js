import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  GET_SINGLE_RECIPE_FAILURE,
  GET_SINGLE_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
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
  /* SET_SINGLE_RECIPE */ } from '../actionTypes/recipeActionTypes';

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
    return axios.put(`/api/v1/recipes/${recipeDetails.id}`, recipeDetails)
      .then((res) => {
        if (res.status === 200) {
          const { message, recipe } = res.data;
          dispatch(modifyRecipeSuccess(recipe));
          toastr.success('Modify Recipe', message);
        }
      })
      .catch((error) => {
        toastr.error('Modify Recipe', error.message);
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
      toastr.error('Add Recipe', error.message);
      // dispatch(addRecipeFailure(error));
    });
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
      toastr.error('Modify Recipe', error.message);
      dispatch(getSingleRecipeFailure(error));
    });
};

// export const setSingleRecipe = payload => ({
//   type: SET_SINGLE_RECIPE,
//   payload
// });
// export const fetchUserRecipesFailure = error => ({
//   type: FETCH_USER_RECIPES_FAILURE,
//   payload: error
// });
export const fetchUserRecipesSuccess = recipes => ({
  type: FETCH_USER_RECIPES_SUCCESS,
  payload: recipes
});

// Async get user recipes actions (Thunk)
export const fetchUserRecipes = () => dispatch =>
  axios.get('/api/v1/users/recipes')
    .then((res) => {
      dispatch(fetchUserRecipesSuccess(res.data.recipes));
    })
    .catch((error) => {
      toastr.error('Fetch user recipes', error.message);
      // dispatch(fetchUserRecipesFailure(error));
    });

export const deleteRecipeSuccess = id => ({
  type: DELETE_RECIPE_SUCCESS,
  payload: id
});

// export const deleteRecipeFailure = error => ({
//   type: DELETE_RECIPE_FAILURE,
//   payload: error
// });

export const deleteRecipe = id => (dispatch) => {
  axios.delete(`/api/v1/recipes/${id}`)
    .then((res) => {
      dispatch(deleteRecipeSuccess(id));
      toastr.success('Delete recipe', res.data.message);
    })
    .catch((error) => {
      // dispatch(deleteRecipeFailure(error));
      toastr.error('Delete recipe', error.message);
    });
};

export const upvoteSuccess = recipe => ({
  type: UPVOTE_SUCCESS,
  payload: recipe
});

// export const upvoteFailure = error => ({
//   type: UPVOTE_FAILURE,
//   payload: error
// });

export const upvoteRecipe = id => (dispatch) => {
  axios.put(`/api/v1/recipes/${id}/upvote`)
    .then((res) => {
      dispatch(upvoteSuccess(res.data.recipe));
      toastr.success('Upvote recipe', res.data.message);
    })
    .catch((error) => {
      // dispatch(upvoteFailure(error));
      toastr.error('Upvote recipe', error.message);
    });
};


export const downvoteSuccess = recipe => ({
  type: DOWNVOTE_SUCCESS,
  payload: recipe
});

// export const downvoteFailure = error => ({
//   type: DOWNVOTE_FAILURE,
//   payload: error
// });

export const downvoteRecipe = id => (dispatch) => {
  axios.put(`/api/v1/recipes/${id}/downvote`)
    .then((res) => {
      dispatch(downvoteSuccess(res.data.recipe));
      toastr.success('Downvote recipe', res.data.message);
    })
    .catch((error) => {
      // dispatch(downvoteFailure(error));
      toastr.error('Downvote recipe', error.message);
    });
};

export const favoriteSuccess = recipe => ({
  type: FAVORITE_SUCCESS,
  payload: recipe
});

// export const favoriteFailure = error => ({
//   type: FAVORITE_FAILURE,
//   payload: error
// });

export const favoriteRecipe = (id, category) => (dispatch) => {
  axios.post(`/api/v1/users/${id}/favorites`, { category })
    .then((res) => {
      dispatch(favoriteSuccess(res.data.recipe));
      toastr.success('Favorite recipe', res.data.message);
    })
    .catch((error) => {
      // dispatch(favoriteFailure(error));
      toastr.error('Favorite recipe', error.message);
    });
};


export const fetchUserFavoritesCreator = favorites => ({
  type: FETCH_USER_FAVORITES,
  payload: favorites
});

// Async get user favorites actions (Thunk)
export const fetchUserFavorites = () => dispatch =>
  axios.get('/api/v1/users/favorites')
    .then(res => dispatch(fetchUserFavoritesCreator(res.data.favorites)))
    .catch((error) => {
      toastr.error('Fetch user Favorites', error.message);
      // dispatch(fetchUserFavorites(error));
    });

export const addReviewSuccess = comment => ({
  type: ADD_REVIEW_SUCCESS,
  payload: comment
});

// Async review a recipe actions (Thunk)
export const addRecipeReview = (id, comment) => dispatch =>
  axios.post(`/api/v1/recipes/${id}/review`, { comment })
    .then((res) => {
      dispatch(addReviewSuccess(res.data.comment));
      toastr.succces('Add Review', res.data.message);
    })
    .catch((error) => {
      toastr.error('Add Review', error.message);
    });
