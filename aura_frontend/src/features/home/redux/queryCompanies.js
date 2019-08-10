import {
  HOME_QUERY_COMPANIES_BEGIN,
  HOME_QUERY_COMPANIES_SUCCESS,
  HOME_QUERY_COMPANIES_FAILURE,
  HOME_QUERY_COMPANIES_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function queryCompanies() {
  return dispatch => {
    dispatch({
      type: HOME_QUERY_COMPANIES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.get(`http://${__host__}:${__port__}/companies`).then(
        res => {
          dispatch({
            type: HOME_QUERY_COMPANIES_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_QUERY_COMPANIES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissQueryCompaniesError() {
  return {
    type: HOME_QUERY_COMPANIES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_QUERY_COMPANIES_BEGIN:
      return {
        ...state,
        queryCompaniesPending: true,
        queryCompaniesError: null,
      };

    case HOME_QUERY_COMPANIES_SUCCESS:
      return {
        ...state,
        queryCompaniesPending: false,
        queryCompaniesError: null,
        companies_data: action.data,
      };

    case HOME_QUERY_COMPANIES_FAILURE:
      return {
        ...state,
        queryCompaniesPending: false,
        queryCompaniesError: action.data.error,
      };

    case HOME_QUERY_COMPANIES_DISMISS_ERROR:
      return {
        ...state,
        queryCompaniesError: null,
      };

    default:
      return state;
  }
}
