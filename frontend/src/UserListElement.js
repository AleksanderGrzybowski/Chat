import React from 'react';

const UserList = ({active, selected, username, changeSelectedUser}) => {
    let style = {};
    if (active) {
        style.fontWeight = 'bold';
    }
    if (selected) {
        style.color = 'green';
    }
    return (
    
        <li
            onClick={changeSelectedUser}
            style={style}
        >
            {username}
        </li>
    )
};

export default UserList;
