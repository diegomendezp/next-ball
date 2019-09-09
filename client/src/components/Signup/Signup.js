import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions";
import AuthService from "../../services/AuthService";
import SignupWrapper from "./SignupStyles";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        {/* <Link color="inherit" href="https://material-ui.com/">
          Next ball
        </Link>{" "} */}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

class _SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      error: false,
      errorMessage: ""
    };
  }

  handleSignup() {
    const { username, email, password } = this.state;
    const { history, dispatch } = this.props;
    AuthService.signup({ username, password, email })
      .then(user => {
        dispatch(login(user));
        history.push("/");
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleChange = (name, value) => {
    this.setState({
      ...this.state,
        [name]: value
    });
  };

  classes = {}

  render() {
    const { username, email, password, error, errorMessage } = this.state;
    return (
    <SignupWrapper>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className={this.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={this.classes.form} validate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={e => this.handleChange("username", e.target.value)}
            />
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
            {error && <p className="error-message">{errorMessage}</p>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={() => this.handleSignup()}
            >
              Register
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
      </SignupWrapper>
    );
  }
}

export const Signup = connect()(withRouter(_SignupForm));
