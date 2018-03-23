import reducer, { initialState } from '../../reducers/allRecipes';
import * as allRecipeActions from '../../actions/fetchAllRecipes';

describe('allRecipesReducer', () => {
  it('returns the initial state with an empty action', () => {
    const newState = reducer(undefined, undefined);
    expect(newState).toEqual(initialState);
  });

  it('returns the expected state for a IS_RECIPES_FETCHING action', () => {
    const newState = reducer(undefined, allRecipeActions.isRecipesFetching(true));
    expect(newState).toEqual({
      ...initialState,
      isFetching: true
    });
  });

  it('returns the expected state for a FETCH_RECIPES_SUCCESS action', () => {
    const newState = reducer(
      undefined,
      allRecipeActions.fetchRecipesSuccess({ recipes: [], pages: '' })
    );
    expect(newState).toEqual({
      ...initialState,
      fetchedAllRecipes: [],
      pages: ''
    });
  });

  it('returns the expected state for a FETCH_RECIPES_FAILURE action', () => {
    const newState = reducer(
      undefined,
      allRecipeActions.fetchRecipesFailure('')
    );
    expect(newState).toEqual({
      ...initialState,
      fetchRecipesFailure: ''
    });
  });
});

