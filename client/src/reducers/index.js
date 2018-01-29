import { combineReducers } from 'redux';

import {
  fetchingRecipes,
  fetchingRecipesHasErrored,
  fetchedRecipes
} from './allReducers';

const rootReducer = combineReducers({
  fetchingRecipes,
  fetchingRecipesHasErrored,
  fetchedRecipes
});

export default rootReducer;
