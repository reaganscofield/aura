import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_QUERY_COMPANIES_BEGIN,
  HOME_QUERY_COMPANIES_SUCCESS,
  HOME_QUERY_COMPANIES_FAILURE,
  HOME_QUERY_COMPANIES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  queryCompanies,
  dismissQueryCompaniesError,
  reducer,
} from '../../../../src/features/home/redux/queryCompanies';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/queryCompanies', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when queryCompanies succeeds', () => {
    const store = mockStore({});

    return store.dispatch(queryCompanies())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_QUERY_COMPANIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_QUERY_COMPANIES_SUCCESS);
      });
  });

  it('dispatches failure action when queryCompanies fails', () => {
    const store = mockStore({});

    return store.dispatch(queryCompanies({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_QUERY_COMPANIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_QUERY_COMPANIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissQueryCompaniesError', () => {
    const expectedAction = {
      type: HOME_QUERY_COMPANIES_DISMISS_ERROR,
    };
    expect(dismissQueryCompaniesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_QUERY_COMPANIES_BEGIN correctly', () => {
    const prevState = { queryCompaniesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_COMPANIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryCompaniesPending).toBe(true);
  });

  it('handles action type HOME_QUERY_COMPANIES_SUCCESS correctly', () => {
    const prevState = { queryCompaniesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_COMPANIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryCompaniesPending).toBe(false);
  });

  it('handles action type HOME_QUERY_COMPANIES_FAILURE correctly', () => {
    const prevState = { queryCompaniesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_COMPANIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryCompaniesPending).toBe(false);
    expect(state.queryCompaniesError).toEqual(expect.anything());
  });

  it('handles action type HOME_QUERY_COMPANIES_DISMISS_ERROR correctly', () => {
    const prevState = { queryCompaniesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_COMPANIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryCompaniesError).toBe(null);
  });
});

