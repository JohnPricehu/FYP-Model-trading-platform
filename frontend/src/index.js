import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.module.css'
import Home from './views/home'
import RegisterPage from './views/register-page'
import LoginPage from './views/login-page'
import GoodsDetailsPage from './views/goods-details-page'
import UserFilePage from './views/user-file-page'
import OrdersPage from './views/orders-page'
import OrderDetailsPage from './views/order-details-page'
import ShoppingCartPage from './views/shopping-cart-page'
import SellGoodsPage from './views/sell-goods-page'
import { Provider } from 'react-redux'
import store from "./store"



const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <Route exact component={Home} path="/" />
        <Route exact component={RegisterPage} path="/register-page" />
        <Route exact component={LoginPage} path="/login-page" />
        <Route exact component={GoodsDetailsPage} path="/goods-details-page" />
        <Route exact component={UserFilePage} path="/user-file-page" />
        <Route exact component={OrdersPage} path="/orders-page" />
        <Route exact component={OrderDetailsPage} path="/order-details-page" />
        <Route exact component={ShoppingCartPage} path="/shopping-cart-page" />
        <Route exact component={SellGoodsPage} path="/sell-goods-page" />
      </div>
    </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
