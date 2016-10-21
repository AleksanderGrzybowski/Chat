import axios from 'axios';
import backendUrl from './backendUrl';
const loginSuccessful = (username, password) => ({type: 'LOGIN_SUCCESSFULL', username, password});
const loginError = () => ({type: 'LOGIN_ERROR'});

export const tryLogin = (username, password) => (dispatch) => {
    axios.get(`${backendUrl}/api/auth`, {
        auth: {username, password}
    })
        .then(() => dispatch(loginSuccessful(username, password)))
        .catch(() => dispatch(loginError()));
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
