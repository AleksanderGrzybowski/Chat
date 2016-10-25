import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

const UserList = ({selected, username, avatarColor, changeSelectedUser}) => {
    return (
        <ListGroupItem
            onClick={changeSelectedUser}
            active={selected}
        >
            <i className="fa fa-user" style={{color: avatarColor}}/>
            {username}
        </ListGroupItem>
    )
};

export default UserList;
