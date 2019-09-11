import React, { Component } from 'react'
import PageWrapper from '../../pageStyles/PageWrapper'
import RankingTable from './RankingTable'
import AuthService from '../../services/AuthService';
import { connect } from "react-redux"
import { Container } from '@material-ui/core';

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

    if(api && api.data && api.data.users){
      this.setState({
        ...this.state,
        users: api.data.users
      });
    } else {
      AuthService.getUsers()
      .then(users => this.setState({...this.state, users}))
      .catch(e => "Users api error")
    }
  }

  render() {
    const { users } = this.state;
    return (
      <PageWrapper>
        <Container className="page-container">
          { users && <RankingTable users={users}/>}
        </Container>
      </PageWrapper>
    )
  }
}

export default connect(mapStateToProps)(Ranking)