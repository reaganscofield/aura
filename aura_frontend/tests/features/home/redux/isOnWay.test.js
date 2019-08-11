import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_IS_ON_WAY_BEGIN,
  HOME_IS_ON_WAY_SUCCESS,
  HOME_IS_ON_WAY_FAILURE,
  HOME_IS_ON_WAY_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  isOnWay,
  dismissIsOnWayError,
  reducer,
} from '../../../../src/features/home/redux/isOnWay';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/isOnWay', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when isOnWay succeeds', () => {
    const store = mockStore({});

    return store.dispatch(isOnWay())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_IS_ON_WAY_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_IS_ON_WAY_SUCCESS);
      });
  });

  it('dispatches failure action when isOnWay fails', () => {
    const store = mockStore({});

    return store.dispatch(isOnWay({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_IS_ON_WAY_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_IS_ON_WAY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissIsOnWayError', () => {
    const expectedAction = {
      type: HOME_IS_ON_WAY_DISMISS_ERROR,
    };
    expect(dismissIsOnWayError()).toEqual(expectedAction);
  });

  it('handles action type HOME_IS_ON_WAY_BEGIN correctly', () => {
    const prevState = { isOnWayPending: false };
    const state = reducer(
      prevState,
      { type: HOME_IS_ON_WAY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isOnWayPending).toBe(true);
  });

  it('handles action type HOME_IS_ON_WAY_SUCCESS correctly', () => {
    const prevState = { isOnWayPending: true };
    const state = reducer(
      prevState,
      { type: HOME_IS_ON_WAY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isOnWayPending).toBe(false);
  });

  it('handles action type HOME_IS_ON_WAY_FAILURE correctly', () => {
    const prevState = { isOnWayPending: true };
    const state = reducer(
      prevState,
      { type: HOME_IS_ON_WAY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isOnWayPending).toBe(false);
    expect(state.isOnWayError).toEqual(expect.anything());
  });

  it('handles action type HOME_IS_ON_WAY_DISMISS_ERROR correctly', () => {
    const prevState = { isOnWayError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_IS_ON_WAY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isOnWayError).toBe(null);
  });
});

