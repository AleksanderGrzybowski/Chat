import React, { Component } from 'react';

export default class NewMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    handleTextChange = (e) => {
        this.setState({text: e.target.value});
    };

    sendMessage = () => {
        this.props.sendMessage(this.state.text);
        this.setState({text: ''});
    };

    render() {
        return (
            <div>
                New message: <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
}
