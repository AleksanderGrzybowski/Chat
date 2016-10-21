import React, { Component } from 'react';
import LoginForm from './LoginForm';
import UserList from './UserList';
import Conversation from './Conversation';

export default class App extends Component {
    render() {
        if (this.props.login.loggedIn) {
            return (
                <div>
                    You are logged in.
                    <button onClick={this.props.onLogout}>Log out</button>
                    <UserList
                        fetchUsers={this.props.fetchUsers}
                        usersList={this.props.usersList}
                        currentUserId={this.props.conversation.currentUserId}
                        changeSelectedUser={this.props.changeSelectedUser}
                    />
                    <Conversation messages={this.props.conversation.messages}/>
                </div>
            )
        } else return (
            <div>
                <LoginForm onLogin={this.props.onLogin} loginError={this.props.login.loginError}/>
            </div>
        );
    }
}

