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
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        api: state.api.data,
        user: state.auth.user,
        notifications: state.notify.notifications
      }
    : "";
};

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "60%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));
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

const refreshState = dispatch => {
  setTimeout(() => {
    dispatch(getNotification(null));
  }, 3000);
};
const getNotification = (
  notifications,
  enqueueSnackbar,
  closeSnackbar,
  user,
  dispatch
) => {
  if (notifications) {
    const { notification } = notifications;
    if (notification) {
      const { otherPlayerId, matchId, type, name, league } = notification;
      if (notification.type === "challenge") {
        const action = key => (
          <React.Fragment>
            <Button
              onClick={() => {
                MatchService.addPlayer(otherPlayerId, matchId).then(() => {
                  wsConn.sendChallange(user, otherPlayerId, matchId, "success");
                  wsConn.sendMatch();
                  closeSnackbar(key);
                });
              }}
            >
              {"Accept"}
            </Button>
            <Button
              onClick={() => {
                wsConn.sendChallange(user, otherPlayerId, null, "error");
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
          variant: "success"
        });
      } else if (notification.type === "error") {
        //refreshState(dispatch)
        return enqueueSnackbar(`${name} dismiss your petition`, {
          variant: "error"
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

  

  const classes = useStyles();
  const { matches } = api ? api : null;
  const [username, setUsername] = React.useState("");
  const [matchesAux, setMatchesAux] = React.useState([...matches]);


  const handleInputChange = (value) => {
    const searchMatches = matches.filter((match) => match._author.username.toLowerCase().includes(value.toLowerCase()))

    setMatchesAux([...searchMatches])
  }

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
          <div className="bg-container">
            <Typography
              component="h2"
              style={{
                color: theme.palette.primary.contrastText
              }}
            >
              Challenge, play, win!
            </Typography>
            <div className="search-form">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={(e) => {
                    setUsername(e.target.value)
                    handleInputChange(e.target.value)
                  }}
                  placeholder="Username…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  value={username}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
          </div>
          <StyledContainer className="page-container">
            <div className="matches-container">
              {matchesAux && displayMatches(matchesAux, user)}
            </div>
          </StyledContainer>
          <NewMatch />
        </PageWrapper>
      </Typography>
      {notifications &&
        user &&
        getNotification(
          notifications,
          enqueueSnackbar,
          closeSnackbar,
          user,
          dispatch
        )}
    </ThemeProvider>
  );
}

export default withThemeConsumer(connect(mapStateToProps)(withSnackbar(Home)));
