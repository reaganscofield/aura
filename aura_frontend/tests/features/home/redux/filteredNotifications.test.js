import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FILTERED_NOTIFICATIONS_BEGIN,
  HOME_FILTERED_NOTIFICATIONS_SUCCESS,
  HOME_FILTERED_NOTIFICATIONS_FAILURE,
  HOME_FILTERED_NOTIFICATIONS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  filteredNotifications,
  dismissFilteredNotificationsError,
  reducer,
} from '../../../../src/features/home/redux/filteredNotifications';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/filteredNotifications', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when filteredNotifications succeeds', () => {
    const store = mockStore({});

    return store.dispatch(filteredNotifications())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FILTERED_NOTIFICATIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FILTERED_NOTIFICATIONS_SUCCESS);
      });
  });

  it('dispatches failure action when filteredNotifications fails', () => {
    const store = mockStore({});

    return store.dispatch(filteredNotifications({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FILTERED_NOTIFICATIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FILTERED_NOTIFICATIONS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFilteredNotificationsError', () => {
    const expectedAction = {
      type: HOME_FILTERED_NOTIFICATIONS_DISMISS_ERROR,
    };
    expect(dismissFilteredNotificationsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FILTERED_NOTIFICATIONS_BEGIN correctly', () => {
    const prevState = { filteredNotificationsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FILTERED_NOTIFICATIONS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.filteredNotificationsPending).toBe(true);
  });

  it('handles action type HOME_FILTERED_NOTIFICATIONS_SUCCESS correctly', () => {
    const prevState = { filteredNotificationsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FILTERED_NOTIFICATIONS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.filteredNotificationsPending).toBe(false);
  });

  it('handles action type HOME_FILTERED_NOTIFICATIONS_FAILURE correctly', () => {
    const prevState = { filteredNotificationsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FILTERED_NOTIFICATIONS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.filteredNotificationsPending).toBe(false);
    expect(state.filteredNotificationsError).toEqual(expect.anything());
  });

  it('handles action type HOME_FILTERED_NOTIFICATIONS_DISMISS_ERROR correctly', () => {
    const prevState = { filteredNotificationsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FILTERED_NOTIFICATIONS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.filteredNotificationsError).toBe(null);
  });
});

