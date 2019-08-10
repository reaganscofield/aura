import {
  HOME_QUERY_VEHICULES_BEGIN,
  HOME_QUERY_VEHICULES_SUCCESS,
  HOME_QUERY_VEHICULES_FAILURE,
  HOME_QUERY_VEHICULES_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function queryVehicules(args) {
  return dispatch => {
    dispatch({
      type: HOME_QUERY_VEHICULES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.get(`http://${__host__}:${__port__}/filter_vehicule/?company_id=${args}`).then(
        res => {
          dispatch({
            type: HOME_QUERY_VEHICULES_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        err => {
          dispatch({
            type: HOME_QUERY_VEHICULES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissQueryVehiculesError() {
  return {
    type: HOME_QUERY_VEHICULES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_QUERY_VEHICULES_BEGIN:
      return {
        ...state,
        queryVehiculesPending: true,
        queryVehiculesError: null,
      };

    case HOME_QUERY_VEHICULES_SUCCESS:
      return {
        ...state,
        queryVehiculesPending: false,
        queryVehiculesError: null,
        vehicules_data: action.data,
      };

    case HOME_QUERY_VEHICULES_FAILURE:
      return {
        ...state,
        queryVehiculesPending: false,
        queryVehiculesError: action.data.error,
      };

    case HOME_QUERY_VEHICULES_DISMISS_ERROR:
      return {
        ...state,
        queryVehiculesError: null,
      };

    default:
      return state;
  }
}
