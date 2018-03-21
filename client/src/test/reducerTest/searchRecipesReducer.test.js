import reducer, { initialState } from '../../reducers/searchRecipesReducer';
import * as searchRecipeActions from '../../actions/searchRecipesAction';

describe('searchRecipes', () => {
  it('returns the initial state with an empty action', () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('returns the expected state for a IS_RECIPES_SEARCHING action', () => {
    const newState = reducer(initialState, searchRecipeActions.isRecipeSearching(true));
    expect(newState).toEqual({
      ...initialState,
      isSearching: true
    });
  });

  it('returns the expected state for a SEARCH_RECIPES_SUCCESS action', () => {
    const newState = reducer(
      initialState,
      searchRecipeActions.searchRecipesSuccess([])
    );
    expect(newState).toEqual({
      ...initialState,
      searchedRecipes: []
    });
  });

  it('returns the expected state for a FETCH_RECIPES_FAILURE action', () => {
    const newState = reducer(
      undefined,
      searchRecipeActions.searchRecipesFailure('')
    );
    expect(newState).toEqual({
      ...initialState,
      searchRecipesFailure: ''
    });
  });
});
