import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { login } from './reducers';
import { tryLogin, logout } from './actions';
import App from './App';
import createLogger from 'redux-logger';

const logger = createLogger();
const store = createStore(combineReducers({login}), applyMiddleware(thunk, logger));
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => dispatch(tryLogin(username, password)),
        onLogout: () => dispatch(logout())
    }
};


const LiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <LiveApp/>
    </Provider>,
    document.getElementById('root')
);

