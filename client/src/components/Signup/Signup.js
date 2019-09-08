import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import AuthService from '../../services/AuthService';
import { login } from '../../actions'

class _SignupForm extends React.Component {

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
        this.service.signup({username, password})
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
                <h2>Signup</h2>
                <label>Username</label>
                <input value={username} onChange={e => this.setState({username:e.target.value})}/>
                <label>Password</label>
                <input value={password} type="password" onChange={e => this.setState({password:e.target.value})}/>
                <button onClick={() => this.handleLogin()}>Signup</button>
                <Link to="/auth/login">Log in</Link>
            </div>
        );
    }
};

export const Signup = connect()(withRouter(_SignupForm));