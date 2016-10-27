import axios from 'axios';
import backendUrl from './backendUrl';
const loginSuccessful = (username, token) => ({type: 'LOGIN_SUCCESSFULL', username, token});
const loginError = () => ({type: 'LOGIN_ERROR'});
const registerError = () => ({type: 'REGISTER_ERROR'});

export const login = (username, password) => (dispatch) => {
    axios.post(`${backendUrl}/api/login`, {
        username, password
    })
        .then(({data}) => dispatch(loginSuccessful(username, data.access_token)))
        .catch(() => dispatch(loginError()));
};


export const registerUser = (username, password) => (dispatch) => {
    axios.post(`${backendUrl}/api/guest/register`, {
        username, password
    })
        .then(() => dispatch(login(username, password)))
        .catch(() => dispatch(registerError()));
};

const loadUsers = (users) => ({type: 'LOAD_USERS', users});

const authConfig = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const fetchUsers = () => (dispatch, getState) => {
    axios.get(`${backendUrl}/api/user/chatUsers`, authConfig(getState().login.token))
        .then(({data}) => dispatch(loadUsers(data.chatUsers)))
        .catch((err) => console.log(err));
};

export const logout = () => ({type: 'LOGOUT'});

const loadConversation = (messages) => ({type: 'LOAD_CONVERSATION', messages});

export const fetchConversationFor = (userId) => (dispatch, getState) => {

    axios.get(`${backendUrl}/api/message/listAll?userId=${userId}`, authConfig(getState().login.token))
        .then(({data}) => dispatch(loadConversation(data)))
        .catch((err) => console.log(err));
};

export const changeSelectedUser = (userId) => ({type: 'CHANGE_SELECTED_USER', userId});

export const sendMessage = (text) => (dispatch, getState) => {
    const toUserId = getState().conversation.currentUserId;

    axios.post(`${backendUrl}/api/message/create`, {userId: toUserId, text}, authConfig(getState().login.token))
        .then(() => dispatch(fetchConversationFor(toUserId)))
        .catch((err) => console.log(err));
};

export const refreshCurrentConversation = () => (dispatch, getState) => {
    dispatch(fetchConversationFor(getState().conversation.currentUserId));
};