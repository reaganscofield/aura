import {
  HOME_QUERY_PANICS_BEGIN,
  HOME_QUERY_PANICS_SUCCESS,
  HOME_QUERY_PANICS_FAILURE,
  HOME_QUERY_PANICS_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function queryPanics() {
  return dispatch => {
    dispatch({
      type: HOME_QUERY_PANICS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.get(`http://${__host__}:${__port__}/request_panics/`).then(
        res => {
          dispatch({
            type: HOME_QUERY_PANICS_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_QUERY_PANICS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissQueryPanicsError() {
  return {
    type: HOME_QUERY_PANICS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_QUERY_PANICS_BEGIN:
      return {
        ...state,
        queryPanicsPending: true,
        queryPanicsError: null,
      };

    case HOME_QUERY_PANICS_SUCCESS:
      return {
        ...state,
        queryPanicsPending: false,
        queryPanicsError: null,
        panics_data: action.data,
      };

    case HOME_QUERY_PANICS_FAILURE:
      return {
        ...state,
        queryPanicsPending: false,
        queryPanicsError: action.data.error,
      };

    case HOME_QUERY_PANICS_DISMISS_ERROR:
      return {
        ...state,
        queryPanicsError: null,
      };

    default:
      return state;
  }
}
