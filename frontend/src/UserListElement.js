import React from 'react';

const UserList = ({selected, username, changeSelectedUser}) => {
    return (
        <li
            onClick={changeSelectedUser}
            style={selected ? {color: 'green'} : null}
        >
            {username}
        </li>
    )
};

export default UserList;
