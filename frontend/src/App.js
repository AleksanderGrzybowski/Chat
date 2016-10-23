import React, { Component } from 'react';
import LoginForm from './LoginForm';
import UserList from './UserList';
import Conversation from './Conversation';
import NewMessage from './NewMessage';
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
    render() {
        const navbar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">OiRPOS chat</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem onClick={this.logout}>Logout</NavItem>
                </Nav>
            </Navbar>
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
                        <Col md={9}>
                            <Row>
                                <Col md={12}>
                                    <Conversation messages={this.props.conversation.messages}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>

                                    <NewMessage sendMessage={this.props.sendMessage}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            )
        } else return (
            <Grid>
                <Row>
                    <Col md={6} mdOffset={3} xs={12}>
                        <h1 className="text-center">OiRPOS chat</h1>
                        <LoginForm onLogin={this.props.onLogin} loginError={this.props.login.loginError}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

