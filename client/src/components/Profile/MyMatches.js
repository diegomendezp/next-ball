import React, { Component } from "react";
import MatchService from "../../services/MatchService";
import PageWrapper from "../../pageStyles/PageWrapper";
import { Container, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import { connect } from "react-redux";
import ProfileMatchCard from "../ProfileMatchCard";
import { wsConn } from "../..";
import AuthService from "../../services/AuthService";
import { login } from "../../actions";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        user: state.auth.user,
        api: state.api.data
      }
    : "";
};

const displayMatches = (matches, user, dispatch) => {
  return matches.map((match, i) => {
    if (match.players.find(player => player.id === user.id) && !match.ended) {
      return <ProfileMatchCard {...match} endMatch handleDelete={handleDelete} handleFinish={handleFinish} dispatch={dispatch} user={user}></ProfileMatchCard>;
    }
  });
};

const handleDelete = (id) => {
  MatchService.deleteMatch(id).then(() => {   
    wsConn.eventMatch()
  })
} 
const handleFinish = (matchId, winner, loser, dispatch) => {
  Promise.all([MatchService.setWinner(winner.id), MatchService.setLoser(loser.id), MatchService.finishMatch(matchId, winner, loser)])
    .then((values) => {
      AuthService.currentUser().then(user => {
        if(user.error) {

        } else {
          wsConn.eventMatch()
          dispatch(login(user)); 
        }
      })
    })
}


function MyMatches({ api, theme, user , dispatch}) {
  const matches  = api  ? api.matches : null;
  
  return (
    <ThemeProvider theme={theme}>
      <Typography
        component="div"
        style={{
          maxHeight: "80vh",
          overflowY: "scroll",
          backgroundColor: theme.palette.background.paper
        }}
      >
        <PageWrapper>
          <div className="matches-container">
            {matches && displayMatches(matches, user, dispatch)}
            {!matches ||
              (matches.length === 0 && (
                <Typography variant="subtitle1" color="textSecondary">
                  No results found
                </Typography>
              ))}
          </div>
        </PageWrapper>
      </Typography>
    </ThemeProvider>
  );
}

export default withThemeConsumer(connect(mapStateToProps)(MyMatches));
