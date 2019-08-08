import {
  HOME_USERS_BEGIN,
  HOME_USERS_SUCCESS,
  HOME_USERS_FAILURE,
  HOME_USERS_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ }  from '../../../common/constan';


export function users(args) {

  return (dispatch) => { 
    dispatch({
      type: HOME_USERS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {

      axios.post(`http://${__host__}:${__port__}/users/`, args).then(
        (res) => {
          dispatch({
            type: HOME_USERS_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_USERS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
      
    });

    return promise;
  };
}

export function dismissUsersError() {
  return {
    type: HOME_USERS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_USERS_BEGIN:
    
      return {
        ...state,
        usersPending: true,
        usersError: null,
      };

    case HOME_USERS_SUCCESS:
   
      return {
        ...state,
        usersPending: false,
        usersError: null,
        data: action.data,
      };

    case HOME_USERS_FAILURE:
     
      return {
        ...state,
        usersPending: false,
        usersError: action.data.error,
      };

    case HOME_USERS_DISMISS_ERROR:
     
      return {
        ...state,
        usersError: null,
      };

    default:
      return state;
  }
}
