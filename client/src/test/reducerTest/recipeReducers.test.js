import { fetchUserRecipesSuccess, singleRecipe, userFavorites }
  from '../../reducers/recipeReducers';
import * as recipeActions from '../../actions/recipeActions';

describe('fetchUserRecipesSuccess', () => {
  it('returns the initial state with an empty action', () => {
    const newState = fetchUserRecipesSuccess(undefined, {});
    expect(newState).toEqual([]);
  });

  it(
    'returns the expected state for a FETCH_USER_RECIPES_SUCCESS action',
    () => {
      const newState = fetchUserRecipesSuccess(
        undefined,
        recipeActions.fetchUserRecipesSuccess([])
      );
      expect(newState).toEqual([]);
    }
  );

  it('returns the expected state for a DELETE_RECIPE_SUCCESS action', () => {
    const newState = fetchUserRecipesSuccess(
      [{ id: 1 }],
      recipeActions.deleteRecipeSuccess(1)
    );
    expect(newState).toEqual([]);
  });

  it('returns the expected state for a ADD_RECIPE_SUCCESS action', () => {
    const newState = fetchUserRecipesSuccess(
      undefined,
      recipeActions.addRecipeSuccess({})
    );
    expect(newState).toEqual([{}]);
  });

  it('returns the expected state for a MODIFY_RECIPE_SUCCESS action', () => {
    const newState = fetchUserRecipesSuccess(
      [{ id: 1 }],
      recipeActions.modifyRecipeSuccess({ id: 1 })
    );
    expect(newState).toEqual([{ id: 1 }]);
  });
});

describe('singleRecipe', () => {
  it('returns the initial state with an empty action', () => {
    const newState = singleRecipe(undefined, {});
    expect(newState).toEqual({});
  });

  it(
    'returns the expected state for a GET_SINGLE_RECIPE_SUCCESS action',
    () => {
      const newState = singleRecipe(
        undefined,
        recipeActions.getSingleRecipeSuccess({ id: 1 })
      );
      expect(newState).toEqual({ id: 1 });
    }
  );

  it('returns the expected state for a UPVOTE_SUCCESS action', () => {
    const newState = singleRecipe(
      undefined,
      recipeActions.upvoteSuccess({ id: 1 })
    );
    expect(newState).toEqual({ id: 1 });
  });

  it('returns the expected state for a DOWNVOTE_SUCCESS action', () => {
    const newState = singleRecipe(
      undefined,
      recipeActions.downvoteSuccess({ id: 1 })
    );
    expect(newState).toEqual({ id: 1 });
  });

  it('returns the expected state for a FAVORITE_SUCCESS action', () => {
    const newState = singleRecipe(
      undefined,
      recipeActions.favoriteSuccess({ id: 1 })
    );
    expect(newState).toEqual({ id: 1 });
  });

  it('returns the expected state for a ADD_REVIEW_SUCCESS action', () => {
    const newState = singleRecipe(
      { reviews: 'firstReview' },
      recipeActions.addReviewSuccess('awesome')
    );
    expect(newState).toEqual({ reviews: ['awesome', 'firstReview'] });
  });
});

describe('userFavorites', () => {
  it('returns the initial state with an empty action', () => {
    const newState = userFavorites(undefined, {});
    expect(newState).toEqual([]);
  });

  it('returns the expected state for a FETCH_USER_FAVORITES action', () => {
    const newState = userFavorites(
      undefined,
      recipeActions.fetchUserFavoritesCreator([])
    );
    expect(newState).toEqual([]);
  });
});

