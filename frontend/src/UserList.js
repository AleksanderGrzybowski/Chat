import React, { Component } from 'react';
import UserListElement from './UserListElement';

export default class UserList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const users = this.props.usersList.users.map(user =>
            <UserListElement key={user.id} username={user.username} active={user.active}/>
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
