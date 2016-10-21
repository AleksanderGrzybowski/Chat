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

export const logout = () => ({type: 'LOGOUT'});
