import React, { Component } from 'react';
import { FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import ErrorAlert from './ErrorAlert';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            registerMode: false
        };
    }

    usernameChange = (e) => this.setState({username: e.target.value});
    passwordChange = (e) => this.setState({password: e.target.value});
    isFormValid = () => this.state.username.length !== 0 && this.state.password.length !== 0;

    login = () => this.props.onLogin(this.state.username, this.state.password);
    register = () => this.props.registerUser(this.state.username, this.state.password);
    submitForm = () => {
        if (!this.isFormValid()) return;
        
        if (this.state.registerMode) {
            this.register();
        } else {
            this.login();
        }
    };

    switchToRegisterMode = () => this.setState({registerMode: true, username: '', password: ''});

    onKeypress = (e) => {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    };

    render() {
        const buttonDisabled = !this.isFormValid();

        const loginErrorMessage = (
            <ErrorAlert>
                Invalid username or password, please try again.
            </ErrorAlert>
        );
        const registerErrorMessage = (
            <ErrorAlert>
                Registration error, please pick different username.
            </ErrorAlert>
        );

        const registerButton = this.state.registerMode ? null : (
            <FormGroup>
                <Button
                    block bsSize="large"
                    onClick={this.switchToRegisterMode}
                >
                    Or register...
                </Button>
            </FormGroup>
        );

        return (
            <Form horizontal onKeyPress={this.onKeypress}>
                <FormGroup controlId="formHorizontalEmail">
                    <FormControl
                        type="text"
                        value={this.state.username}
                        placeholder={this.state.registerMode ? 'New username' : 'Username'}
                        onChange={this.usernameChange}
                    />
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                    <FormControl
                        type="password"
                        value={this.state.password}
                        placeholder={this.state.registerMode ? 'New password' : 'Password'}
                        onChange={this.passwordChange}
                    />
                </FormGroup>


                <FormGroup>
                    <Button
                        block bsSize="large" bsStyle="primary"
                        onClick={this.submitForm}
                        disabled={buttonDisabled}
                    >
                        {this.state.registerMode ? 'Register' : 'Login'}
                    </Button>
                </FormGroup>
                {registerButton}
                {this.props.loginError ? loginErrorMessage : null}
                {this.props.registerError ? registerErrorMessage : null}
            </Form>
        )
    }
}
