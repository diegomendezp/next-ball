import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Container, Typography } from "@material-ui/core";
import PageWrapper from "../../pageStyles/PageWrapper";
import UserCard from "../UserCard";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import ProfileTabs from "./ProfileTabs";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        api: state.api.data,
        user: state.auth.user
      }
    : "";
};

function Profile(props) {
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
              <UserCard {...props.user} />
              <ProfileTabs />
            </div>
          </Container>
        </PageWrapper>
      </Typography>
    </ThemeProvider>
  );
}

export default withThemeConsumer(connect(mapStateToProps)(Profile));
