import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import PageWrapper from "../pageStyles/PageWrapper";
import UserCard from "./UserCard";


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
    <PageWrapper>
        <Container className="page-container">
         <UserCard {...props.user} />
          </Container>
    </PageWrapper>
  );
}

export default connect(mapStateToProps)(Profile);
