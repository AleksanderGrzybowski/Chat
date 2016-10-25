import axios from 'axios';
import backendUrl from './backendUrl';
const loginSuccessful = (username, password) => ({type: 'LOGIN_SUCCESSFULL', username, password});
const loginError = () => ({type: 'LOGIN_ERROR'});
const registerError = () => ({type: 'REGISTER_ERROR'});

export const tryLogin = (username, password) => (dispatch) => {
    axios.get(`${backendUrl}/api/auth`, {
        auth: {username, password}
    })
        .then(() => dispatch(loginSuccessful(username, password)))
        .catch(() => dispatch(loginError()));
};


export const registerUser = (username, password) => (dispatch) => {
    axios.post(`${backendUrl}/api/user/register`, {
        username, password
    })
        .then(() => dispatch(tryLogin(username, password)))
        .catch(() => dispatch(registerError()));
};

const loadUsers = (users) => ({type: 'LOAD_USERS', users});

export const fetchUsers = () => (dispatch, getState) => {
    const {username, password} = getState().login;
    
    axios.get(`${backendUrl}/api/user/chatUsers`, {
        auth: {username, password}
    })
        .then((response) => dispatch(loadUsers(response.data.chatUsers)))
        .catch((err) => console.log(err));
};

export const logout = () => ({type: 'LOGOUT'});

const loadConversation = (messages) => ({type: 'LOAD_CONVERSATION', messages});

export const fetchConversationFor = (userId) => (dispatch, getState) => {
    const {username, password} = getState().login;
    
    axios.get(`${backendUrl}/api/message/listAll?userId=${userId}`, {
        auth: {username, password}
    })
        .then((response) => dispatch(loadConversation(response.data)))
        .catch((err) => console.log(err));
};

export const changeSelectedUser = (userId) => ({type: 'CHANGE_SELECTED_USER', userId});

export const sendMessage = (text) => (dispatch, getState) => {
    const {username, password} = getState().login;
    const toUserId = getState().conversation.currentUserId;

    axios.post(`${backendUrl}/api/message/create`, {userId: toUserId, text}, {
        auth: {username, password}
    })
        .then(() => dispatch(fetchConversationFor(toUserId)))
        .catch((err) => console.log(err));
};

export const refreshCurrentConversation = () => (dispatch, getState) => {
    dispatch(fetchConversationFor(getState().conversation.currentUserId));
};