import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { UserIcon, ChannelIcon } from './Icons';

const ConversationListElement = ({selected, type, conversationName, iconColor, changeSelectedConversation}) => {
    const iconProps = {
        style: {marginRight: 10},
        color: iconColor
    };

    const icon = (type === 'DIRECT') ? <UserIcon {...iconProps}/> : <ChannelIcon {...iconProps}/>;

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
