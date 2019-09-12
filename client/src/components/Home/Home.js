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
import { getMatches } from "../../actions";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        api: state.api.data,
        user: state.auth.user
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
    if(user && user.id !== match._author.id){
      return <CardWrapper {...match}></CardWrapper>
    }
    
  });
};

function Home ({api, user, theme}) {
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
      </ThemeProvider>
    );
  
}

export default withThemeConsumer(connect(mapStateToProps)(Home));
