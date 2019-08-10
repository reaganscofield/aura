import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEARCH_PROFILES_BEGIN,
  HOME_SEARCH_PROFILES_SUCCESS,
  HOME_SEARCH_PROFILES_FAILURE,
  HOME_SEARCH_PROFILES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  searchProfiles,
  dismissSearchProfilesError,
  reducer,
} from '../../../../src/features/home/redux/searchProfiles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/searchProfiles', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchProfiles succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchProfiles())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_PROFILES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_PROFILES_SUCCESS);
      });
  });

  it('dispatches failure action when searchProfiles fails', () => {
    const store = mockStore({});

    return store.dispatch(searchProfiles({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_PROFILES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_PROFILES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchProfilesError', () => {
    const expectedAction = {
      type: HOME_SEARCH_PROFILES_DISMISS_ERROR,
    };
    expect(dismissSearchProfilesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEARCH_PROFILES_BEGIN correctly', () => {
    const prevState = { searchProfilesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_PROFILES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchProfilesPending).toBe(true);
  });

  it('handles action type HOME_SEARCH_PROFILES_SUCCESS correctly', () => {
    const prevState = { searchProfilesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_PROFILES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchProfilesPending).toBe(false);
  });

  it('handles action type HOME_SEARCH_PROFILES_FAILURE correctly', () => {
    const prevState = { searchProfilesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_PROFILES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchProfilesPending).toBe(false);
    expect(state.searchProfilesError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEARCH_PROFILES_DISMISS_ERROR correctly', () => {
    const prevState = { searchProfilesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_PROFILES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchProfilesError).toBe(null);
  });
});

