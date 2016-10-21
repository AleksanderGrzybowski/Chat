import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default class App extends Component {
    render() {
        if (this.props.login.loggedIn) {
            return (
                <div>
                    You are logged in.
                    <button onClick={this.props.onLogout}>Log out</button>
                </div>
            )
        } else return (
            <div>
                <LoginForm onLogin={this.props.onLogin} loginError={this.props.login.loginError}/>
            </div>
        );
    }
}

