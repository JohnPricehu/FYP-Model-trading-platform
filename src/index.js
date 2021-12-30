import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.module.css'
import Home from './views/home'
import RegisterPage from './views/register-page'
import LoginPage from './views/login-page'

const App = () => {
  return (
    <Router>
      <div>
        <Route exact component={Home} path="/" />
        <Route exact component={RegisterPage} path="/register-page" />
        <Route exact component={LoginPage} path="/login-page" />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
