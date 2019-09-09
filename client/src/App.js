import React, { Component } from 'react';

import './App.css';
import { Signup } from './components/Signup/Signup';
import { Switch, Route } from "react-router-dom";
import { Login } from './components/Login/Login';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    );
  }
}

export default App;
