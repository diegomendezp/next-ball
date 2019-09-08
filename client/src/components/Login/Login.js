import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions'
import AuthService from '../../services/AuthService';
import {Link} from 'react-router-dom'

class _LoginForm extends React.Component {

    constructor(){
        super();
        this.state = {
            username:"",
            password:""
        }
        this.service = new AuthService()
    }

    handleLogin(){
        const {username, password} = this.state;
        const {history, dispatch} = this.props;
        this.service.login({username, password})
        .then( user =>{
            dispatch(login(user))
            history.push('/');
        })
        .catch( e => {
            console.error(e)
        });
    }

    render() {
        const {username, password} = this.state;
        return (
            <div>
                <h2>Login</h2>
                <label>Username</label>
                <input value={username} onChange={e => this.setState({username:e.target.value})}/>
                <label>Password</label>
                <input value={password} type="password" onChange={e => this.setState({password:e.target.value})}/>
                <button onClick={() => this.handleLogin()}>Login</button>
                <Link to="/">Signup</Link>
            </div>
        );
    }
};

export const Login = connect()(withRouter(_LoginForm));