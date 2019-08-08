import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_USERS_BEGIN,
  HOME_USERS_SUCCESS,
  HOME_USERS_FAILURE,
  HOME_USERS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  users,
  dismissUsersError,
  reducer,
} from '../../../../src/features/home/redux/users';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/users', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when users succeeds', () => {
    const store = mockStore({});

    return store.dispatch(users())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_USERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_USERS_SUCCESS);
      });
  });

  it('dispatches failure action when users fails', () => {
    const store = mockStore({});

    return store.dispatch(users({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_USERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_USERS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUsersError', () => {
    const expectedAction = {
      type: HOME_USERS_DISMISS_ERROR,
    };
    expect(dismissUsersError()).toEqual(expectedAction);
  });

  it('handles action type HOME_USERS_BEGIN correctly', () => {
    const prevState = { usersPending: false };
    const state = reducer(
      prevState,
      { type: HOME_USERS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.usersPending).toBe(true);
  });

  it('handles action type HOME_USERS_SUCCESS correctly', () => {
    const prevState = { usersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_USERS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.usersPending).toBe(false);
  });

  it('handles action type HOME_USERS_FAILURE correctly', () => {
    const prevState = { usersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_USERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.usersPending).toBe(false);
    expect(state.usersError).toEqual(expect.anything());
  });

  it('handles action type HOME_USERS_DISMISS_ERROR correctly', () => {
    const prevState = { usersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_USERS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.usersError).toBe(null);
  });
});

