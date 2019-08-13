import {
  HOME_AGENT_PROFILES_BEGIN,
  HOME_AGENT_PROFILES_SUCCESS,
  HOME_AGENT_PROFILES_FAILURE,
  HOME_AGENT_PROFILES_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function agentProfiles(args) {
  return dispatch => {
    dispatch({
      type: HOME_AGENT_PROFILES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.post(`http://${__host__}:${__port__}/security_agent/`, args).then(
        res => {
          dispatch({
            type: HOME_AGENT_PROFILES_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_AGENT_PROFILES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissAgentProfilesError() {
  return {
    type: HOME_AGENT_PROFILES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_AGENT_PROFILES_BEGIN:
      return {
        ...state,
        agentProfilesPending: true,
        agentProfilesError: null,
      };

    case HOME_AGENT_PROFILES_SUCCESS:
      return {
        ...state,
        agentProfilesPending: false,
        agentProfilesError: null,
        agent_data: action.data,
      };

    case HOME_AGENT_PROFILES_FAILURE:
      return {
        ...state,
        agentProfilesPending: false,
        agentProfilesError: action.data.error,
      };

    case HOME_AGENT_PROFILES_DISMISS_ERROR:
      return {
        ...state,
        agentProfilesError: null,
      };

    default:
      return state;
  }
}
