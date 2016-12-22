import React, { Component } from 'react';
import LoginForm from './chat/LoginForm';
import ConversationsList from './chat/ConversationsList';
import Conversation from './chat/Conversation';
import NewMessage from './chat/NewMessage';
import { Grid, Row, Col} from 'react-bootstrap';
import ChatNavbar from './ChatNavbar';
import ErrorPage from './chat/ErrorPage';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
    render() {
        if (!this.props.health.healthy) {
            return <ErrorPage/>
        }
        
        const mainPanel = (this.props.conversationsList.currentId !== null) ? (
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
                    <Col md={12} style={{marginTop: 20}}>
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

        return this.props.login.loggedIn ? (
            <Grid>
                <ChatNavbar
                    username={this.props.login.username}
                    logout={this.props.onLogout}
                />
                <Row>
                    <Col md={3}>
                        <ConversationsList
                            fetchUsers={this.props.fetchUsers}
                            fetchChannels={this.props.fetchChannels}
                            createChannel={this.props.createChannel}
                            conversationsList={this.props.conversationsList}
                            changeSelectedConversation={this.props.changeSelectedConversation}
                        />
                    </Col>
                    {mainPanel}
                </Row>
            </Grid>
        ) : (
            <Grid>
                <Row>
                    <Col md={6} mdOffset={3} xs={12}>
                        <h1 className="text-center">
                            <i className="fa fa-comments"/> OiRPOS chat
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

