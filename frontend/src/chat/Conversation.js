import React, { Component } from 'react';
import Message from './Message';
import { ReactInterval } from 'react-interval';

export default class Conversation extends Component {
    render() {
        const content = (this.props.messages.length === 0) ? (
            <h3 className="text-center">No messages yet</h3>
        ) : (
            this.props.messages.map(message =>
                <Message
                    key={message.id}
                    from={message.from.username}
                    dateSent={message.dateSent}
                    avatarColor={message.from.avatarColor}
                    text={message.text}
                />
            )
        );

        return (
            <div>
                {content}
                <ReactInterval callback={this.props.refreshCurrentConversation} enabled={true} timeout={1000}/>
            </div>
        )
    }
}
