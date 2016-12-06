import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { UserIcon } from './Icons';
import ellipsisStyle from './ellipsisStyle';

const extractTime = (date) => date.substr(11, 5);

const Message = ({from, avatarColor, text, dateSent}) => (
    <Panel>
        <Row>
            <Col xs={1}>
                <span style={{color: "#bbbbbb"}}>
                    ({extractTime(dateSent)})
                </span>
            </Col>
            <Col xs={2} style={ellipsisStyle}>
                <UserIcon style={{marginRight: 10}} color={avatarColor}/>
                <span style={{fontWeight: 'bold'}}>{from}</span>
            </Col>
            <Col xs={8}>
                <p>{text}</p>
            </Col>
        </Row>
    </Panel>
);

export default Message;