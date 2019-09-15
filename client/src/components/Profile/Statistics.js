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
import BarChart from "../BarChart";


const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        api: state.api.data,
        user: state.auth.user
      }
    : "";
};


class Statistics extends Component {
  state = {
    user:null,
    matches: null
  };

  componentDidMount() {
    const { api, dispatch, user } = this.props;
    if (user) {
      this.setState({
        ...this.state,
        user
      }, () => {
        MatchService.getMatches()
        .then(matches => this.setState({ ...this.state, matches }))
        .catch(e => "Matches api error");
      });
    } else {
      MatchService.getMatches()
        .then(matches => this.setState({ ...this.state, matches }))
        .catch(e => "Matches api error");
    }
  }



  render() {
    const { matches, user } = this.state;
    return (
      <ThemeProvider theme={this.props.theme}>
        <Typography
          component="div"
          style={{
            maxHeight: "80vh",
          overflowY: "scroll",
          backgroundColor: this.props.theme.palette.background.paper
          }}
        >
          <PageWrapper>
              {matches && user && <BarChart matches={matches} user={user} />}
          </PageWrapper>
        </Typography>
      </ThemeProvider>
    );
  }
}

export default withThemeConsumer(connect(mapStateToProps)(Statistics));
