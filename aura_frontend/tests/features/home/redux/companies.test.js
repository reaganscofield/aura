import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_COMPANIES_BEGIN,
  HOME_COMPANIES_SUCCESS,
  HOME_COMPANIES_FAILURE,
  HOME_COMPANIES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  companies,
  dismissCompaniesError,
  reducer,
} from '../../../../src/features/home/redux/companies';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/companies', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when companies succeeds', () => {
    const store = mockStore({});

    return store.dispatch(companies())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_COMPANIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_COMPANIES_SUCCESS);
      });
  });

  it('dispatches failure action when companies fails', () => {
    const store = mockStore({});

    return store.dispatch(companies({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_COMPANIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_COMPANIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCompaniesError', () => {
    const expectedAction = {
      type: HOME_COMPANIES_DISMISS_ERROR,
    };
    expect(dismissCompaniesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_COMPANIES_BEGIN correctly', () => {
    const prevState = { companiesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_COMPANIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.companiesPending).toBe(true);
  });

  it('handles action type HOME_COMPANIES_SUCCESS correctly', () => {
    const prevState = { companiesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_COMPANIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.companiesPending).toBe(false);
  });

  it('handles action type HOME_COMPANIES_FAILURE correctly', () => {
    const prevState = { companiesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_COMPANIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.companiesPending).toBe(false);
    expect(state.companiesError).toEqual(expect.anything());
  });

  it('handles action type HOME_COMPANIES_DISMISS_ERROR correctly', () => {
    const prevState = { companiesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_COMPANIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.companiesError).toBe(null);
  });
});

