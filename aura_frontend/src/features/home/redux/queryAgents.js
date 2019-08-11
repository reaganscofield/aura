import {
  HOME_QUERY_AGENTS_BEGIN,
  HOME_QUERY_AGENTS_SUCCESS,
  HOME_QUERY_AGENTS_FAILURE,
  HOME_QUERY_AGENTS_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function queryAgents() {
  return dispatch => {
    dispatch({
      type: HOME_QUERY_AGENTS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.get(`http://${__host__}:${__port__}/agent_list`).then(
        res => {
          dispatch({
            type: HOME_QUERY_AGENTS_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_QUERY_AGENTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissQueryAgentsError() {
  return {
    type: HOME_QUERY_AGENTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_QUERY_AGENTS_BEGIN:
      return {
        ...state,
        queryAgentsPending: true,
        queryAgentsError: null,
      };

    case HOME_QUERY_AGENTS_SUCCESS:
      return {
        ...state,
        queryAgentsPending: false,
        queryAgentsError: null,
        agents_data: action.data,
      };

    case HOME_QUERY_AGENTS_FAILURE:
      return {
        ...state,
        queryAgentsPending: false,
        queryAgentsError: action.data.error,
      };

    case HOME_QUERY_AGENTS_DISMISS_ERROR:
      return {
        ...state,
        queryAgentsError: null,
      };

    default:
      return state;
  }
}
