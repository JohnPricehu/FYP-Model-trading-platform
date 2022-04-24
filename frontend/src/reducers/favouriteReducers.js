import {
    FAVOURITE_ADD_REQUEST,
    FAVOURITE_ADD_SUCCESS,
    FAVOURITE_ADD_FAIL,
    FAVOURITE_REMOVE_REQUEST,
    FAVOURITE_REMOVE_SUCCESS,
    FAVOURITE_REMOVE_FAIL,
    FAVOURITE_REQUEST,
    FAVOURITE_SUCCESS,
    FAVOURITE_FAIL,
  } from "../constants/favouriteConstants";

  export const addFavouriteReducer = (state = {favourites: {}}, action) => {
    // eslint-disable-next-line default-case
  switch (action.type) {
    case FAVOURITE_ADD_REQUEST:
      return { loading: true };
    case FAVOURITE_ADD_SUCCESS:
      return { loading: false, success: true, favourites: action.payload };
    case FAVOURITE_ADD_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const deleteFavouriteReducer = (state = {}, action) => {
    // eslint-disable-next-line default-case
  switch (action.type) {
    case FAVOURITE_REMOVE_REQUEST:
      return { loading: true };
    case FAVOURITE_REMOVE_SUCCESS:
      return { loading: false, success: true };
    case FAVOURITE_REMOVE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const myFavouriteReducer = (state = { mfavourites: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case FAVOURITE_REQUEST:
      return { loading: true, mfavourites: [] }
    case FAVOURITE_SUCCESS:
      return { loading: false, mfavourites: action.payload }
    case FAVOURITE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}