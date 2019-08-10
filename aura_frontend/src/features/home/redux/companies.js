import {
  HOME_COMPANIES_BEGIN,
  HOME_COMPANIES_SUCCESS,
  HOME_COMPANIES_FAILURE,
  HOME_COMPANIES_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function companies(args) {
  return dispatch => {
    dispatch({
      type: HOME_COMPANIES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.post(`http://${__host__}:${__port__}/companies/`, args).then(
        res => {
          dispatch({
            type: HOME_COMPANIES_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_COMPANIES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissCompaniesError() {
  return {
    type: HOME_COMPANIES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_COMPANIES_BEGIN:
      return {
        ...state,
        companiesPending: true,
        companiesError: null,
      };

    case HOME_COMPANIES_SUCCESS:
      return {
        ...state,
        companiesPending: false,
        companiesError: null,
        company: action.data,
      };

    case HOME_COMPANIES_FAILURE:
      return {
        ...state,
        companiesPending: false,
        companiesError: action.data.error,
      };

    case HOME_COMPANIES_DISMISS_ERROR:
      return {
        ...state,
        companiesError: null,
      };

    default:
      return state;
  }
}
