import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import {
  fetchRecipeRequest,
  fetchRecipeFailure,
  fetchRecipeSuccess,
  addRecipeRequest,
  addRecipeSuccess,
  addRecipeFailure,
  creatingUser,
  creatingUserHasErrored,
  createdUser,
  authenticatingUser,
  authenticationFailed,
  authenticationSuccess,
  authToken,
  

} from './allReducers';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  fetchRecipeRequest,
  fetchRecipeFailure,
  fetchRecipeSuccess,
  addRecipeRequest,
  addRecipeSuccess,
  addRecipeFailure,
  createdUser,
  creatingUser,
  creatingUserHasErrored,
  authenticatingUser,
  authenticationFailed,
  authenticationSuccess,
  authToken,
  
});

export default rootReducer;
