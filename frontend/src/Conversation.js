import React, { Component } from 'react';
import Message from './Message';

export default class Conversation extends Component {
    render() {
        let content;
        if (this.props.messages.length === 0) {
            content = <h3 className="text-center">No messages yet</h3>
        } else {
            content = this.props.messages.map(m =>
                <Message
                    key={m.id}
                    from={m.from.username}
                    avatar={m.from.avatar}
                    text={m.text}
                />
            );
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}
