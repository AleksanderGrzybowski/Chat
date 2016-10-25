import React from 'react';
import { Panel } from 'react-bootstrap';

const Message = ({from, avatarColor, text}) => (
    <Panel>
        <i style={{color: avatarColor}} className="fa fa-user"/>
        <b>{from}</b>
        {text}
    </Panel>
);

export default Message;