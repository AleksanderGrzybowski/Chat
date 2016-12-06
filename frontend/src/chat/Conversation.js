import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import { ReactInterval } from 'react-interval';

export default class Conversation extends Component {
    // http://blog.vjeux.com/2013/javascript/scroll-position-with-react.html
    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this.refs.scrollable);
        this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this.refs.scrollable);
            node.scrollTop = node.scrollHeight
        }
    }

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
            <div style={{height: '70vh', overflowY: 'scroll'}} ref="scrollable">
                {content}
                <ReactInterval callback={this.props.refreshCurrentConversation} enabled={true} timeout={1000}/>
            </div>
        )
    }
}
