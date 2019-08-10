import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FIND_USER_BEGIN,
  HOME_FIND_USER_SUCCESS,
  HOME_FIND_USER_FAILURE,
  HOME_FIND_USER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  findUser,
  dismissFindUserError,
  reducer,
} from '../../../../src/features/home/redux/findUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/findUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when findUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(findUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FIND_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FIND_USER_SUCCESS);
      });
  });

  it('dispatches failure action when findUser fails', () => {
    const store = mockStore({});

    return store.dispatch(findUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FIND_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FIND_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFindUserError', () => {
    const expectedAction = {
      type: HOME_FIND_USER_DISMISS_ERROR,
    };
    expect(dismissFindUserError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FIND_USER_BEGIN correctly', () => {
    const prevState = { findUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FIND_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.findUserPending).toBe(true);
  });

  it('handles action type HOME_FIND_USER_SUCCESS correctly', () => {
    const prevState = { findUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FIND_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.findUserPending).toBe(false);
  });

  it('handles action type HOME_FIND_USER_FAILURE correctly', () => {
    const prevState = { findUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FIND_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.findUserPending).toBe(false);
    expect(state.findUserError).toEqual(expect.anything());
  });

  it('handles action type HOME_FIND_USER_DISMISS_ERROR correctly', () => {
    const prevState = { findUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FIND_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.findUserError).toBe(null);
  });
});

