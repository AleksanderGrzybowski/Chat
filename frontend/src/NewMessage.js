import React, { Component } from 'react';
import {FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap';

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
    
    onKeypress = (event) => {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    };

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Your message..."
                        value={this.state.text}
                        onChange={this.handleTextChange}
                        onKeyPress={this.onKeypress}
                    />
                    <InputGroup.Button>
                        <Button
                            bsStyle="primary"
                            onClick={this.sendMessage}
                        >
                            Send <i className="fa fa-arrow-right"/>
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        )
    }
}
