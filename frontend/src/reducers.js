const initialStateLogin = {loggedIn: false, loginError: false, username: null, password: null};
export const login = (state = initialStateLogin, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFULL':
            return {loggedIn: true, loginError: false, username: action.username, password: action.password};
        case 'LOGIN_ERROR':
            return Object.assign({}, state, initialStateLogin, {loginError: true});
        case 'LOGOUT':
            return initialStateLogin;
        default:
            return state;
    }
};

const initialStateUsersList = {currentUserId: null, users: []};
export const usersList = (state = initialStateUsersList, action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return Object.assign({}, state, {users: action.users});
        case 'CHANGE_SELECTED_USER':
            return Object.assign({}, state, {currentUserId: action.userId});
        case 'LOGOUT':
            return initialStateUsersList;
        default:
            return state
    }
};

const initialStateConversation = {currentUserId: null, messages: []};
export const conversation = (state = initialStateConversation, action) => {
    switch (action.type) {
        case 'LOAD_CONVERSATION':
            return Object.assign({}, state, {messages: action.messages});
        case 'CHANGE_SELECTED_USER':
            return Object.assign({}, state, {currentUserId: action.userId});
        case 'LOGOUT':
            return initialStateConversation;
        default:
            return state
    }
};
