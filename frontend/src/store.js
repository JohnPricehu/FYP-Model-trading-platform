import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { cartReducer } from './reducers/cartReducer';
import {
  goodsCreateReducer,
  goodsDeleteReducer,
  goodsListReducer,
  goodsAllListReducer,
  goodsUpdateReducer,
  goodsDetailReducer,
  goodsTopRatedReducer,
  goodsBestSalesReducer,
  goodsSpecialReducer,
  goodsReviewCreateReducer
} from "./reducers/goodsReducers";
import {
  orderCreatedReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
  orderDeleteReducer,
} from './reducers/orderReducers'


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  cart: cartReducer,
  goodsCreate: goodsCreateReducer,
  goodsDelete: goodsDeleteReducer,
  goodsUpdate: goodsUpdateReducer,
  goodsList: goodsListReducer,
  goodsListAll: goodsAllListReducer,
  goodsDetails: goodsDetailReducer,
  goodsTopRated:goodsTopRatedReducer,
  goodsSpecial:goodsSpecialReducer,
  goodsBestSales:goodsBestSalesReducer,
  goodsReviewCreate: goodsReviewCreateReducer,
  orderCreate: orderCreatedReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  delettOrder: orderDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorge = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorge = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}


const initialState = {
  cart: {
    cartItems: cartItemsFromStorge,
    shippingAddress: shippingAddressFromStorge,
  },
  userLogin: { userInfo: userInfoFromStorage },
};


const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;