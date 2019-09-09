import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
const ThemeContext = React.createContext();

class ThemeStore extends Component {
  state = {
    theme: createMuiTheme({
      palette: {
        type: "light"
      }
    })
  };

  changeTheme = () => {
    const { theme } = this.state;
    return theme.palette.type === "dark"
      ? this.setState({
        ...this.state,
        theme: createMuiTheme({
          palette: {
            type: "light"
          }
        })
      })
      : this.setState({
          ...this.state,
          theme: createMuiTheme({
            palette: {
              type: "dark"
            }
          })
        });
  };

  render() {
    const { theme } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme,
          changeTheme: this.changeTheme
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

const withThemeConsumer = WrappedComponent => {
  return () => (
    <ThemeContext.Consumer>
      {props => <WrappedComponent {...props} />}
    </ThemeContext.Consumer>
  );
};

export { ThemeStore, withThemeConsumer, ThemeContext };
