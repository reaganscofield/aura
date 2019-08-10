import {
  HOME_SEARCH_COMPANY_BEGIN,
  HOME_SEARCH_COMPANY_SUCCESS,
  HOME_SEARCH_COMPANY_FAILURE,
  HOME_SEARCH_COMPANY_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function searchCompany(args) {
  return dispatch => {
    dispatch({
      type: HOME_SEARCH_COMPANY_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      axios
        .get(
          `http://${__host__}:${__port__}/company_search/?name=${args.name}&phone_number=${
            args.phone_number
          }`,
        )
        .then(
          res => {
            dispatch({
              type: HOME_SEARCH_COMPANY_SUCCESS,
              data: res.data,
            });
            resolve(res);
          },

          err => {
            dispatch({
              type: HOME_SEARCH_COMPANY_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissSearchCompanyError() {
  return {
    type: HOME_SEARCH_COMPANY_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SEARCH_COMPANY_BEGIN:
      return {
        ...state,
        searchCompanyPending: true,
        searchCompanyError: null,
      };

    case HOME_SEARCH_COMPANY_SUCCESS:
      return {
        ...state,
        searchCompanyPending: false,
        searchCompanyError: null,
        search_company: action.data,
      };

    case HOME_SEARCH_COMPANY_FAILURE:
      return {
        ...state,
        searchCompanyPending: false,
        searchCompanyError: action.data.error,
      };

    case HOME_SEARCH_COMPANY_DISMISS_ERROR:
      return {
        ...state,
        searchCompanyError: null,
      };

    default:
      return state;
  }
}
