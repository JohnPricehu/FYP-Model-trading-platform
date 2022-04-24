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
import axios from "axios";

export const addToWantedAction = (id ,user ) => async (dispatch,getState) => {
    try {
      dispatch({
        type: WANTED_ADD_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/wanted/goods/${id}`, user, config);
  
      dispatch({
        type: WANTED_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: WANTED_ADD_FAIL,
        payload: message,
      });
    }
  };

  export const deleteWantedAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: WANTED_REMOVE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/wanted/goods/${id}`, config);
  
      dispatch({
        type: WANTED_REMOVE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: WANTED_REMOVE_FAIL,
        payload: message,
      });
    }
  };

  export const listMyWanted= () => async (dispatch, getState) => {
    try {
      dispatch({ type: WANTED_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/wanted/myWANTED`, config)
  
      dispatch({ type: WANTED_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: WANTED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }