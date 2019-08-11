import {
  HOME_IS_ON_WAY_BEGIN,
  HOME_IS_ON_WAY_SUCCESS,
  HOME_IS_ON_WAY_FAILURE,
  HOME_IS_ON_WAY_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';


export function isOnWay(args) {
  return (dispatch) => { 
    dispatch({
      type: HOME_IS_ON_WAY_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      axios.put(`http://${__host__}:${__port__}/notifications/${args.id}/`, args).then(
        (res) => {
          dispatch({
            type: HOME_IS_ON_WAY_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
   
        (err) => {
          dispatch({
            type: HOME_IS_ON_WAY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}


export function dismissIsOnWayError() {
  return {
    type: HOME_IS_ON_WAY_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_IS_ON_WAY_BEGIN:
     
      return {
        ...state,
        isOnWayPending: true,
        isOnWayError: null,
      };

    case HOME_IS_ON_WAY_SUCCESS:
     
      return {
        ...state,
        isOnWayPending: false,
        isOnWayError: null,
        is_on_way: action.data,
      };

    case HOME_IS_ON_WAY_FAILURE:
     
      return {
        ...state,
        isOnWayPending: false,
        isOnWayError: action.data.error,
      };

    case HOME_IS_ON_WAY_DISMISS_ERROR:
      
      return {
        ...state,
        isOnWayError: null,
      };

    default:
      return state;
  }
}
