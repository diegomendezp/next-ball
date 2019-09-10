import React, { Component } from 'react'
import PageWrapper from '../../pageStyles/PageWrapper';
import { connect } from "react-redux";
import AuthService from '../../services/AuthService';
import UserCard from '../UserCard';


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

  displayUsers = () => {
    const { users }  = this.state;
    return users.map((user, i) => {
      return (
        <UserCard key={i} {...user} />
      )
    })
  }
  

  render() {
    const { users } = this.state;
    return (
      <PageWrapper>
        <div className="page-container">
        <div className="matches-container">
        {users && this.displayUsers()}
        </div>
        </div>
      </PageWrapper>
    )
  }
}

export default connect(mapStateToProps)(Users)