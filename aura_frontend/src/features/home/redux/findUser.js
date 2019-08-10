import {
  HOME_FIND_USER_BEGIN,
  HOME_FIND_USER_SUCCESS,
  HOME_FIND_USER_FAILURE,
  HOME_FIND_USER_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function findUser(arg) {
  return dispatch => {
    dispatch({
      type: HOME_FIND_USER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.get(`http://${__host__}:${__port__}/find_user/${arg}`).then(
        res => {
          dispatch({
            type: HOME_FIND_USER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_FIND_USER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFindUserError() {
  return {
    type: HOME_FIND_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FIND_USER_BEGIN:
      return {
        ...state,
        findUserPending: true,
        findUserError: null,
      };

    case HOME_FIND_USER_SUCCESS:
      return {
        ...state,
        findUserPending: false,
        findUserError: null,
        user_finds: action.data,
      };

    case HOME_FIND_USER_FAILURE:
      return {
        ...state,
        findUserPending: false,
        findUserError: action.data.error,
      };

    case HOME_FIND_USER_DISMISS_ERROR:
      return {
        ...state,
        findUserError: null,
      };

    default:
      return state;
  }
}
