import React, { Component } from 'react';
import ConversationListElement from './ConversationListElement';
import { ListGroupItem } from 'react-bootstrap';

export default class ConversationsList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchChannels();
    }

    render() {
        const isSelected = (id, type) => (
            id === this.props.conversationsList.currentId && this.props.conversationsList.currentType === type
        );

        const users = this.props.conversationsList.users.map(user =>
            <ConversationListElement
                key={user.id}
                conversationName={user.username}
                type="DIRECT"
                iconColor={user.avatarColor}
                selected={isSelected(user.id, 'DIRECT')}
                changeSelectedConversation={this.props.changeSelectedConversation.bind(this, 'DIRECT', user.id)}
            />
        );

        const channels = this.props.conversationsList.channels.map(channel =>
            <ConversationListElement
                key={channel.id}
                conversationName={channel.name}
                type="CHANNEL"
                iconColor="#fecdba"
                selected={isSelected(channel.id, 'CHANNEL')}
                changeSelectedConversation={this.props.changeSelectedConversation.bind(this, 'CHANNEL', channel.id)}
            />
        );

        return (
            <div>
                <ListGroupItem>
                    {users}
                </ListGroupItem>
                <ListGroupItem>
                    {channels}
                </ListGroupItem>
            </div>
        )
    }
}
