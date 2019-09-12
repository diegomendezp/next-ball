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

class Home extends Component {
  state = {
    matches: null
  };

  componentDidMount() {
    const { api, dispatch, user } = this.props;

    if (api && api.data && api.data.matches) {
      this.setState({
        ...this.state,
        matches: api.data.matches
      });
    } else {
      MatchService.getMatches().then(matches =>
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
        <Typography component="div" style={{ minHeight: '100vh', backgroundColor: this.props.theme.palette.background.paper }}>
        <PageWrapper>
          <StyledContainer className="page-container">
          
 
            <div className="matches-container">
              {matches && this.displayMatches()}
            </div>
          </StyledContainer>
          <NewMatch />
        </PageWrapper>
        </Typography>
      </ThemeProvider>
    );
  }
}

export default connect(withThemeConsumer(Home));
