import React from 'react';
import { Panel } from 'react-bootstrap';
import UserIcon from './UserIcon';

const Message = ({from, avatarColor, text}) => (
    <Panel>
        <UserIcon color={avatarColor}/>
        <b>{from}</b>
        {text}
    </Panel>
);

export default Message;