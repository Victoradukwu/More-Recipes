import { combineReducers } from 'redux';

import {
  fetchingRecipes,
  fetchingRecipesHasErrored,
  fetchedRecipes,
  creatingUser,
  creatingUserHasErrored,
  createdUser,
  authenticatingUser,
  authenticationFailed,
  authenticationSuccess,
  authToken

} from './allReducers';

const rootReducer = combineReducers({
  fetchingRecipes,
  fetchingRecipesHasErrored,
  fetchedRecipes,
  createdUser,
  creatingUser,
  creatingUserHasErrored,
  authenticatingUser,
  authenticationFailed,
  authenticationSuccess,
  authToken
});

export default rootReducer;
