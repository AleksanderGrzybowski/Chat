import React, { Component } from 'react';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: ''
        };
    }

    usernameChange = (e) => {
        this.setState({username: e.target.value})
    };
    
    passwordChange = (e) => {
        this.setState({password: e.target.value})
    };
    
    login = () => {
        this.props.onLogin(this.state.username, this.state.password)
    };
    
    render() {
        return (
            <div>
                Username <input type="text" value={this.state.username} onChange={this.usernameChange}/>
                Password <input type="text" value={this.state.password} onChange={this.passwordChange}/>
                <button onClick={this.login}>Login</button>
                {this.props.loginError ? <span>Login error, please check password</span> : null}
            </div>
        )
    }
}
