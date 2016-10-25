import React from 'react';
import { Panel } from 'react-bootstrap';
import UserIcon from './UserIcon';

const Message = ({from, avatarColor, text}) => (
    <Panel>
        <UserIcon color={avatarColor}/>
        <span style={{marginLeft: 10, marginRight: 15, fontWeight: 'bold'}}>{from}</span>
        {text}
    </Panel>
);

export default Message;