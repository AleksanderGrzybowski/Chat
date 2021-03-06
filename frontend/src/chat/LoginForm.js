import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import ErrorAlert from './ErrorAlert';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            registerMode: false
        };
    }

    usernameChange = (e) => this.setState({username: e.target.value});
    passwordChange = (e) => this.setState({password: e.target.value});
    repeatPasswordChange = (e) => this.setState({repeatPassword: e.target.value});

    isFormValid = () => {
        const allNotEmpty = (values) => values.every(e => e.length > 0); // FP rocks!

        if (this.state.registerMode) {
            return allNotEmpty([this.state.username, this.state.password, this.state.repeatPassword])
                && (this.state.password === this.state.repeatPassword);
        } else {
            return allNotEmpty([this.state.username, this.state.password]);
        }
    };

    login = () => this.props.onLogin(this.state.username, this.state.password);
    loginAsGuest = () => this.props.onLoginAsGuest();
    register = () => this.props.registerUser(this.state.username, this.state.password);

    submitForm = () => {
        if (!this.isFormValid()) return;

        if (this.state.registerMode) {
            this.register();
        } else {
            this.login();
        }
    };

    switchToRegisterMode = () => this.setState({registerMode: true, username: '', password: '', repeatPassword: ''});
    switchToLoginMode = () => this.setState({registerMode: false, username: '', password: '', repeatPassword: ''});

    onKeypress = (e) => {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    };

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.loginInput).focus();
    }

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
        
        const backButton =  (
          <FormGroup>
              <Button
                block bsSize="large"
                onClick={this.switchToLoginMode}
              >
                  Back
              </Button>
          </FormGroup>
        );

        const loginAsGuestButton = (
            <FormGroup>
                <Button
                    block bsSize="large" bsStyle="primary"
                    onClick={this.loginAsGuest}
                >
                    Login as guest
                </Button>
            </FormGroup>
        );

        const repeatPasswordInput = this.state.registerMode ? (
            <FormGroup>
                <FormControl
                    type="password"
                    value={this.state.repeatPassword}
                    placeholder="Repeat password"
                    onChange={this.repeatPasswordChange}
                />
            </FormGroup>
        ) : null;

        return (
            <Form horizontal onKeyPress={this.onKeypress}>
                <FormGroup>
                    <FormControl
                        type="text"
                        ref="loginInput"
                        value={this.state.username}
                        placeholder={this.state.registerMode ? 'New username' : 'Username'}
                        onChange={this.usernameChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        placeholder={this.state.registerMode ? 'New password' : 'Password'}
                        onChange={this.passwordChange}
                    />
                </FormGroup>
                {repeatPasswordInput}

                <FormGroup>
                    <Button
                        block bsSize="large" bsStyle="primary"
                        onClick={this.submitForm}
                        disabled={buttonDisabled}
                    >
                        {this.state.registerMode ? 'Register' : 'Login'}
                    </Button>
                </FormGroup>

                {!this.state.registerMode && loginAsGuestButton}
                {registerButton}
                {this.state.registerMode && backButton}
                {this.props.loginError ? loginErrorMessage : null}
                {this.props.registerError ? registerErrorMessage : null}
            </Form>
        )
    }
}
