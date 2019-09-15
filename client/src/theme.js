import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
const ThemeContext = React.createContext();

class ThemeStore extends Component {
  state = {
    theme: createMuiTheme({
      palette: {
        type: "light",
        common: {
          black: "#000",
          white: "#fff"
        },
        type: "light",
        primary: {
          main: "#1976d2",
          light: "rgb(71, 145, 219)",
          dark: "rgb(17, 82, 147)",
          contrastText: "#fff",
          link: "#000"
        },
        secondary: {
          main: "rgb(220, 0, 78)",
          light: "rgb(227, 51, 113)",
          darkt: "rgb(154, 0, 54)",
          contrastTex: "#fff"
        },
        error: {
          light: "#e57373",
          main: "#f44336",
          dark: "#d32f2f",
          contrastText: "#fff"
        },
        text: {
          primary: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.54)",
          disabled: "rgba(0, 0, 0, 0.38)",
          hint: "rgba(0, 0, 0, 0.38)"
        },
        background: {
          paper: "#fff",
          default: "#fff",
          level2: "#f5f5f5",
          level1: "#fff"
        },
        action: {
          active: "rgba(0, 0, 0, 0.54)",
          hover: "rgba(0, 0, 0, 0.08)",
          hoverOpacity: 0.08,
          selected: "rgba(0, 0, 0, 0.14)",
          disabled: "rgba(0, 0, 0, 0.26)",
          disabledBackground: "rgba(0, 0, 0, 0.12)"
        }
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
              type: "light",
              common: {
                black: "#000",
                white: "#fff"
              },
              type: "light",
              primary: {
                main: "#1976d2",
                light: "rgb(71, 145, 219)",
                dark: "rgb(17, 82, 147)",
                contrastText: "#fff",
                link: "#000"
              },
              secondary: {
                main: "rgb(220, 0, 78)",
                light: "rgb(227, 51, 113)",
                darkt: "rgb(154, 0, 54)",
                contrastTex: "#fff"
              },
              error: {
                light: "#e57373",
                main: "#f44336",
                dark: "#d32f2f",
                contrastText: "#fff"
              },
              text: {
                primary: "rgba(0, 0, 0, 0.87)",
                secondary: "rgba(0, 0, 0, 0.54)",
                disabled: "rgba(0, 0, 0, 0.38)",
                hint: "rgba(0, 0, 0, 0.38)"
              },
              background: {
                paper: "#fff",
                default: "#fff",
                level2: "#f5f5f5",
                level1: "#fff"
              },
              action: {
                active: "rgba(0, 0, 0, 0.54)",
                hover: "rgba(0, 0, 0, 0.08)",
                hoverOpacity: 0.08,
                selected: "rgba(0, 0, 0, 0.14)",
                disabled: "rgba(0, 0, 0, 0.26)",
                disabledBackground: "rgba(0, 0, 0, 0.12)"
              }
            }
          })
        })
      : this.setState({
          ...this.state,
          theme: createMuiTheme({
            palette: {
              type: "dark",
              common: {
                black: "#000",
                white: "#fff"
              },
              type: "dark",
              primary: {
                main: "#000",
                light: "rgb(166, 212, 250)",
                dark: "rgb(100, 141, 174)",
                contrastText: "#fff",
                link: "#fff"
              },
              secondary: {
                main: "#f48fb1",
                light: "rgb(246, 165, 192)",
                dark: "rgb(170, 100, 123)",
                contrastText: "rgba(0, 0, 0, 0.87)"
              },
              error: {
                light: "#e57373",
                main: "#f44336",
                dark: "#d32f2f",
                contrastText: "#fff"
              },
              contrastThreshold: 3,
              tonalOffset: 0.2,
              text: {
                primary: "#fff",
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "rgba(255, 255, 255, 0.5)",
                hint: "rgba(255, 255, 255, 0.5)",
                icon: "rgba(255, 255, 255, 0.5)"
              },
              background: {
                paper: "#424242",
                default: "#121212",
                level2: "#333",
                level1: "#212121"
              },
              action: {
                active: "#fff",
                hover: "rgba(255, 255, 255, 0.1)",
                hoverOpacity: 0.1,
                selected: "rgba(255, 255, 255, 0.2)",
                disabled: "rgba(255, 255, 255, 0.3)",
                disabledBackground: "rgba(255, 255, 255, 0.12)"
              }
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
