import reducer, { initialState } from '../../reducers/userReducers';
import * as userActions from '../../actions/userAction';

describe('userAuthentication', () => {
  it('returns the initial state with an empty action', () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('returns the expected state for a SET_USER_ID action', () => {
    const newState = reducer(initialState, userActions.setUserId(1));
    expect(newState).toEqual({
      ...initialState,
      authId: 1,
      isAuthenticated: !initialState.isAuthenticated
    });
  });

  it('returns the expected state for a SET_USER action', () => {
    const newState = reducer(initialState, userActions
      .setUser({ id: 1, name: 'Archer' }));
    expect(newState).toEqual({
      ...initialState,
      user: { id: 1, name: 'Archer' },
    });
  });

  it('returns the expected state for a LOG_OUT action', () => {
    const newState = reducer(initialState, userActions.logout());
    expect(newState).toEqual(initialState);
  });

  it(
    'returns the expected state for a AUTHENTICATE_USER_FAILURE action',
    () => {
      const newState = reducer(initialState, userActions
        .userAuthenticationFailure('someError'));
      expect(newState).toEqual({
        ...initialState,
        authError: 'someError'
      });
    }
  );

  it('returns the expected state for an IS_AUTHENTICATING action', () => {
    const newState = reducer(initialState, userActions.isAuthenticating(true));
    expect(newState).toEqual({
      ...initialState,
      isAuthenticating: true
    });
  });
});
