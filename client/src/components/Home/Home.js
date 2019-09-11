import React, { Component } from "react";
import MatchService from "../../services/MatchService";
import CardWrapper from "../MatchCard";
import PageWrapper from "../../pageStyles/PageWrapper";
import NewMatch from "../NewMatch/NewMatch";
import { Container } from "@material-ui/core";
import { withStyles} from "@material-ui/core/styles";

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
    MatchService.getMatches().then(matches =>
      this.setState({ ...this.state, matches })
    );
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
      <React.Fragment>
        <PageWrapper>
          <StyledContainer className="page-container">
            <div className="matches-container">
              {matches && this.displayMatches()}
            </div>
          </StyledContainer>
          <NewMatch />
        </PageWrapper>
      </React.Fragment>
    );
  }
}

export default Home;
