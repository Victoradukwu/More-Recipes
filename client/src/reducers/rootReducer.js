import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import {
  creatingUserHasErrored,
  createdUser,
  authenticationFailed,
  authenticationSuccess,
  authToken,
} from './userReducers';

import {
  fetchRecipeFailure,
  fetchRecipeSuccess,
  modifyRecipeSuccess,
  fetchUserRecipesSuccess,
  addRecipeFailure,
  singleRecipe
} from './recipeReducers';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  fetchRecipeFailure,
  fetchRecipeSuccess,
  modifyRecipeSuccess,
  userRecipes: fetchUserRecipesSuccess,
  addRecipeFailure,
  createdUser,
  creatingUserHasErrored,
  authenticationFailed,
  authenticationSuccess,
  authToken,
  singleRecipe
});

export default rootReducer;