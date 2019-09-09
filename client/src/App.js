import React, { Component } from "react";

import "./App.css";
import { Signup } from "./components/Signup/Signup";
import { Switch, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { withThemeConsumer } from "./theme";
import { ThemeProvider } from '@material-ui/styles';
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </ThemeProvider>
    );
  }
}

export default withThemeConsumer(App);
