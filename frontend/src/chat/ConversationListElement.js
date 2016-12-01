import React from 'react';
import {ListGroupItem} from 'react-bootstrap';
import UserIcon from './UserIcon';

const ConversationListElement = ({selected, type, conversationName, avatarColor, changeSelectedConversation}) => {
    const icon = (type === 'DIRECT') ? (
        <UserIcon color={avatarColor} style={{marginRight: 10}}/>
    ) : (
        <span>channel icon</span>
    );
    
    return (
        <ListGroupItem
            onClick={changeSelectedConversation}
            active={selected}
        >
            {icon}
            <span>{conversationName}</span>
        </ListGroupItem>
    )
};

export default ConversationListElement;
