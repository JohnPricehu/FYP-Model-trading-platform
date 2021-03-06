import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './style.module.css'
import Home from './views/home'
import CreateGoods from './views/sell-goods-page'
import { Provider } from 'react-redux'
import store from "./store"
import './bootstrap.min.css'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
const CartScreen = React.lazy(() => import('./views/CartScreen'))
const ProductScreen = React.lazy(() => import('./views/ProductScreen'))
const UserListScreen = React.lazy(() => import('./views/UserListScreen'))
const UserEditScreen = React.lazy(() => import('./views/UserEditScreen'))
const ProductListScreen = React.lazy(() =>
  import('./views/ProductListScreen')
)
const ProductEditScreen = React.lazy(() =>
  import('./views/ProductEditScreen')
)
const ShippingScreen = React.lazy(() => import('./views/ShippingScreen'))
const PaymentScreen = React.lazy(() => import('./views/PaymentScreen'))
const PlaceOrderScreen = React.lazy(() => import('./views/PlaceOrderScreen'))
const OrderScreen = React.lazy(() => import('./views/orderScreen'))
const OrderListScreen = React.lazy(() => import('./views/OrderListScreen'))
const SpecialScreen = React.lazy(() => import('./views/specialScreen'))
const ProfileScreen = React.lazy(() => import('./views/ProfileScreen'))
const FavouriteScreen = React.lazy(() => import('./views/favourites'))
const WantedScreen = React.lazy(() => import('./views/wanted'))
const HistoryScreen = React.lazy(() => import('./views/history'))
const PaymemberScreen = React.lazy(() => import('./views/paymember'))
const LoginScreen = React.lazy(() => import('./views/LoginScreen'))
const RegisterScreen = React.lazy(() => import('./views/RegisterScreen'))





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
        <Route exact component={Home} path="/search/:keyword" />
        <Route exact component={Home} path="/page/:pageNumber" />
        <Route exact component={Home} path="/search/:keyword/page/:pageNumber" />
        <Route exact component={SpecialScreen} path="/special" />
        <Route exact component={SpecialScreen} path="/member/search/:keyword" />
        <Route exact component={SpecialScreen} path="/member/page/:pageNumber" />
        <Route exact component={SpecialScreen} path="/member/search/:keyword/page/:pageNumber" />
        <Route exact component={RegisterScreen} path="/register" />
        <Route exact component={LoginScreen} path="/login" />
        <Route path='/goods/:id' component={ProductScreen} />
        <Route exact component={ProfileScreen} path="/profile" />
        <Route exact component={CreateGoods} path="/sell-goods" />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route path='/favourite' component={FavouriteScreen} />
        <Route path='/wanted' component={WantedScreen} />
        <Route path='/history' component={HistoryScreen} />
        <Route path='/paymember' component={PaymemberScreen} />
        <Route
                path='/admin/productlist'
                component={ProductListScreen}
                exact
              />
        <Route
                path='/admin/productlist/:pageNumber'
                component={ProductListScreen}
                exact
              />
                      <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
              />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/admin/orderlist' component={OrderListScreen} />
        <Route path='/order/:id' component={OrderScreen} />      
        </Switch>
        </React.Suspense>
        </Container>
      </main>
      <Footer />
    </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
