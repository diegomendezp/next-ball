import React, { Component } from "react";
import MatchService from "../../services/MatchService";
import CardWrapper from "../MatchCard";
import PageWrapper from "../../pageStyles/PageWrapper";
import NewMatch from "../NewMatch/NewMatch";
import { Container, Typography } from "@material-ui/core";
import { withStyles} from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles';
import { withThemeConsumer } from "../../theme";
import { connect } from "react-redux"
import { withSnackbar } from 'notistack';



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
    backgroundColor:  theme.palette.primary
  }
}))(Container);

const displayMatches = (matches, user) => {
  return matches.map((match, i) => {
    if(user && user.id !== match._author.id && !match.closed){
      return <CardWrapper key={i} {...match} user={user}></CardWrapper>
    }
    
  });
};

const getNotification = (notifications, enqueueSnackbar) => {
  const { notification } = notifications;
  const { otherPlayerId, matchId, type, name, league } = notification
  return enqueueSnackbar(`${name} has send a challenge to you`, {
    variant: "info"
  })
}

function Home ({api, user, theme, notifications, enqueueSnackbar}) {
    const { matches } = api ? api : null;
    return (
      <ThemeProvider theme={theme}>
        <Typography component="div" style={{ minHeight: '100vh', backgroundColor: theme.palette.background.paper }}>
        <PageWrapper>
          <StyledContainer className="page-container">
   
            <div className="matches-container">
              {matches && displayMatches(matches, user)}
            </div>
          </StyledContainer>
          <NewMatch />
        </PageWrapper>
        </Typography>
        {notifications &&
          getNotification(notifications, enqueueSnackbar)
        }
      </ThemeProvider>
    );
  
}

export default withThemeConsumer(connect(mapStateToProps)(withSnackbar(Home)));
