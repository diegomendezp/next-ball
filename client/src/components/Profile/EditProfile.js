import React, { Component } from "react";
import PageWrapper from "../../pageStyles/PageWrapper";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import { connect } from "react-redux";
import AuthService from "../../services/AuthService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { login } from "../../actions";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        user: state.auth.user
      }
    : "";
};

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  avatar: {
    width: 150,
    height: 150,
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
      margin: "5% 0",
    },
    [theme.breakpoints.up("sm")]: {
      width: 100,
      height: 90,
      margin: "5% 0",
    },
    [theme.breakpoints.up("md")]: {
      width: 120,
      height: 120,
      margin: "5% 0 2% 0",
    },
    margin: "5% auto",
  },
  form: {
    display:"flex",
    flexDirection: "column"
  },
  button: {
    width: "15%",
    marginTop: "5%",
    [theme.breakpoints.down("sm")]: {
      width: "25%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "15%"
    },
    [theme.breakpoints.up("md")]: {
      width: "15%"
    },
  },
  textarea: {
    outline: "none",
    marginTop: "100%"
  }
}));

const handleImageChange = event => {
  const { name, value, files } = event.target;
  return files && files[0] ? files[0] : "";
};

const editProfile = (e, image, dispatch, history) => {
  e.preventDefault();
  AuthService.updateProfile({ image })
    .then(user => {
      if (!user.error) {
        dispatch(login(user))
        history.push("/profile")
      }
    })
    .catch(error => console.log(error));
};

function EditProfile({ api, user, theme, dispatch, history }) {
  const classes = useStyles();
  const [image, setImage] = React.useState("");

  return (
    <ThemeProvider theme={theme}>
      
      <Typography
        component="div"
        style={{
          maxHeight: "100vh",
          height: "100vh",
          overflowY: "scroll",
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Container>
        <PageWrapper>
          <div className="page-container">
          <Typography component="h5" variant="h5">
                Edit your profile image
              </Typography>
          <Avatar alt="username-icon" src={user.image} className={classes.avatar} />
            <form className={classes.form}>
            <InputLabel htmlFor="Image">Profile Image: </InputLabel>
              <TextField
                label="Profile image:"
                className={classes.textField}
                required
                autoFocus
                onChange={e => {
                  const file = handleImageChange(e)
                  setImage(file)
                }}
                margin="normal"
                type="file"
                id="file"
              />
             
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={e => editProfile(e, image, dispatch, history)}
              >
                Accept
              </Button>
            </form>
          </div>
        </PageWrapper>
        </Container>
      </Typography>
     
    </ThemeProvider>
  );
}

export default withThemeConsumer(connect(mapStateToProps)(EditProfile));
