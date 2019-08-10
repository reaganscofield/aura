import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_UPDATE_AGENT_BEGIN,
  HOME_UPDATE_AGENT_SUCCESS,
  HOME_UPDATE_AGENT_FAILURE,
  HOME_UPDATE_AGENT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  updateAgent,
  dismissUpdateAgentError,
  reducer,
} from '../../../../src/features/home/redux/updateAgent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/updateAgent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateAgent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateAgent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_UPDATE_AGENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_UPDATE_AGENT_SUCCESS);
      });
  });

  it('dispatches failure action when updateAgent fails', () => {
    const store = mockStore({});

    return store.dispatch(updateAgent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_UPDATE_AGENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_UPDATE_AGENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateAgentError', () => {
    const expectedAction = {
      type: HOME_UPDATE_AGENT_DISMISS_ERROR,
    };
    expect(dismissUpdateAgentError()).toEqual(expectedAction);
  });

  it('handles action type HOME_UPDATE_AGENT_BEGIN correctly', () => {
    const prevState = { updateAgentPending: false };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_AGENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateAgentPending).toBe(true);
  });

  it('handles action type HOME_UPDATE_AGENT_SUCCESS correctly', () => {
    const prevState = { updateAgentPending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_AGENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateAgentPending).toBe(false);
  });

  it('handles action type HOME_UPDATE_AGENT_FAILURE correctly', () => {
    const prevState = { updateAgentPending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_AGENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateAgentPending).toBe(false);
    expect(state.updateAgentError).toEqual(expect.anything());
  });

  it('handles action type HOME_UPDATE_AGENT_DISMISS_ERROR correctly', () => {
    const prevState = { updateAgentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_AGENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateAgentError).toBe(null);
  });
});

