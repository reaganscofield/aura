import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_QUERY_AGENTS_BEGIN,
  HOME_QUERY_AGENTS_SUCCESS,
  HOME_QUERY_AGENTS_FAILURE,
  HOME_QUERY_AGENTS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  queryAgents,
  dismissQueryAgentsError,
  reducer,
} from '../../../../src/features/home/redux/queryAgents';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/queryAgents', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when queryAgents succeeds', () => {
    const store = mockStore({});

    return store.dispatch(queryAgents())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_QUERY_AGENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_QUERY_AGENTS_SUCCESS);
      });
  });

  it('dispatches failure action when queryAgents fails', () => {
    const store = mockStore({});

    return store.dispatch(queryAgents({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_QUERY_AGENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_QUERY_AGENTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissQueryAgentsError', () => {
    const expectedAction = {
      type: HOME_QUERY_AGENTS_DISMISS_ERROR,
    };
    expect(dismissQueryAgentsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_QUERY_AGENTS_BEGIN correctly', () => {
    const prevState = { queryAgentsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_AGENTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryAgentsPending).toBe(true);
  });

  it('handles action type HOME_QUERY_AGENTS_SUCCESS correctly', () => {
    const prevState = { queryAgentsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_AGENTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryAgentsPending).toBe(false);
  });

  it('handles action type HOME_QUERY_AGENTS_FAILURE correctly', () => {
    const prevState = { queryAgentsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_AGENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryAgentsPending).toBe(false);
    expect(state.queryAgentsError).toEqual(expect.anything());
  });

  it('handles action type HOME_QUERY_AGENTS_DISMISS_ERROR correctly', () => {
    const prevState = { queryAgentsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_AGENTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryAgentsError).toBe(null);
  });
});

