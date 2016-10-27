import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { login, usersList, conversation } from './reducers';
import {
    login as loginAction,
    logout,
    registerUser,
    fetchUsers,
    changeSelectedUser,
    fetchConversationFor,
    sendMessage,
    refreshCurrentConversation
} from './actions';
import App from './App';
import createLogger from 'redux-logger';
import 'font-awesome-webpack';


const store = createStore(
    combineReducers({login, usersList, conversation}),
    applyMiddleware(thunk, createLogger())
);

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
    onLogin: (username, password) => dispatch(loginAction(username, password)),
    onLogout: () => dispatch(logout()),
    registerUser: (username, password) => dispatch(registerUser(username, password)),
    fetchUsers: () => dispatch(fetchUsers()),
    changeSelectedUser: (userId) => {
        dispatch(fetchConversationFor(userId));
        dispatch(changeSelectedUser(userId));
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

