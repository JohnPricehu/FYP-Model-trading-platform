import {
    FAVOURITE_ADD_REQUEST,
    FAVOURITE_ADD_SUCCESS,
    FAVOURITE_ADD_FAIL,
    FAVOURITE_ADD_RESET,
    FAVOURITE_REMOVE_REQUEST,
    FAVOURITE_REMOVE_SUCCESS,
    FAVOURITE_REMOVE_FAIL,
    FAVOURITE_REQUEST,
    FAVOURITE_SUCCESS,
    FAVOURITE_FAIL,
  } from "../constants/favouriteConstants";
import axios from "axios";

export const addToFavouriteAction = (id ,user ) => async (dispatch,getState) => {
    try {
      dispatch({
        type: FAVOURITE_ADD_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/favourite/goods/${id}`, user, config);
  
      dispatch({
        type: FAVOURITE_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: FAVOURITE_ADD_FAIL,
        payload: message,
      });
    }
  };

  export const deleteFavouriteAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FAVOURITE_REMOVE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/favourite/goods/${id}`, config);
  
      dispatch({
        type: FAVOURITE_REMOVE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: FAVOURITE_REMOVE_FAIL,
        payload: message,
      });
    }
  };

  export const listMyFavourite = () => async (dispatch, getState) => {
    try {
      dispatch({ type: FAVOURITE_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/favourite/myfavourite`, config)
  
      dispatch({ type: FAVOURITE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: FAVOURITE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }