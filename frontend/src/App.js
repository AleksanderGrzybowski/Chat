import React, { Component } from 'react';
import LoginForm from './chat/LoginForm';
import UserList from './chat/UserList';
import Conversation from './chat/Conversation';
import NewMessage from './chat/NewMessage';
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
    render() {
        const navbar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        {this.props.login.username}
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem onClick={this.props.onLogout}>
                        Logout <i className="fa fa-sign-out"/>
                    </NavItem>
                </Nav>
            </Navbar>
        );

        const rightPanel = (this.props.conversation.currentUserId !== null) ? (
            <Col md={9}>
                <Row>
                    <Col md={12}>
                        <Conversation 
                            messages={this.props.conversation.messages}
                            refreshCurrentConversation={this.props.refreshCurrentConversation}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <NewMessage sendMessage={this.props.sendMessage}/>
                    </Col>
                </Row>
            </Col>
        ) : (
            <Col md={9}>
                <Row>
                    <h3 className="text-center">Pick user from the left</h3>
                </Row>
            </Col>
        );

        if (this.props.login.loggedIn) {
            return (
                <Grid>
                    {navbar}
                    <Row>
                        <Col md={3}>
                            <UserList
                                fetchUsers={this.props.fetchUsers}
                                usersList={this.props.usersList}
                                currentUserId={this.props.conversation.currentUserId}
                                changeSelectedUser={this.props.changeSelectedUser}
                            />
                        </Col>
                        {rightPanel}
                    </Row>
                </Grid>
            )
        } else return (
            <Grid>
                <Row>
                    <Col md={6} mdOffset={3} xs={12}>
                        <h1 className="text-center">
                            <i className="fa fa-comments"/>  OiRPOS chat
                        </h1>
                        <LoginForm
                            onLogin={this.props.onLogin}
                            registerUser={this.props.registerUser}
                            loginError={this.props.login.loginError}
                            registerError={this.props.login.registerError}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

