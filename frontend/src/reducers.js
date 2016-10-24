const initialState = {loggedIn: false, loginError: false, username: null, password: null};
export const login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFULL':
            return {loggedIn: true, loginError: false, username: action.username, password: action.password};
        case 'LOGIN_ERROR':
            return Object.assign({}, state, initialState, {loginError: true});
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export const usersList = (state = {users: [], currentUserId: null}, action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return Object.assign({}, state, {users: action.users});
        case 'CHANGE_SELECTED_USER':
            return Object.assign({}, state, {currentUserId: action.userId});
        default:
            return state
    }
};

export const conversation = (state = {currentUserId: null, messages: []}, action) => {
    switch (action.type) {
        case 'LOAD_CONVERSATION':
            return Object.assign({}, state, {messages: action.messages});
        case 'CHANGE_SELECTED_USER':
            return Object.assign({}, state, {currentUserId: action.userId});
        default:
            return state
    }
};
