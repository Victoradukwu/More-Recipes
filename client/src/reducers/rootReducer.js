import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import {
  creatingUserHasErrored,
  createdUser,
  authenticationFailed,
  authenticationSuccess,
  authToken,
} from './userReducers';
import allRecipes from './allRecipes';

import {
  modifyRecipeSuccess,
  fetchUserRecipesSuccess,
  addRecipeFailure,
  singleRecipe,
  userFavorites,
  reviewRecipe
} from './recipeReducers';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  allRecipes,
  modifyRecipeSuccess,
  userRecipes: fetchUserRecipesSuccess,
  addRecipeFailure,
  createdUser,
  creatingUserHasErrored,
  authenticationFailed,
  authenticationSuccess,
  authToken,
  singleRecipe,
  userFavorites,
  reviewRecipe,
});

export default rootReducer;
