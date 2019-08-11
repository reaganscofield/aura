import {
  HOME_IS_ARRIVED_BEGIN,
  HOME_IS_ARRIVED_SUCCESS,
  HOME_IS_ARRIVED_FAILURE,
  HOME_IS_ARRIVED_DISMISS_ERROR,
} from './constants';

export function isArrived(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: HOME_IS_ARRIVED_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_IS_ARRIVED_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_IS_ARRIVED_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}


export function dismissIsArrivedError() {
  return {
    type: HOME_IS_ARRIVED_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_IS_ARRIVED_BEGIN:
   
      return {
        ...state,
        isArrivedPending: true,
        isArrivedError: null,
      };

    case HOME_IS_ARRIVED_SUCCESS:
    
      return {
        ...state,
        isArrivedPending: false,
        isArrivedError: null,
      };

    case HOME_IS_ARRIVED_FAILURE:
    
      return {
        ...state,
        isArrivedPending: false,
        isArrivedError: action.data.error,
      };

    case HOME_IS_ARRIVED_DISMISS_ERROR:
    
      return {
        ...state,
        isArrivedError: null,
      };

    default:
      return state;
  }
}
