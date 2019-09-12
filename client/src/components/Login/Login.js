import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login, getMatches } from "../../actions";
import LoginWrapper from "./LoginStyles";
import AuthService from "../../services/AuthService";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import MatchService from "../../services/MatchService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Next ball
      </Link>{" "} */}
      Next ball {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class _LoginForm extends React.Component {
  classes = {};
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      touch: {
        email: false,
        password: false
      },
      error: false,
      errorMessage: ""
    };
  }
  handleLogin() {
    const { email, password } = this.state;
    const { history, dispatch } = this.props;
    AuthService
      .login({ email, password })
      .then(user => {
        dispatch(login(user));
        MatchService.getMatches().then(matches => {
          dispatch(getMatches(matches));
          history.push("/");
        });
        
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleError = () => {
    this.setState({...this.state, error:true, errorMessage:"Incorrect username or password"}, ()=> {
      setTimeout(()=> {
        this.setState({...this.state, error:false, errorMessage:""})
      }, 3000)
    })
  }

  handleChange = (name, value) => {
    this.setState({
      ...this.state,
        [name]: value
    });
  };

  render() {
    const { email, password, error, errorMessage } = this.state;

    return (
      <ThemeProvider theme={this.props.theme}>
      <Typography
        component="div"
        style={{
          minHeight: "100vh",
          backgroundColor: this.props.theme.palette.background.paper
        }}
      >
        <LoginWrapper>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className={this.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={this.classes.form} validate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => this.handleChange("email", e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              type="password"
              onChange={e => this.handleChange("password", e.target.value)}
            />
            {error && <p className="error-message">{errorMessage}</p> }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={() => this.handleLogin()}
            >
              Login
            </Button>
            <Grid container className="signup-link-container">
              {/* <Grid item xs>
                 <Link href="#" variant="body2">
                   Forgot password?
                 </Link>
              </Grid> */}
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      </LoginWrapper>
      </Typography>
      </ThemeProvider>
    );
  }
}

export const Login = withThemeConsumer(connect()(withRouter(_LoginForm)));
