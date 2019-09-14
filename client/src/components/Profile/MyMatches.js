import React, { Component } from "react";
import MatchService from "../../services/MatchService";
import PageWrapper from "../../pageStyles/PageWrapper";
import { Container, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import { connect } from 'react-redux'
import ProfileMatchCard from "../ProfileMatchCard";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        user: state.auth.user
      }
    : "";
};

class MyMatches extends Component {
  state = {
    matches: null
  };

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      MatchService.getMyMatches().then(matches =>
        this.setState({ ...this.state, matches })
      );
    }
  }

  displayMatches = () => {
    const { matches } = this.state;
    return matches.map((match, i) => {
      return <ProfileMatchCard {...match}></ProfileMatchCard>;
    });
  };

  render() {
    const { matches } = this.state;
    return (
      <ThemeProvider theme={this.props.theme}>
        <Typography
          component="div"
          style={{
            maxHeight: "80vh",
            overflowY:"scroll",
            backgroundColor: this.props.theme.palette.background.paper
          }}
        >
          <PageWrapper>
            <div className="matches-container">
              {matches && this.displayMatches()}
              {!matches || matches.length === 0 && <Typography variant="subtitle1" color="textSecondary">
                No results found
              </Typography>}
            </div>
          </PageWrapper>
        </Typography>
      </ThemeProvider>
    );
  }
}

export default withThemeConsumer(connect(mapStateToProps)(MyMatches));
