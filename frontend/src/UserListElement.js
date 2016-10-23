import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

const UserList = ({selected, username, changeSelectedUser}) => {
    return (
        <ListGroupItem
            onClick={changeSelectedUser}
            active={selected}
        >
            {username}
        </ListGroupItem>
    )
};

export default UserList;
