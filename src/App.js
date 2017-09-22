import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import Connect from './containers/Connect'
import RegisterScreen from './containers/RegisterScreen'
import LoginScreen from './containers/LoginScreen'
import TodoScreen from './containers/TodoScreen'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            localStorage.address ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/connect" />
            )
          )} />
          <Route path="/connect" component={Connect} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/todo" component={TodoScreen} />
        </div>
      </Router>
    )
  }
}

export default App
