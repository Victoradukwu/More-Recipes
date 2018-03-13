import { combineReducers } from 'redux';

import userAuthentication, {
  authenticationFailed,
  authenticationSuccess
} from './userReducers';
import allRecipes from './allRecipes';
import searchRecipes from './searchRecipesReducer';

import {
  modifyRecipeSuccess,
  fetchUserRecipesSuccess,
  addRecipeFailure,
  singleRecipe,
  userFavorites,
  reviewRecipe
} from './recipeReducers';

const rootReducer = combineReducers({
  userAuthentication,
  allRecipes,
  modifyRecipeSuccess,
  userRecipes: fetchUserRecipesSuccess,
  addRecipeFailure,
  authenticationFailed,
  authenticationSuccess,
  singleRecipe,
  userFavorites,
  reviewRecipe,
  searchRecipes,
});

export default rootReducer;
