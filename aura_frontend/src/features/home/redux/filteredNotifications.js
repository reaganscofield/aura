import {
  HOME_FILTERED_NOTIFICATIONS_BEGIN,
  HOME_FILTERED_NOTIFICATIONS_SUCCESS,
  HOME_FILTERED_NOTIFICATIONS_FAILURE,
  HOME_FILTERED_NOTIFICATIONS_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';


export function filteredNotifications(arg) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FILTERED_NOTIFICATIONS_BEGIN,
    });


    const promise = new Promise((resolve, reject) => {
   
      axios.get(`http://${__host__}:${__port__}/filtered_notifications/?agent_id=${arg}`).then(
        (res) => {
          dispatch({
            type: HOME_FILTERED_NOTIFICATIONS_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
   
        (err) => {
          dispatch({
            type: HOME_FILTERED_NOTIFICATIONS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}


export function dismissFilteredNotificationsError() {
  return {
    type: HOME_FILTERED_NOTIFICATIONS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FILTERED_NOTIFICATIONS_BEGIN:
    
      return {
        ...state,
        filteredNotificationsPending: true,
        filteredNotificationsError: null,
      };

    case HOME_FILTERED_NOTIFICATIONS_SUCCESS:
      
      return {
        ...state,
        filteredNotificationsPending: false,
        filteredNotificationsError: null,
        notifications_data: action.data,
      };

    case HOME_FILTERED_NOTIFICATIONS_FAILURE:
    
      return {
        ...state,
        filteredNotificationsPending: false,
        filteredNotificationsError: action.data.error,
      };

    case HOME_FILTERED_NOTIFICATIONS_DISMISS_ERROR:
      
      return {
        ...state,
        filteredNotificationsError: null,
      };

    default:
      return state;
  }
}
