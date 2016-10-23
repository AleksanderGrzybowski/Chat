import React, { Component } from 'react';
import LoginForm from './LoginForm';
import UserList from './UserList';
import Conversation from './Conversation';
import NewMessage from './NewMessage';
import { Grid, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
    render() {
        if (this.props.login.loggedIn) {
            return (
                <div>
                    You are logged in.
                    <button onClick={this.props.onLogout}>Log out</button>
                    <UserList
                        fetchUsers={this.props.fetchUsers}
                        usersList={this.props.usersList}
                        currentUserId={this.props.conversation.currentUserId}
                        changeSelectedUser={this.props.changeSelectedUser}
                    />
                    <Conversation messages={this.props.conversation.messages}/>
                    <NewMessage sendMessage={this.props.sendMessage}/>
                </div>
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

