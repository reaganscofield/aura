import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEARCH_COMPANY_BEGIN,
  HOME_SEARCH_COMPANY_SUCCESS,
  HOME_SEARCH_COMPANY_FAILURE,
  HOME_SEARCH_COMPANY_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  searchCompany,
  dismissSearchCompanyError,
  reducer,
} from '../../../../src/features/home/redux/searchCompany';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/searchCompany', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchCompany succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchCompany())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_COMPANY_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_COMPANY_SUCCESS);
      });
  });

  it('dispatches failure action when searchCompany fails', () => {
    const store = mockStore({});

    return store.dispatch(searchCompany({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_COMPANY_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_COMPANY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchCompanyError', () => {
    const expectedAction = {
      type: HOME_SEARCH_COMPANY_DISMISS_ERROR,
    };
    expect(dismissSearchCompanyError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEARCH_COMPANY_BEGIN correctly', () => {
    const prevState = { searchCompanyPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_COMPANY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchCompanyPending).toBe(true);
  });

  it('handles action type HOME_SEARCH_COMPANY_SUCCESS correctly', () => {
    const prevState = { searchCompanyPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_COMPANY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchCompanyPending).toBe(false);
  });

  it('handles action type HOME_SEARCH_COMPANY_FAILURE correctly', () => {
    const prevState = { searchCompanyPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_COMPANY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchCompanyPending).toBe(false);
    expect(state.searchCompanyError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEARCH_COMPANY_DISMISS_ERROR correctly', () => {
    const prevState = { searchCompanyError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_COMPANY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchCompanyError).toBe(null);
  });
});

