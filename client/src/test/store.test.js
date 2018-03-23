/*
This can go by names like: 'rootReducer test', 'integration test' 'store test'.
The buttom line is that it tests how various reduxt parts work together to
achieve a goal. Since the store interacts with the rootReducer, which, in turn,
is a pool of all the other reducers, this test is effectively a test for the
rootReducer
 */
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import * as recipeActions from '../actions/recipeActions';

describe('Store', () => {
  it('should handle recipe creation', () => {
    const store = createStore(rootReducer, []);
    const recipe = { recipeName: 'fruitties' };

    const action = recipeActions.addRecipeSuccess(recipe);
    store.dispatch(action);

    const actual = store.getState().userRecipes[0];
    const expected = { recipeName: 'fruitties' };

    expect(actual).toEqual(expected);
  });
});
