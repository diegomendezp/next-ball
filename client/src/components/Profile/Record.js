import React, { Component } from "react";
import MatchService from "../../services/MatchService";
import PageWrapper from "../../pageStyles/PageWrapper";
import { Container, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import { connect } from "react-redux";
import ProfileMatchCard from "../ProfileMatchCard";

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
    if (
      new Date(match.date).getTime() < new Date().getTime() &&
      match.players.find(player => player.id === user.id) &&
      match.ended
    ) {
      return (
        <ProfileMatchCard
          {...match}
          record
          dispatch={dispatch}
          user={user}
        ></ProfileMatchCard>
      );
    }
  });
};

function Record({ api, theme, user , dispatch}) {
  const { matches } = api ? api : null;
  return (
    <ThemeProvider theme={theme}>
      <Typography
        component="div"
        style={{
          minHeight: "100%",
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

export default withThemeConsumer(connect(mapStateToProps)(Record));
