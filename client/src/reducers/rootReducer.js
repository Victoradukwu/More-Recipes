import { combineReducers } from 'redux';

import userAuthentication
  from './userReducers';
import allRecipes from './allRecipes';
import searchRecipes from './searchRecipesReducer';

import {
  fetchUserRecipesSuccess,
  singleRecipe,
  userFavorites,
} from './recipeReducers';

const rootReducer = combineReducers({
  userAuthentication,
  allRecipes,
  userRecipes: fetchUserRecipesSuccess,
  singleRecipe,
  userFavorites,
  searchRecipes,
});

export default rootReducer;
