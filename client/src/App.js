import React, { Component } from "react";
import * as io from "socket.io-client";

import "./App.css";
import { Signup } from "./components/Signup/Signup";
import { Switch, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { withThemeConsumer } from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import Navbar from "./components/Navbar/Navbar";
import { PrivateRoute } from "./guards/PrivateRoute";
import Home from "./components/Home/Home";
import Users from "./components/Users/Users";
import Ranking from "./components/Ranking/Ranking";
import Profile from "./components/Profile/Profile";
import { SnackbarProvider } from 'notistack';

class App extends Component {
  componentDidMount() {
    this.socket = io(`${process.env.REACT_APP_API_URL}`);
    this.socket.on("connect", () => {
      console.log("Connected to WS");
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <SnackbarProvider>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/" component={Home}></PrivateRoute>
          <PrivateRoute exact path="/users" component={Users}></PrivateRoute>
          <PrivateRoute
            exact
            path="/ranking"
            component={Ranking}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
          ></PrivateRoute>
        </Switch>
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}

export default withThemeConsumer(App);
