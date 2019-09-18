import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Container, Typography } from "@material-ui/core";
import PageWrapper from "../../pageStyles/PageWrapper";

import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import ProfileTabs from "./ProfileTabs";
import ProfileCard from "../ProfileCard";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        api: state.api.data,
        user: state.auth.user
      }
    : "";
};

function Profile(props) {
  const { matches } = props.api ? props.api : null;
  return (
    <ThemeProvider theme={props.theme}>
      <Typography
        component="div"
        style={{
          minHeight: "100vh",
          backgroundColor: props.theme.palette.background.paper
        }}
      >
        <PageWrapper>
          <Container className="page-container">
            <div className="profile-container">
              <ProfileCard  {...props.user} className="user-card"/>
              <ProfileTabs className="user-tabs" matches={matches}/>
            </div>
          </Container>
          {matches && <div></div> }
        </PageWrapper>
      </Typography>
    </ThemeProvider>
  );
}

export default withThemeConsumer(connect(mapStateToProps)(Profile));
