import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_QUERY_VEHICULES_BEGIN,
  HOME_QUERY_VEHICULES_SUCCESS,
  HOME_QUERY_VEHICULES_FAILURE,
  HOME_QUERY_VEHICULES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  queryVehicules,
  dismissQueryVehiculesError,
  reducer,
} from '../../../../src/features/home/redux/queryVehicules';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/queryVehicules', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when queryVehicules succeeds', () => {
    const store = mockStore({});

    return store.dispatch(queryVehicules())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_QUERY_VEHICULES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_QUERY_VEHICULES_SUCCESS);
      });
  });

  it('dispatches failure action when queryVehicules fails', () => {
    const store = mockStore({});

    return store.dispatch(queryVehicules({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_QUERY_VEHICULES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_QUERY_VEHICULES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissQueryVehiculesError', () => {
    const expectedAction = {
      type: HOME_QUERY_VEHICULES_DISMISS_ERROR,
    };
    expect(dismissQueryVehiculesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_QUERY_VEHICULES_BEGIN correctly', () => {
    const prevState = { queryVehiculesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_VEHICULES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryVehiculesPending).toBe(true);
  });

  it('handles action type HOME_QUERY_VEHICULES_SUCCESS correctly', () => {
    const prevState = { queryVehiculesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_VEHICULES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryVehiculesPending).toBe(false);
  });

  it('handles action type HOME_QUERY_VEHICULES_FAILURE correctly', () => {
    const prevState = { queryVehiculesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_VEHICULES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryVehiculesPending).toBe(false);
    expect(state.queryVehiculesError).toEqual(expect.anything());
  });

  it('handles action type HOME_QUERY_VEHICULES_DISMISS_ERROR correctly', () => {
    const prevState = { queryVehiculesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_QUERY_VEHICULES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.queryVehiculesError).toBe(null);
  });
});

