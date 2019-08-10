import {
  HOME_SEARCH_PROFILES_BEGIN,
  HOME_SEARCH_PROFILES_SUCCESS,
  HOME_SEARCH_PROFILES_FAILURE,
  HOME_SEARCH_PROFILES_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function searchProfiles(args) {
  return dispatch => {
    dispatch({
      type: HOME_SEARCH_PROFILES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios
        .get(
          `http://${__host__}:${__port__}/agent_search/?username=${args.username}&phone_number=${
            args.phone_number
          }`,
        )
        .then(
          res => {
            dispatch({
              type: HOME_SEARCH_PROFILES_SUCCESS,
              data: res.data,
            });
            resolve(res);
          },

          err => {
            dispatch({
              type: HOME_SEARCH_PROFILES_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissSearchProfilesError() {
  return {
    type: HOME_SEARCH_PROFILES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SEARCH_PROFILES_BEGIN:
      return {
        ...state,
        searchProfilesPending: true,
        searchProfilesError: null,
      };

    case HOME_SEARCH_PROFILES_SUCCESS:
      return {
        ...state,
        searchProfilesPending: false,
        searchProfilesError: null,
        agent_query_result: action.data,
      };

    case HOME_SEARCH_PROFILES_FAILURE:
      return {
        ...state,
        searchProfilesPending: false,
        searchProfilesError: action.data.error,
      };

    case HOME_SEARCH_PROFILES_DISMISS_ERROR:
      return {
        ...state,
        searchProfilesError: null,
      };

    default:
      return state;
  }
}
