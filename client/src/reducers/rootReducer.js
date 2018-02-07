import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

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
  toastr: toastrReducer,
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
