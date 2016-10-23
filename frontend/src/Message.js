import React from 'react';
import { Panel } from 'react-bootstrap';

const Message = ({from, text}) => (
    <Panel>
        <b>{from}</b>
        {text}
    </Panel>
);

export default Message;