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
  }
}));

const handleImageChange = event => {
  const { name, value, files } = event.target;
  return files && files[0] ? files[0] : "";
};

const editProfile = (e, image, dispatch) => {
  e.preventDefault();
  AuthService.updateProfile({ image })
    .then(user => {
      if (!user.error) {
        dispatch(login(user));
      }
    })
    .catch(error => console.log(error));
};

function EditProfile({ api, user, theme, dispatch }) {
  const classes = useStyles();
  const [image, setImage] = React.useState("");

  return (
    <ThemeProvider theme={theme}>
      <Container>
      <Typography
        component="div"
        style={{
          maxHeight: "80vh",
          overflowY: "scroll",
          backgroundColor: theme.palette.background.paper
        }}
      >
        <PageWrapper>
          <div className="page-container">
            <form>
              <TextField
                label="Profile image:"
                className={classes.textField}
                required
                autoFocus
                onChange={e => {
                  const file = handleImageChange(e)
                  console.log(file)
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
                onClick={e => editProfile(e, image, dispatch)}
              >
                Accept
              </Button>
            </form>
          </div>
        </PageWrapper>
      </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default withThemeConsumer(connect(mapStateToProps)(EditProfile));
