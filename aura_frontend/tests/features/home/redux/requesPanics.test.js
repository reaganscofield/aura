import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_REQUES_PANICS_BEGIN,
  HOME_REQUES_PANICS_SUCCESS,
  HOME_REQUES_PANICS_FAILURE,
  HOME_REQUES_PANICS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  requesPanics,
  dismissRequesPanicsError,
  reducer,
} from '../../../../src/features/home/redux/requesPanics';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/requesPanics', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requesPanics succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requesPanics())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_REQUES_PANICS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_REQUES_PANICS_SUCCESS);
      });
  });

  it('dispatches failure action when requesPanics fails', () => {
    const store = mockStore({});

    return store.dispatch(requesPanics({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_REQUES_PANICS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_REQUES_PANICS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRequesPanicsError', () => {
    const expectedAction = {
      type: HOME_REQUES_PANICS_DISMISS_ERROR,
    };
    expect(dismissRequesPanicsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_REQUES_PANICS_BEGIN correctly', () => {
    const prevState = { requesPanicsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_REQUES_PANICS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.requesPanicsPending).toBe(true);
  });

  it('handles action type HOME_REQUES_PANICS_SUCCESS correctly', () => {
    const prevState = { requesPanicsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_REQUES_PANICS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.requesPanicsPending).toBe(false);
  });

  it('handles action type HOME_REQUES_PANICS_FAILURE correctly', () => {
    const prevState = { requesPanicsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_REQUES_PANICS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.requesPanicsPending).toBe(false);
    expect(state.requesPanicsError).toEqual(expect.anything());
  });

  it('handles action type HOME_REQUES_PANICS_DISMISS_ERROR correctly', () => {
    const prevState = { requesPanicsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_REQUES_PANICS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.requesPanicsError).toBe(null);
  });
});

