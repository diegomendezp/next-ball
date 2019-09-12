import React, { Component } from "react";
import PageWrapper from "../../pageStyles/PageWrapper";
import { connect } from "react-redux";
import AuthService from "../../services/AuthService";
import UserCard from "../UserCard";
import { Container, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        api: state.api.data,
        user: state.auth.user
      }
    : "";
};

class Users extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    const { api, dispatch, user } = this.props;

    if (api && api.data && api.data.users) {
      this.setState({
        ...this.state,
        users: api.data.users
      });
    } else {
      AuthService.getUsers()
        .then(users => this.setState({ ...this.state, users }))
        .catch(e => "Users api error");
    }
  }

  displayUsers = () => {
    const { users } = this.state;
    const { user } = this.props;
    return users.map((u, i) => {
      if (user.id !== u.id) {
        return <UserCard key={i} {...u} />;
      }
    });
  };

  render() {
    const { users } = this.state;
    return (
      <ThemeProvider theme={this.props.theme}>
        <Typography
          component="div"
          style={{
            minHeight: "100vh",
            backgroundColor: this.props.theme.palette.background.paper
          }}
        >
          <PageWrapper>
            <Container className="page-container">
              <div className="matches-container">
                {users && this.displayUsers()}
              </div>
            </Container>
          </PageWrapper>
        </Typography>
      </ThemeProvider>
    );
  }
}

export default withThemeConsumer(connect(mapStateToProps)(Users));
