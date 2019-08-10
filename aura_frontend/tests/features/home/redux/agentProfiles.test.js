import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_AGENT_PROFILES_BEGIN,
  HOME_AGENT_PROFILES_SUCCESS,
  HOME_AGENT_PROFILES_FAILURE,
  HOME_AGENT_PROFILES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  agentProfiles,
  dismissAgentProfilesError,
  reducer,
} from '../../../../src/features/home/redux/agentProfiles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/agentProfiles', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when agentProfiles succeeds', () => {
    const store = mockStore({});

    return store.dispatch(agentProfiles())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_AGENT_PROFILES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_AGENT_PROFILES_SUCCESS);
      });
  });

  it('dispatches failure action when agentProfiles fails', () => {
    const store = mockStore({});

    return store.dispatch(agentProfiles({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_AGENT_PROFILES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_AGENT_PROFILES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAgentProfilesError', () => {
    const expectedAction = {
      type: HOME_AGENT_PROFILES_DISMISS_ERROR,
    };
    expect(dismissAgentProfilesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_AGENT_PROFILES_BEGIN correctly', () => {
    const prevState = { agentProfilesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_AGENT_PROFILES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.agentProfilesPending).toBe(true);
  });

  it('handles action type HOME_AGENT_PROFILES_SUCCESS correctly', () => {
    const prevState = { agentProfilesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_AGENT_PROFILES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.agentProfilesPending).toBe(false);
  });

  it('handles action type HOME_AGENT_PROFILES_FAILURE correctly', () => {
    const prevState = { agentProfilesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_AGENT_PROFILES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.agentProfilesPending).toBe(false);
    expect(state.agentProfilesError).toEqual(expect.anything());
  });

  it('handles action type HOME_AGENT_PROFILES_DISMISS_ERROR correctly', () => {
    const prevState = { agentProfilesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_AGENT_PROFILES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.agentProfilesError).toBe(null);
  });
});

