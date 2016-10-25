import React from 'react';
import {ListGroupItem} from 'react-bootstrap';
import UserIcon from './UserIcon';

const UserList = ({selected, username, avatarColor, changeSelectedUser}) => {
    return (
        <ListGroupItem
            onClick={changeSelectedUser}
            active={selected}
        >
            <UserIcon color={avatarColor} style={{marginRight: 10}}/>
            {username}
        </ListGroupItem>
    )
};

export default UserList;
