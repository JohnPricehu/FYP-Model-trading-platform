import {
    HISTORY_ADD_REQUEST,
    HISTORY_ADD_SUCCESS,
    HISTORY_ADD_FAIL,
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    HISTORY_FAIL,
  } from "../constants/historyConstants";

  export const addHistoryReducer = (state = {historys: {}}, action) => {
    // eslint-disable-next-line default-case
  switch (action.type) {
    case HISTORY_ADD_REQUEST:
      return { loading: true };
    case HISTORY_ADD_SUCCESS:
      return { loading: false, success: true, historys: action.payload };
    case HISTORY_ADD_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const myHistoryReducer = (state = { mhistorys: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case HISTORY_REQUEST:
      return { loading: true, mhistorys: [] }
    case HISTORY_SUCCESS:
      return { loading: false,mhistorys: action.payload }
    case HISTORY_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}