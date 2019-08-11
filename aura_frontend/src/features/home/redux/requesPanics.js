import {
  HOME_REQUES_PANICS_BEGIN,
  HOME_REQUES_PANICS_SUCCESS,
  HOME_REQUES_PANICS_FAILURE,
  HOME_REQUES_PANICS_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function requesPanics(args) {
  return dispatch => {
    dispatch({
      type: HOME_REQUES_PANICS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      axios.post(`http://${__host__}:${__port__}/request_panics/`, args).then(
        res => {
          dispatch({
            type: HOME_REQUES_PANICS_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_REQUES_PANICS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissRequesPanicsError() {
  return {
    type: HOME_REQUES_PANICS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_REQUES_PANICS_BEGIN:
      return {
        ...state,
        requesPanicsPending: true,
        requesPanicsError: null,
      };

    case HOME_REQUES_PANICS_SUCCESS:
      return {
        ...state,
        requesPanicsPending: false,
        requesPanicsError: null,
        request_panic_data: action.data,
      };

    case HOME_REQUES_PANICS_FAILURE:
      return {
        ...state,
        requesPanicsPending: false,
        requesPanicsError: action.data.error,
      };

    case HOME_REQUES_PANICS_DISMISS_ERROR:
      return {
        ...state,
        requesPanicsError: null,
      };

    default:
      return state;
  }
}
