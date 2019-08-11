import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_IS_ARRIVED_BEGIN,
  HOME_IS_ARRIVED_SUCCESS,
  HOME_IS_ARRIVED_FAILURE,
  HOME_IS_ARRIVED_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  isArrived,
  dismissIsArrivedError,
  reducer,
} from '../../../../src/features/home/redux/isArrived';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/isArrived', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when isArrived succeeds', () => {
    const store = mockStore({});

    return store.dispatch(isArrived())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_IS_ARRIVED_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_IS_ARRIVED_SUCCESS);
      });
  });

  it('dispatches failure action when isArrived fails', () => {
    const store = mockStore({});

    return store.dispatch(isArrived({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_IS_ARRIVED_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_IS_ARRIVED_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissIsArrivedError', () => {
    const expectedAction = {
      type: HOME_IS_ARRIVED_DISMISS_ERROR,
    };
    expect(dismissIsArrivedError()).toEqual(expectedAction);
  });

  it('handles action type HOME_IS_ARRIVED_BEGIN correctly', () => {
    const prevState = { isArrivedPending: false };
    const state = reducer(
      prevState,
      { type: HOME_IS_ARRIVED_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isArrivedPending).toBe(true);
  });

  it('handles action type HOME_IS_ARRIVED_SUCCESS correctly', () => {
    const prevState = { isArrivedPending: true };
    const state = reducer(
      prevState,
      { type: HOME_IS_ARRIVED_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isArrivedPending).toBe(false);
  });

  it('handles action type HOME_IS_ARRIVED_FAILURE correctly', () => {
    const prevState = { isArrivedPending: true };
    const state = reducer(
      prevState,
      { type: HOME_IS_ARRIVED_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isArrivedPending).toBe(false);
    expect(state.isArrivedError).toEqual(expect.anything());
  });

  it('handles action type HOME_IS_ARRIVED_DISMISS_ERROR correctly', () => {
    const prevState = { isArrivedError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_IS_ARRIVED_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isArrivedError).toBe(null);
  });
});

