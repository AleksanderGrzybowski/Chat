import React, { Component } from 'react';
import Message from './Message';

export default class Conversation extends Component {
    render() {
        let content;
        if (this.props.messages.length === 0) {
            content = <div>No messages</div>
        } else {
            content = this.props.messages.map(m =>
                <Message
                    key={m.id}
                    from={m.from.username}
                    to={m.to.username}
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
