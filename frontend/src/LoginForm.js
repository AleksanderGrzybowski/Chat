import React, { Component } from 'react';
import { FormGroup, FormControl, Form, Button, Alert } from 'react-bootstrap';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'u1',
            password: 'u1'
        };
    }

    usernameChange = (e) => {
        this.setState({username: e.target.value})
    };

    passwordChange = (e) => {
        this.setState({password: e.target.value})
    };

    isFormValid = () => this.state.username.length !== 0 && this.state.password.length !== 0;

    login = () => {
        this.props.onLogin(this.state.username, this.state.password)
    };

    render() {
        const buttonDisabled = !this.isFormValid();

        const errorMessage = (
            <Alert bsStyle="warning">
                Invalid username or password, please try again.
            </Alert>
        );

        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <FormControl
                        type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.usernameChange}
                    />
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                    <FormControl
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.passwordChange}
                    />
                </FormGroup>


                <FormGroup>
                    <Button
                        block bsSize="large" bsStyle="primary"
                        onClick={this.login}
                        disabled={buttonDisabled}
                    >
                        Login
                    </Button>
                </FormGroup>
                {this.props.loginError ? errorMessage : null}
            </Form>
        )
    }
}
