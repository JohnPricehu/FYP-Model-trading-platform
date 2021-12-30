import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.module.css'
import Home from './views/home'
import RegisterPage from './views/register-page'
import LoginPage from './views/login-page'
import UserFilePage from './views/user-file-page'
import GoodsDetailsPage from './views/goods-details-page'
import OrdersPage from './views/orders-page'

const App = () => {
  return (
    <Router>
      <div>
        <Route exact component={Home} path="/" />
        <Route exact component={RegisterPage} path="/register-page" />
        <Route exact component={LoginPage} path="/login-page" />
        <Route exact component={UserFilePage} path="/user-file-page" />
        <Route exact component={GoodsDetailsPage} path="/goods-details-page" />
        <Route exact component={OrdersPage} path="/orders-page" />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
