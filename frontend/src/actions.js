import axios from 'axios';

const backendUrl = ''; // through proxy

const backendNotHealthy = () => ({type: 'BACKEND_HEALTH_CHECK_FAIL'});
export const loginSuccessful = (username, token) => ({type: 'LOGIN_SUCCESSFULL', username, token});
const loginError = () => ({type: 'LOGIN_ERROR'});
const registerError = () => ({type: 'REGISTER_ERROR'});

const authConfig = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const healthCheck = () => (dispatch) => {
    axios.get(`${backendUrl}/health`, {timeout: 10000}) // ignore if successful
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        })
};

export const login = (username, password) => (dispatch) => {
    axios.post(`${backendUrl}/api/login`, {
        username, password
    })
        .then(({data}) => {
            dispatch(loginSuccessful(username, data.access_token));
            localStorage.username = username;
            localStorage.access_token = data.access_token;
        })
        .catch(() => dispatch(loginError()));
};

export const loginAsGuest = () => (dispatch) => {
    axios.post(`${backendUrl}/api/guest/loginAsGuest`, {})
        .then(({data}) => {
            dispatch(loginSuccessful(data.username, data.access_token));
            localStorage.username = data.username;
            localStorage.access_token = data.access_token;
        })
        .catch(() => dispatch(loginError()));
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    dispatch({type: 'LOGOUT'});
};

export const validateToken = (username, access_token) => (dispatch) => {
    axios.get(`${backendUrl}/api/validate`, authConfig(access_token))
        .then(() => dispatch(loginSuccessful(username, access_token)))
        .catch(() => dispatch(logout()));
};


export const registerUser = (username, password) => (dispatch) => {
    axios.post(`${backendUrl}/api/guest/register`, {
        username, password
    })
        .then(() => dispatch(login(username, password)))
        .catch(() => dispatch(registerError()));
};

const loadUsers = (users) => ({type: 'LOAD_USERS', users});
const loadChannels = (channels) => ({type: 'LOAD_CHANNELS', channels});

export const fetchUsers = () => (dispatch, getState) => {
    axios.get(`${backendUrl}/api/user/chatUsers`, authConfig(getState().login.token))
        .then(({data}) => dispatch(loadUsers(data.chatUsers)))
        .catch((err) => console.log(err));
};

export const fetchChannels = () => (dispatch, getState) => {
    axios.get(`${backendUrl}/api/channel/list`, authConfig(getState().login.token))
        .then(({data}) => dispatch(loadChannels(data)))
        .catch((err) => console.log(err));
};

export const createChannel = (name) => (dispatch, getState) => {
    axios.post(`${backendUrl}/api/channel/create`, {name}, authConfig(getState().login.token))
        .then(() => dispatch(fetchChannels()))
        .catch((err) => console.log(err));
};

const loadConversation = (messages) => ({type: 'LOAD_CONVERSATION', messages});

export const fetchConversation = (type, conversationId) => (dispatch, getState) => {

    axios.get(`${backendUrl}/api/message/listAll?conversationId=${conversationId}&type=${type}`, authConfig(getState().login.token))
        .then(({data}) => dispatch(loadConversation(data)))
        .catch((err) => console.log(err));
};

export const changeSelectedConversation = (conversationType, conversationId) => ({
    type: 'CHANGE_SELECTED_CONVERSATION',
    conversationId,
    conversationType
});

export const sendMessage = (text) => (dispatch, getState) => {
    const {currentId, currentType} = getState().conversationsList;

    axios.post(`${backendUrl}/api/message/create`, {
        conversationId: currentId,
        type: currentType,
        text
    }, authConfig(getState().login.token))
        .then(() => dispatch(fetchConversation(currentType, currentId)))
        .catch((err) => console.log(err));
};

export const refreshCurrentConversation = () => (dispatch, getState) => {
    const {currentId, currentType} = getState().conversationsList;

    dispatch(fetchConversation(currentType, currentId));
};