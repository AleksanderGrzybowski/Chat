import React from 'react';

const UserList = ({active, username}) => {
    return (
        <li style={active ? {fontWeight: 'bold'} : null}>{username}</li>
    )
};

export default UserList;
