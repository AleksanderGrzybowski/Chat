import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { login, conversationsList, conversation } from './reducers';
import {
    login as loginAction,
    logout,
    registerUser,
    fetchUsers,
    fetchChannels,
    createChannel,
    changeSelectedConversation,
    fetchConversation,
    sendMessage,
    refreshCurrentConversation
} from './actions';
import App from './App';
import createLogger from 'redux-logger';
import 'font-awesome-webpack';


const store = createStore(
    combineReducers({login, conversationsList, conversation}),
    applyMiddleware(thunk, createLogger())
);

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
    onLogin: (username, password) => dispatch(loginAction(username, password)),
    onLogout: () => dispatch(logout()),
    registerUser: (username, password) => dispatch(registerUser(username, password)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchChannels: () => dispatch(fetchChannels()),
    createChannel: (name) => dispatch(createChannel(name)),
    changeSelectedConversation: (type, conversationId) => {
        dispatch(fetchConversation(type, conversationId));
        dispatch(changeSelectedConversation(type, conversationId));
    },
    sendMessage: (text) => dispatch(sendMessage(text)),
    refreshCurrentConversation: () => dispatch(refreshCurrentConversation())
});


const LiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <LiveApp/>
    </Provider>,
    document.getElementById('root')
);

