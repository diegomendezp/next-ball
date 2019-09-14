import React, { Component } from "react";
import MatchService from "../../services/MatchService";
import CardWrapper from "../MatchCard";
import PageWrapper from "../../pageStyles/PageWrapper";
import NewMatch from "../NewMatch/NewMatch";
import { Container, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { wsConn } from "../..";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        api: state.api.data,
        user: state.auth.user,
        notifications: state.notify.notifications
      }
    : "";
};

const StyledContainer = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary
  }
}))(Container);

const displayMatches = (matches, user) => {
  return matches.map((match, i) => {
    if (user && user.id !== match._author.id && !match.closed) {
      return <CardWrapper key={i} {...match} user={user}></CardWrapper>;
    }
  });
};

const refreshState = (dispatch) => {
  setTimeout(() => {
    dispatch(getNotification(null))
  }, 3000)
}
const getNotification = (notifications, enqueueSnackbar, closeSnackbar, user, dispatch) => {
  if(notifications) {
  const { notification } = notifications;
  if (notification) {
    const { otherPlayerId, matchId, type, name, league } = notification;
    if (notification.type === "challenge") {
      const action = key => (
        <React.Fragment>
          <Button
            onClick={() => {
              wsConn.sendChallange(user, otherPlayerId, matchId, "success")
              closeSnackbar(key);
            }}
          >
            {"Accept"}
          </Button>
          <Button
            onClick={() => {
              wsConn.sendChallange(user, otherPlayerId, null, "error")
              closeSnackbar(key);
            }}
          >
            {"Dismiss"}
          </Button>
        </React.Fragment>
      );
      //refreshState(dispatch)
      return enqueueSnackbar(`${name} has send a challenge to you`, {
        variant: "info",
        action,
        persist: true
      });

    } else if (notification.type === "success") {
      //refreshState(dispatch)
      return enqueueSnackbar(`${name} accepts your petition`, {
        variant: "success",
      });
    
    } else if (notification.type === "error") {
      //refreshState(dispatch)
      return enqueueSnackbar(`${name} dismiss your petition`, {
        variant: "error",
      });
    } else {
    }
  }
}
};

function Home({
  api,
  user,
  theme,
  notifications,
  enqueueSnackbar,
  closeSnackbar,
  dispatch
}) {
  const { matches } = api ? api : null;
  return (
    <ThemeProvider theme={theme}>
      <Typography
        component="div"
        style={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.paper
        }}
      >
        <PageWrapper>
          <StyledContainer className="page-container">
            <div className="matches-container">
              {matches && displayMatches(matches, user)}
            </div>
          </StyledContainer>
          <NewMatch />
        </PageWrapper>
      </Typography>
      {notifications && user &&
        getNotification(notifications, enqueueSnackbar, closeSnackbar, user, dispatch)}
    </ThemeProvider>
  );
}

export default withThemeConsumer(connect(mapStateToProps)(withSnackbar(Home)));
