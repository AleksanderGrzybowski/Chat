import React, { Component } from 'react';
import { ListGroupItem, FormGroup, FormControl } from 'react-bootstrap';

export default class NewChannelInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channelInput: ''
        }
    }

    inputChange = (e) => this.setState({channelInput: e.target.value});
    onKeypress = (e) => {
        if (e.key === 'Enter' && this.state.channelInput !== ''
            && this.props.isChannelNameValid(this.state.channelInput)
        ) {
            this.props.createChannel(this.state.channelInput);
            this.setState({channelInput: ''});
        }
    };

    render() {
        const validationMessage = this.props.isChannelNameValid(this.state.channelInput) ? null : (
            <span>Channel already exists</span>
        );

        return (
            <ListGroupItem>
                <FormGroup>
                    <FormControl
                        type="text"
                        value={this.state.channelInput}
                        placeholder="Add..."
                        onChange={this.inputChange}
                        onKeyPress={this.onKeypress}
                    />
                </FormGroup>
                {validationMessage}
            </ListGroupItem>
        )
    }
}
