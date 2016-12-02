import React, { Component } from 'react';
import ConversationListElement from './ConversationListElement';
import { ListGroup } from 'react-bootstrap';
import NewChannelInput from './NewChannelInput';
import { ReactInterval } from 'react-interval';

export default class ConversationsList extends Component {
    componentDidMount() {
        this.refreshList();
    }
    
    refreshList = () => {
        this.props.fetchUsers();
        this.props.fetchChannels();
    };
    
    isChannelNameValid = (name) => this.props.conversationsList.channels.every(channel => channel.name !== name);

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
                <ListGroup>
                    {users}
                </ListGroup>
                <ListGroup>
                    {channels}
                    <NewChannelInput
                        createChannel={this.props.createChannel}
                        isChannelNameValid={this.isChannelNameValid}
                    />
                </ListGroup>
                <ReactInterval callback={this.refreshList} enabled={true} timeout={5000}/>
            </div>
        )
    }
}
