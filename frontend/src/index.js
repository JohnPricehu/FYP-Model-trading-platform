import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import './style.module.css'
import Home from './views/home'
import RegisterPage from './views/register-page'
import LoginPage from './views/login-page'
import GoodsDetailsPage from './views/goods-details-page'
import UserFilePage from './views/user-file-page'
import OrdersPage from './views/orders-page'
import OrderDetailsPage from './views/order-details-page'
import ShoppingCartPage from './views/shopping-cart-page'
import CreateGoods from './views/sell-goods-page'
import { Provider } from 'react-redux'
import store from "./store"
import './bootstrap.min.css'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'



const App = () => {
  return (
    <Provider store={store}>
      
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
        <React.Suspense fallback={<h1>...loading...</h1>}>
        <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={RegisterPage} path="/register" />
        <Route exact component={LoginPage} path="/login" />
        <Route  component={GoodsDetailsPage} path="/goods/:id" />
        <Route exact component={UserFilePage} path="/user-file" />
        <Route exact component={OrdersPage} path="/orders" />
        <Route exact component={OrderDetailsPage} path="/order-details" />
        <Route exact component={ShoppingCartPage} path="/cart" />
        <Route exact component={CreateGoods} path="/sell-goods" />
        </Switch>
        </React.Suspense>
        </Container>
      </main>
    </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
