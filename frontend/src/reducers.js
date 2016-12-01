const initialStateLogin = {
    loggedIn: false,
    loginError: false,
    registerError: false,
    username: null,
    token: null
};
export const login = (state = initialStateLogin, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFULL':
            return {loggedIn: true, loginError: false, username: action.username, token: action.token};
        case 'LOGIN_ERROR':
            return Object.assign({}, state, initialStateLogin, {loginError: true});
        case 'REGISTER_ERROR':
            return Object.assign({}, state, initialStateLogin, {registerError: true});
        case 'LOGOUT':
            return initialStateLogin;
        default:
            return state;
    }
};

const initialStateConversationsList = {
    currentId: null,
    currentType: null,
    users: [],
    channels: []
};
export const conversationsList = (state = initialStateConversationsList, action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return Object.assign({}, state, {users: action.users});
        case 'LOAD_CHANNELS':
            return Object.assign({}, state, {channels: action.channels});
        case 'CHANGE_SELECTED_CONVERSATION':
            return Object.assign({}, state, {
                currentType: action.conversationType,
                currentId: action.conversationId,
            });
        case 'LOGOUT':
            return initialStateConversationsList;
        default:
            return state;
    }
};

const initialStateConversation = { messages: []};
export const conversation = (state = initialStateConversation, action) => {
    switch (action.type) {
        case 'LOAD_CONVERSATION':
            return Object.assign({}, state, {messages: action.messages});
        // case 'CHANGE_SELECTED_CONVERSATION':
        //     return Object.assign({}, state, {type: action.conversationType, conversationId: action.conversationId});
        case 'LOGOUT':
            return initialStateConversation;
        default:
            return state;
    }
};
