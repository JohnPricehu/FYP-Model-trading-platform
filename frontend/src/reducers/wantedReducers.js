import {
    WANTED_ADD_REQUEST,
    WANTED_ADD_SUCCESS,
    WANTED_ADD_FAIL,
    WANTED_REMOVE_REQUEST,
    WANTED_REMOVE_SUCCESS,
    WANTED_REMOVE_FAIL,
    WANTED_REQUEST,
    WANTED_SUCCESS,
    WANTED_FAIL,
  } from "../constants/wantedConstants";

  export const addWantedReducer = (state = {wanteds: {}}, action) => {
    // eslint-disable-next-line default-case
  switch (action.type) {
    case WANTED_ADD_REQUEST:
      return { loading: true };
    case WANTED_ADD_SUCCESS:
      return { loading: false, success: true, wanteds: action.payload };
    case WANTED_ADD_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const deleteWantedReducer = (state = {}, action) => {
    // eslint-disable-next-line default-case
  switch (action.type) {
    case WANTED_REMOVE_REQUEST:
      return { loading: true };
    case WANTED_REMOVE_SUCCESS:
      return { loading: false, success: true };
    case WANTED_REMOVE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const myWantedReducer = (state = { mwanteds: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case WANTED_REQUEST:
      return { loading: true, mwanteds: [] }
    case WANTED_SUCCESS:
      return { loading: false,mwanteds: action.payload }
    case WANTED_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}