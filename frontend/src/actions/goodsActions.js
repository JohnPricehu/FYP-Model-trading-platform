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
  import axios from "axios";
  
  export const listGoods = (
    // keyword = '', pageNumber = ''
    ) => async (dispatch, 
      // getState
      ) => {
    try {
      dispatch({
        type: GOODS_LIST_REQUEST,
      });
  
      // const {
      //   userLogin: { userInfo },
      // } = getState();
  
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // };
  
      const { data } = await axios.get(`/api/goods`);
  
      dispatch({
        type: GOODS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GOODS_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const listGoodsDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: GOODS_DETAILS_REQUEST })
  
      const { data } = await axios.get(`/api/goods/${id}`)
  
      dispatch({ type: GOODS_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GOODS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const createGoodsAction = (goods_name, goods_details, goods_category, goods_pic, goods_price
    ) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: GOODS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/goods/create`,
        { goods_name, goods_details, goods_category, goods_price, goods_pic },
        config
      );

      dispatch({
        type: GOODS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GOODS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  // export const deleteGoodsAction = (id) => async (dispatch, getState) => {
  //   try {
  //     dispatch({
  //       type: GOODS_DELETE_REQUEST,
  //     });
  
  //     const {
  //       userLogin: { userInfo },
  //     } = getState();
  
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };
  
  //     const { data } = await axios.delete(`/api/goods/${id}`, config);
  
  //     dispatch({
  //       type: GOODS_DELETE_SUCCESS,
  //       payload: data,
  //     });
  //   } catch (error) {
  //     const message =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message;
  //     dispatch({
  //       type: GOODS_DELETE_FAIL,
  //       payload: message,
  //     });
  //   }
  // };
  
  // export const updateGoodsAction = (id, title, content, category) => async (
  //   dispatch,
  //   getState
  // ) => {
  //   try {
  //     dispatch({
  //       type: GOODS_UPDATE_REQUEST,
  //     });
  
  //     const {
  //       userLogin: { userInfo },
  //     } = getState();
  
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };
  
  //     const { data } = await axios.put(
  //       `/api/goods/${id}`,
  //       { title, content, category },
  //       config
  //     );
  
  //     dispatch({
  //       type: GOODS_UPDATE_SUCCESS,
  //       payload: data,
  //     });
  //   } catch (error) {
  //     const message =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message;
  //     dispatch({
  //       type: GOODS_UPDATE_FAIL,
  //       payload: message,
  //     });
  //   }
  // };