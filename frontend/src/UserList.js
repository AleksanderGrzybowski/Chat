import React, { Component } from 'react';
import UserListElement from './UserListElement';

export default class UserList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const users = this.props.usersList.users.map(user =>
            <UserListElement
                key={user.id}
                username={user.username}
                active={user.active}
                selected={user.id === this.props.usersList.currentUserId}
                changeSelectedUser={this.props.changeSelectedUser.bind(this, user.id)}
            />
        );
        return (
            <div>
                <ul>
                    {users}
                </ul>
            </div>
        )
    }
}
