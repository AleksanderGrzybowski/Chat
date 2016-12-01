import React, { Component } from 'react';
import Message from './Message';
import { ReactInterval } from 'react-interval';

export default class Conversation extends Component {
    render() {
        const content = (this.props.messages.length === 0) ? (
            <h3 className="text-center">No messages yet</h3>
        ) : (
            this.props.messages.map(m =>
                <Message
                    key={m.id}
                    from={m.from.username}
                    avatarColor={m.from.avatarColor}
                    text={m.text}
                />
            )
        );

        return (
            <div>
                {content}
                <ReactInterval callback={this.props.refreshCurrentConversation} enabled={true} timeout={10000}/>
            </div>
        )
    }
}
