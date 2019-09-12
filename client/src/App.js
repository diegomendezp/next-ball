import React, { Component } from "react";

import "./App.css";
import { Signup } from "./components/Signup/Signup";
import { Switch, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { withThemeConsumer } from "./theme";
import { ThemeProvider } from '@material-ui/styles';
import Navbar from "./components/Navbar/Navbar";
import { PrivateRoute } from "./guards/PrivateRoute";
import Home from "./components/Home/Home";
import Users from "./components/Users/Users";
import Ranking from "./components/Ranking/Ranking";
import Profile from "./components/Profile/Profile";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/" component={Home}></PrivateRoute>
          <PrivateRoute exact path="/users" component={Users}></PrivateRoute>
          <PrivateRoute exact path="/ranking" component={Ranking}></PrivateRoute>
          <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
        </Switch>
      </ThemeProvider>
    );
  }
}

export default withThemeConsumer(App);
