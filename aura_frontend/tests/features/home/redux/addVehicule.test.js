import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_ADD_VEHICULE_BEGIN,
  HOME_ADD_VEHICULE_SUCCESS,
  HOME_ADD_VEHICULE_FAILURE,
  HOME_ADD_VEHICULE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  addVehicule,
  dismissAddVehiculeError,
  reducer,
} from '../../../../src/features/home/redux/addVehicule';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addVehicule', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addVehicule succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addVehicule())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_VEHICULE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_VEHICULE_SUCCESS);
      });
  });

  it('dispatches failure action when addVehicule fails', () => {
    const store = mockStore({});

    return store.dispatch(addVehicule({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_VEHICULE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_VEHICULE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddVehiculeError', () => {
    const expectedAction = {
      type: HOME_ADD_VEHICULE_DISMISS_ERROR,
    };
    expect(dismissAddVehiculeError()).toEqual(expectedAction);
  });

  it('handles action type HOME_ADD_VEHICULE_BEGIN correctly', () => {
    const prevState = { addVehiculePending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_VEHICULE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addVehiculePending).toBe(true);
  });

  it('handles action type HOME_ADD_VEHICULE_SUCCESS correctly', () => {
    const prevState = { addVehiculePending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_VEHICULE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addVehiculePending).toBe(false);
  });

  it('handles action type HOME_ADD_VEHICULE_FAILURE correctly', () => {
    const prevState = { addVehiculePending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_VEHICULE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addVehiculePending).toBe(false);
    expect(state.addVehiculeError).toEqual(expect.anything());
  });

  it('handles action type HOME_ADD_VEHICULE_DISMISS_ERROR correctly', () => {
    const prevState = { addVehiculeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_VEHICULE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addVehiculeError).toBe(null);
  });
});

