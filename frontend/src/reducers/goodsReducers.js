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
    GOODS_ALL_LIST_FAIL,
    GOODS_ALL_LIST_REQUEST,
    GOODS_ALL_LIST_SUCCESS,
    GOODS_DETAILS_REQUEST,
    GOODS_DETAILS_SUCCESS,
    GOODS_DETAILS_FAIL,
    GOODS_TOP_REQUEST,
    GOODS_TOP_SUCCESS,
    GOODS_TOP_FAIL,
    GOODS_BEST_SALES_REQUEST,
    GOODS_BEST_SALES_SUCCESS,
    GOODS_BEST_SALES_FAIL,
    GOODS_SPECIAL_REQUEST,
    GOODS_SPECIAL_SUCCESS,
    GOODS_SPECIAL_FAIL,
    GOODS_CREATE_REVIEW_FAIL,
    GOODS_CREATE_REVIEW_REQUEST,
    GOODS_CREATE_REVIEW_RESET,
    GOODS_CREATE_REVIEW_SUCCESS,
    GOODS_LIST_MY_REQUEST,
    GOODS_LIST_MY_SUCCESS,
    GOODS_LIST_MY_FAIL,
  } from "../constants/goodsConstants";
  
  export const goodsListReducer = (state = { goods: [] }, action) => {
      // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_LIST_REQUEST:
        return { loading: true,
          goods: [] };
      case GOODS_LIST_SUCCESS:
        return { loading: false, goods: action.payload.goods, 
          pages: action.payload.pages,
          page: action.payload.page,};
      case GOODS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const goodsAllListReducer = (state = { goods: [] }, action) => {
    // eslint-disable-next-line default-case
  switch (action.type) {
    case GOODS_ALL_LIST_REQUEST:
      return { loading: true,
        goods: [] };
    case GOODS_ALL_LIST_SUCCESS:
      return { loading: false, goods: action.payload.goods, 
        pages: action.payload.pages,
        page: action.payload.page,};
    case GOODS_ALL_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

  export const goodsDetailReducer = (
    state = { good: {reviews: [] }},action
  ) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_DETAILS_REQUEST:
        return { loading: true, ...state }
      case GOODS_DETAILS_SUCCESS:
        return { loading: false, good: action.payload }
      case GOODS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const goodsCreateReducer = (state = {}, action) => {
      // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_CREATE_REQUEST:
        return { loading: true };
      case GOODS_CREATE_SUCCESS:
        return { loading: false, success: true, GOODS: action.payload };
      case GOODS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const goodsDeleteReducer = (state = {}, action) => {
      // eslint-disable-next-line default-case
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
  
  export const goodsUpdateReducer = (state = { goods: {}}, action) => {
      // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_UPDATE_REQUEST:
        return { loading: true };
      case GOODS_UPDATE_SUCCESS:
        return { loading: false, success: true, goods: action.payload };
      case GOODS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };

  export const goodsTopRatedReducer = (state = { goods: [] }, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_TOP_REQUEST:
        return { loading: true, goods: [] }
      case GOODS_TOP_SUCCESS:
        return { loading: false, goods: action.payload }
      case GOODS_TOP_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }

  export const goodsBestSalesReducer = (state = { bsgoods: [] }, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_BEST_SALES_REQUEST:
        return { loading: true, bsgoods: [] }
      case GOODS_BEST_SALES_SUCCESS:
        return { loading: false, bsgoods: action.payload }
      case GOODS_BEST_SALES_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }

  export const goodsSpecialReducer = (state = { sgoods: [] }, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_SPECIAL_REQUEST:
        return { loading: true, sgoods: [] }
      case GOODS_SPECIAL_SUCCESS:
        return { loading: false, sgoods: action.payload }
      case GOODS_SPECIAL_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }
  export const goodsMyReducer = (state = { mgoods: [] }, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_LIST_MY_REQUEST:
        return { loading: true, mgoods: [] }
      case GOODS_LIST_MY_SUCCESS:
        return { loading: false, mgoods: action.payload }
      case GOODS_LIST_MY_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }
  export const goodsReviewCreateReducer = (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case GOODS_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case GOODS_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case GOODS_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case GOODS_CREATE_REVIEW_RESET:
        return {}
  
      default:
        return state
    }
  }