const initialState = {loggedIn: false, loginError: false, username: null, password: null};
export const login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFULL':
            return {loggedIn: true, loginError: false, username: action.username, password: action.password};
        case 'LOGIN_ERROR':
            return Object.assign({}, initialState, {loginError: true});
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export const usersList = (state = {users: []}, action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return Object.assign({}, {users: action.users});
        default:
            return state
    }
};
