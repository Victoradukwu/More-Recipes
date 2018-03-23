import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as recipeActions from '../../actions/recipeActions';
import * as fetchAllRecipes from '../../actions/fetchAllRecipes';
import * as searchActions from '../../actions/searchRecipesAction';
import * as types from '../../actionTypes/recipeActionTypes';
import recipeMocks from '../__mocks__/recipeMocks';


const error = 'errorText';
const recipe = { name: 'testName', ingredients: 'testIngredients' };
const id = 'recipeId';
const mockStore = configureMockStore([thunk]);

describe('Async User Actions', () => {
  describe('submitRecipe', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a ADD_RECIPE_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 201,
          response: recipeMocks.addRecipeResObj,
        });
      });

      const store = mockStore({});
      const expectedAction = [{
        type: types.ADD_RECIPE_SUCCESS,
        payload: recipeMocks.addRecipeResObj.recipe
      }];
      return store.dispatch(recipeActions.submitRecipe(recipeMocks.addRecipeReqObj)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should create a MODIFY_RECIPE_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: recipeMocks.modifyRecipeResObj
        });
      });

      const store = mockStore({});
      const expectedAction = [{
        type: types.MODIFY_RECIPE_SUCCESS,
        payload: recipeMocks.modifyRecipeResObj.recipe
      }];
      return store.dispatch(recipeActions.submitRecipe({ id: 1, ...recipeMocks.addRecipeReqObj })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should create a ADD_RECIPE_FAILURE action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 403,
          response: { data: recipeMocks.modifyRecipeFailResObj }
        });
      });

      const store = mockStore({});
      const expectedAction = [];
      return store.dispatch(recipeActions.submitRecipe(recipeMocks.addRecipeReqObj)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should create a MODIFY_RECIPE_FAILURE action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 400,
          response: recipeMocks.modifyRecipeFailResObj
        });
      });

      const store = mockStore({});
      const expectedAction = [recipeActions.modifyRecipeFailure(recipeMocks.modifyRecipeFailResObj)];
      return store.dispatch(recipeActions
        .submitRecipe({ id: 1, ...recipeMocks.addRecipeReqObj })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });


  describe('getSingleRecipe', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a GET_SINGLE_RECIPE_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: recipeMocks.singRecipeResObj
        });
      });

      const store = mockStore({});
      const expectedAction = [{
        type: types.GET_SINGLE_RECIPE_SUCCESS,
        payload: recipeMocks.singRecipeResObj.recipe
      }];
      return store.dispatch(recipeActions.getSingleRecipe('6')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should create a GET_SINGLE_RECIPE_FAILURE action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 403,
          response: recipeMocks.modifyRecipeFailResObj
        });
      });

      const store = mockStore({});
      const expectedAction = [{
        type: types.GET_SINGLE_RECIPE_FAILURE,
        payload: recipeMocks.modifyRecipeFailResObj
      }];
      return store.dispatch(recipeActions.getSingleRecipe(8)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('fetchUserRecipes', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a FETCH_USER_RECIPES_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: recipeMocks.userRecResObj
        });
      });

      const store = mockStore({});
      const expectedAction = [{
        type: types.FETCH_USER_RECIPES_SUCCESS,
        payload: recipeMocks.userRecResObj.recipes
      }];
      return store.dispatch(recipeActions.fetchUserRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should create no acion for a failed request', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 400,
          response: {
            message: ''
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [];
      return store.dispatch(recipeActions.fetchUserRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('fetchUserFavorites', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a FETCH_USER_FAVORITES action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: recipeMocks.userRecResObj
        });
      });

      localStorage.token = JSON.stringify({
        token: 'sjjqsdgahjsdgasv'
      });

      const store = mockStore({});
      const expectedAction = [{
        type: types.FETCH_USER_FAVORITES,
        payload: recipeMocks.userRecResObj.recipe
      }];
      return store.dispatch(recipeActions.fetchUserFavorites()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should create no actions for failure request', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 400,
          response: {
            message: ''
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [];
      return store.dispatch(recipeActions.fetchUserFavorites()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('fetchAllRecipes', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a FETCH_RECIPES_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: []
        });
      });

      const store = mockStore({});
      const expectedAction = [
        fetchAllRecipes.isRecipesFetching(true),
        fetchAllRecipes.fetchRecipesSuccess([]),
        fetchAllRecipes.isRecipesFetching(false),
      ];
      return store.dispatch(fetchAllRecipes.fetchRecipesRequest(5)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should create a FETCH_RECIPES_FAILURE action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 403,
          response: {
            message: ''
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [
        fetchAllRecipes.isRecipesFetching(true),
        fetchAllRecipes.fetchRecipesFailure(''),
        fetchAllRecipes.isRecipesFetching(false)
      ];
      return store.dispatch(fetchAllRecipes.fetchRecipesRequest(5)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('searchRecipes', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a SEARCH_RECIPES_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: {
            recipes: []
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [
        searchActions.isRecipeSearching(true),
        searchActions.searchRecipesSuccess([]),
        searchActions.isRecipeSearching(false)
      ];
      return store.dispatch(searchActions.searchRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should create a SEARCH_RECIPES_FAILURE action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 403,
          response: {
            message: ''
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [
        searchActions.isRecipeSearching(true),
        searchActions.searchRecipesFailure(''),
        searchActions.isRecipeSearching(false)
      ];
      return store.dispatch(searchActions.searchRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('addRecipeReview', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a ADD_REVIEW_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: recipeMocks.userRecResObj
        });
      });

      localStorage.token = JSON.stringify({
        token: 'sjjqsdgahjsdgasv'
      });

      const store = mockStore({});
      const expectedAction = [{
        type: types.ADD_REVIEW_SUCCESS,
        payload: recipeMocks.userRecResObj.recipe
      }];
      return store.dispatch(recipeActions.addRecipeReview()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should not create an action for a addRecipeReview failure', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 400,
          response: {
            message: ''
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [];
      return store.dispatch(recipeActions.addRecipeReview()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('deleteRecipe', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a DELETE_RECIPE_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: {
            message: ''
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [recipeActions.deleteRecipeSuccess(6)];
      return store.dispatch(recipeActions.deleteRecipe(6)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should not create an action for a deleteRecipe failure', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 400,
          response: {
            message: ''
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [];
      return store.dispatch(recipeActions.deleteRecipe(6)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('upvoteRecipe', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a UPVOTE_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: {
            message: '',
            recipe: {}
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [recipeActions.upvoteSuccess({})];
      return store.dispatch(recipeActions.upvoteRecipe('6')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should not create an action for an upvoteRecipe failure', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 400,
          response: {
            message: '',
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [];
      return store.dispatch(recipeActions.upvoteRecipe('6')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('downvoteRecipe', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a DOWNVOTE_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: {
            message: '',
            recipe: {}
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [recipeActions.downvoteSuccess({})];
      return store.dispatch(recipeActions.downvoteRecipe('6')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 400,
          response: {
            message: '',
          }
        });
      });

      const store = mockStore({});
      const expectedAction = [];
      return store.dispatch(recipeActions.downvoteRecipe('6')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('favoriteRecipe', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a FAVORITE_SUCCESS action', () => {
      moxios.wait(() => {
        const recipeRequest = moxios.requests.mostRecent();
        recipeRequest.respondWith({
          status: 200,
          response: recipeMocks.singRecipeResObj
        });
      });

      localStorage.token = JSON.stringify({
        token: 'sjjqsdgahjsdgasv'
      });

      const store = mockStore({});
      const expectedAction = [{
        type: types.FAVORITE_SUCCESS,
        payload: recipeMocks.singRecipeResObj.recipe
      }];
      return store.dispatch(recipeActions.favoriteRecipe('6')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});

describe('Testing Synchronous Action creators', () => {
  describe('addRecipeSuccess', () => {
    it('should create a ADD_RECIPE_SUCCESS action', () => {
      const expectedAction = { type: types.ADD_RECIPE_SUCCESS, payload: recipe };
      const action = recipeActions.addRecipeSuccess(recipe);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('modifyRecipeSuccess', () => {
    it('should create a MODIFY_RECIPE_SUCCESS action', () => {
      const expectedAction = { type: types.MODIFY_RECIPE_SUCCESS, payload: recipe };
      const action = recipeActions.modifyRecipeSuccess(recipe);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('modifyRecipeFailure', () => {
    it('should create a MODIFY_RECIPE_FAILURE action', () => {
      const expectedAction = { type: types.MODIFY_RECIPE_FAILURE, payload: error };
      const action = recipeActions.modifyRecipeFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('getSingleRecipeSuccess', () => {
    it('should create a GET_SINGLE_RECIPE_SUCCESS action', () => {
      const expectedAction = { type: types.GET_SINGLE_RECIPE_SUCCESS, payload: recipe };
      const action = recipeActions.getSingleRecipeSuccess(recipe);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('getSingleRecipeFailure', () => {
    it('should create a GET_SINGLE_RECIPE_FAILURE action', () => {
      const expectedAction = { type: types.GET_SINGLE_RECIPE_FAILURE, payload: error };
      const action = recipeActions.getSingleRecipeFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchUserRecipesSuccess', () => {
    it('should create a FETCH_USER_RECIPES_SUCCESS action', () => {
      const expectedAction = { type: types.FETCH_USER_RECIPES_SUCCESS, payload: recipe };
      const action = recipeActions.fetchUserRecipesSuccess(recipe);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('deleteRecipeSuccess', () => {
    it('should create a DELETE_RECIPE_SUCCESS action', () => {
      const expectedAction = { type: types.DELETE_RECIPE_SUCCESS, payload: id };
      const action = recipeActions.deleteRecipeSuccess(id);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('upvoteSuccess', () => {
    it('should create a UPVOTE_SUCCESS action', () => {
      const expectedAction = { type: types.UPVOTE_SUCCESS, payload: recipe };
      const action = recipeActions.upvoteSuccess(recipe);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('downvoteSuccess', () => {
    it('should create a DOWNVOTE_SUCCESS action', () => {
      const expectedAction = { type: types.DOWNVOTE_SUCCESS, payload: recipe };
      const action = recipeActions.downvoteSuccess(recipe);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('favoriteSuccess', () => {
    it('should create a FAVORITE_SUCCESS action', () => {
      const expectedAction = { type: types.FAVORITE_SUCCESS, payload: recipe };
      const action = recipeActions.favoriteSuccess(recipe);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchUserFavoritesCreator', () => {
    it('should create a FETCH_USER_FAVORITES action', () => {
      const expectedAction = { type: types.FETCH_USER_FAVORITES, payload: 'favorites' };
      const action = recipeActions.fetchUserFavoritesCreator('favorites');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('addReviewSuccess', () => {
    it('should create a ADD_REVIEW_SUCCESS action', () => {
      const expectedAction = { type: types.ADD_REVIEW_SUCCESS, payload: 'reviewText' };
      const action = recipeActions.addReviewSuccess('reviewText');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('addReviewSuccess', () => {
    it('should create  a ADD_REVIEW_SUCCESS action', () => {
      const expectedAction = { type: types.ADD_REVIEW_SUCCESS, payload: 'reviewText' };
      const action = recipeActions.addReviewSuccess('reviewText');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('isRecipesFetching', () => {
    it('should create a IS_RECIPES_FETCHING action', () => {
      const expectedAction = { type: types.IS_RECIPES_FETCHING, bool: 'bool' };
      const action = fetchAllRecipes.isRecipesFetching('bool');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchRecipesSuccess', () => {
    it('should create  a FETCH_RECIPES_SUCCESS action', () => {
      const expectedAction = { type: types.FETCH_RECIPES_SUCCESS, allRecipes: 'allRecipes' };
      const action = fetchAllRecipes.fetchRecipesSuccess('allRecipes');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchRecipesFailure', () => {
    it('should create  a FETCH_RECIPES_FAILURE action', () => {
      const expectedAction = { type: types.FETCH_RECIPES_FAILURE, errorMessage: 'errorMessage' };
      const action = fetchAllRecipes.fetchRecipesFailure('errorMessage');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('isRecipeSearching', () => {
    it('should create  a IS_RECIPES_SEARCHING action', () => {
      const expectedAction = { type: types.IS_RECIPES_SEARCHING, bool: 'bool' };
      const action = searchActions.isRecipeSearching('bool');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('searchRecipesSuccess', () => {
    it('should create a SEARCH_RECIPES_SUCCESS action', () => {
      const expectedAction = { type: types.SEARCH_RECIPES_SUCCESS, recipes: 'recipes' };
      const action = searchActions.searchRecipesSuccess('recipes');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('searchRecipesFailure', () => {
    it('should create a SEARCH_RECIPES_FAILURE action', () => {
      const expectedAction = { type: types.SEARCH_RECIPES_FAILURE, errorMessage: 'errorMessage' };
      const action = searchActions.searchRecipesFailure('errorMessage');
      expect(action).toEqual(expectedAction);
    });
  });
});

