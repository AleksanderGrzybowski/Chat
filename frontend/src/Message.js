import React from 'react';
import { Panel } from 'react-bootstrap';

const Message = ({from, avatar, text}) => (
    <Panel>
        <img alt="avatar" src={avatar}/>
        <b>{from}</b>
        {text}
    </Panel>
);

export default Message;