import {
  HOME_UPDATE_AGENT_BEGIN,
  HOME_UPDATE_AGENT_SUCCESS,
  HOME_UPDATE_AGENT_FAILURE,
  HOME_UPDATE_AGENT_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function updateAgent(args) {
  console.log('my data ', args);
  return dispatch => {
    dispatch({
      type: HOME_UPDATE_AGENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.put(`http://${__host__}:${__port__}/security_agent/${args.id}/`, args).then(
        res => {
          dispatch({
            type: HOME_UPDATE_AGENT_SUCCESS,
            data: res,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_UPDATE_AGENT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateAgentError() {
  return {
    type: HOME_UPDATE_AGENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_AGENT_BEGIN:
      return {
        ...state,
        updateAgentPending: true,
        updateAgentError: null,
      };

    case HOME_UPDATE_AGENT_SUCCESS:
      return {
        ...state,
        updateAgentPending: false,
        updateAgentError: null,
        updated_data: action.data,
      };

    case HOME_UPDATE_AGENT_FAILURE:
      return {
        ...state,
        updateAgentPending: false,
        updateAgentError: action.data.error,
      };

    case HOME_UPDATE_AGENT_DISMISS_ERROR:
      return {
        ...state,
        updateAgentError: null,
      };

    default:
      return state;
  }
}
