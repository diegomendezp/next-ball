import React, { Component } from "react";
import MatchService from "../../services/MatchService";
import CardWrapper from "../MatchCard";
import PageWrapper from "../../pageStyles/PageWrapper";
import NewMatch from "../NewMatch/NewMatch";
import { Container, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withThemeConsumer } from "../../theme";
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        user: state.auth.user
      }
    : "";
};

class Record extends Component {
  state = {
    matches: null
  };

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      MatchService.getRecord(user.id).then(matches =>
        this.setState({ ...this.state, matches })
      );
    }
  }

  displayMatches = () => {
    const { matches } = this.state;
    return matches.map((match, i) => {
      return <CardWrapper {...match}></CardWrapper>;
    });
  };

  render() {
    const { matches } = this.state;
    return (
      <ThemeProvider theme={this.props.theme}>
        <Typography
          component="div"
          style={{
            minHeight: "100%",
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
            <NewMatch />
          </PageWrapper>
        </Typography>
      </ThemeProvider>
    );
  }
}

export default withThemeConsumer(connect(mapStateToProps)(Record));
