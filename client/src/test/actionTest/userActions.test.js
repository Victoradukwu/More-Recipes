// import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actionTypes/userActionTypes';
import * as userActions from '../../actions/userAction';
import userMocks from '../__mocks__/userMocks';

const user = { userName: 'Hines', email: 'hines@andela.com' };
const userId = 1;
const error = 'sampleError';
const mockStore = configureMockStore([thunk]);


describe('Async User Actions', () => {
  describe('authenticateUser', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should authenticate a user and create the necessary actions', () => {
      moxios.wait(() => {
        const userRequest = moxios.requests.mostRecent();
        userRequest.respondWith({
          status: 201,
          response: userMocks.crateUserResObj,
        });
      });

      const store = mockStore({});
      const expectedAction = [
        userActions.isAuthenticating(true),
        userActions.setUser(userMocks.crateUserResObj.user),
        userActions.setUserId(userMocks.crateUserResObj.user.id),
        userActions.setContribution(),
        userActions.isAuthenticating(false)
      ];
      return store.dispatch(userActions.authenticateUser(userMocks.authUserReqObj, 'signup')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});

describe('User synchronous Actions', () => {
  describe('isAuthenticating', () => {
    it('should create  a IS_AUTHENTICATING action', () => {
      const expectedAction = { type: types.IS_AUTHENTICATING, bool: 'bool' };
      const action = userActions.isAuthenticating('bool');
      expect(action).toEqual(expectedAction);
    });
  });

  describe('userAuthenticationFailure', () => {
    it('should create a AUTHENTICATE_USER_FAILURE action', () => {
      const expectedAction = { type: types.AUTHENTICATE_USER_FAILURE, error };
      const action = userActions.userAuthenticationFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('setUserId', () => {
    it('should create a SET_USER_ID action', () => {
      const expectedAction = { type: types.SET_USER_ID, userId };
      const action = userActions.setUserId(userId);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('setUser', () => {
    it('should create a SET_USER action', () => {
      const expectedAction = { type: types.SET_USER, user };
      const action = userActions.setUser(user);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('logout', () => {
    it('should create a LOG_OUT action', () => {
      const expectedAction = { type: types.LOG_OUT, payload: null };
      const action = userActions.logout();
      expect(action).toEqual(expectedAction);
    });
  });
});
