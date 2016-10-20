const loginSuccessful = (username, password) => ({type: 'LOGIN_SUCCESSFULL', username, password});

export const tryLogin = (username, password) => (dispatch) => {
    // TODO: make real request :)
    dispatch(loginSuccessful(username, password));
};

export const logout = () => ({type: 'LOGOUT'});
