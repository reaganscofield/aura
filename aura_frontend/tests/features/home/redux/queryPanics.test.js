import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_QUERY_PANICS_BEGIN,
  HOME_QUERY_PANICS_SUCCESS,
  HOME_QUERY_PANICS_FAILURE,
  HOME_QUERY_PANICS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  queryPanics,
  dismissQueryPanicsError,
  reducer,
} from '../../../../src/features/home/redux/queryPanics';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/queryPanics', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when queryPanics succeeds', () => {
    const store = mockStore({});

    return store.dispatch(queryPanics())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_QUERY_PANICS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_QUERY_PANICS_SUCCESS);
      });
  });

  it('dispatches failure action when queryPanics fails', () => {
    const store = mockStore({});

    return store.dispatch(queryPanics({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_QUERY_PANICS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_QUERY_PANICS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissQueryPanicsError', () => {
    const expectedAction = {
      type: HOME_QUERY_PANICS_DISMISS_ERROR,
    };
    expect(dismissQueryPanicsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_QUERY_PANICS_BEGIN correctly', () => {
    const prevState = { queryPanicsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_PANICS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryPanicsPending).toBe(true);
  });

  it('handles action type HOME_QUERY_PANICS_SUCCESS correctly', () => {
    const prevState = { queryPanicsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_PANICS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryPanicsPending).toBe(false);
  });

  it('handles action type HOME_QUERY_PANICS_FAILURE correctly', () => {
    const prevState = { queryPanicsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_PANICS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryPanicsPending).toBe(false);
    expect(state.queryPanicsError).toEqual(expect.anything());
  });

  it('handles action type HOME_QUERY_PANICS_DISMISS_ERROR correctly', () => {
    const prevState = { queryPanicsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_PANICS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryPanicsError).toBe(null);
  });
});

