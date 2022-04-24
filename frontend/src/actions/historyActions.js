import {
    HISTORY_ADD_REQUEST,
    HISTORY_ADD_SUCCESS,
    HISTORY_ADD_FAIL,
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    HISTORY_FAIL,
  } from "../constants/historyConstants";
import axios from "axios";

export const addToHistoryAction = (id ,user ) => async (dispatch,getState) => {
    try {
      dispatch({
        type: HISTORY_ADD_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/history/goods/${id}`, user, config);
  
      dispatch({
        type: HISTORY_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: HISTORY_ADD_FAIL,
        payload: message,
      });
    }
  };

  export const listMyHistory= () => async (dispatch, getState) => {
    try {
      dispatch({ type: HISTORY_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/history/myHISTORY`, config)
  
      dispatch({ type: HISTORY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: HISTORY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }