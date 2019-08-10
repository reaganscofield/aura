import {
  HOME_ADD_VEHICULE_BEGIN,
  HOME_ADD_VEHICULE_SUCCESS,
  HOME_ADD_VEHICULE_FAILURE,
  HOME_ADD_VEHICULE_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { __host__, __port__ } from '../../../common/constan';

export function addVehicule(args) {
  return dispatch => {
    dispatch({
      type: HOME_ADD_VEHICULE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      axios.post(`http://${__host__}:${__port__}/vehicule/`, args).then(
        res => {
          dispatch({
            type: HOME_ADD_VEHICULE_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: HOME_ADD_VEHICULE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissAddVehiculeError() {
  return {
    type: HOME_ADD_VEHICULE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_VEHICULE_BEGIN:
      return {
        ...state,
        addVehiculePending: true,
        addVehiculeError: null,
      };

    case HOME_ADD_VEHICULE_SUCCESS:
      return {
        ...state,
        addVehiculePending: false,
        addVehiculeError: null,
        vehicule: action.data,
      };

    case HOME_ADD_VEHICULE_FAILURE:
      return {
        ...state,
        addVehiculePending: false,
        addVehiculeError: action.data.error,
      };

    case HOME_ADD_VEHICULE_DISMISS_ERROR:
      return {
        ...state,
        addVehiculeError: null,
      };

    default:
      return state;
  }
}
