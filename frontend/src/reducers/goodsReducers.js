import {
    GOODS_UPDATE_REQUEST,
    GOODS_UPDATE_SUCCESS,
    GOODS_UPDATE_FAIL,
    GOODS_CREATE_FAIL,
    GOODS_CREATE_REQUEST,
    GOODS_CREATE_SUCCESS,
    GOODS_DELETE_FAIL,
    GOODS_DELETE_REQUEST,
    GOODS_DELETE_SUCCESS,
    GOODS_LIST_FAIL,
    GOODS_LIST_REQUEST,
    GOODS_LIST_SUCCESS,
    GOODS_DETAILS_REQUEST,
    GOODS_DETAILS_SUCCESS,
    GOODS_DETAILS_FAIL,
  } from "../constants/goodsConstants";
  
  export const goodsListReducer = (state = { goods: [] }, action) => {
    switch (action.type) {
      case GOODS_LIST_REQUEST:
        return { loading: true,
          goods: [] };
      case GOODS_LIST_SUCCESS:
        return { loading: false, goods: action.payload.goods };
      case GOODS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const goodsDetailReducer = (
    state = { goods: [] },action
  ) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_DETAILS_REQUEST:
        return { loading: true, ...state }
      case GOODS_DETAILS_SUCCESS:
        return { loading: false, goods: action.payload }
      case GOODS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const goodsCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case GOODS_CREATE_REQUEST:
        return { loading: true };
      case GOODS_CREATE_SUCCESS:
        return { loading: false, success: true };
      case GOODS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const goodsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case GOODS_DELETE_REQUEST:
        return { loading: true };
      case GOODS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case GOODS_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const goodsUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case GOODS_UPDATE_REQUEST:
        return { loading: true };
      case GOODS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case GOODS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };