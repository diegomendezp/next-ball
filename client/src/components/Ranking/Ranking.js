import React, { Component } from 'react'
import PageWrapper from '../../pageStyles/PageWrapper'
import RankingTable from './RankingTable'
import AuthService from '../../services/AuthService';
import { connect } from "react-redux"
import { Container, Typography } from '@material-ui/core';
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

class Ranking extends Component {
  state = {
    users:null
  }

  componentDidMount() {
    const { api, dispatch, user } = this.props;

    // if(api && api.data && api.data.users){
    //   this.setState({
    //     ...this.state,
    //     users: api.data.users
    //   });
    // } else {
      AuthService.getUsers()
      .then(users => {
        if(users.error) {

        } else {
          this.setState({...this.state, users})
        } 
      })
      .catch(e => "Users api error")
    // }
  }

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
          { users && <RankingTable users={users}/>}
        </Container>
      </PageWrapper>
      </Typography>
      </ThemeProvider>
    )
  }
}

export default withThemeConsumer(connect(mapStateToProps)(Ranking))