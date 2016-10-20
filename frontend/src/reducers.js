const initialState = {loggedIn: false, username: null, password: null};
export const login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFULL':
            return {loggedIn: true, username: action.username, password: action.password};
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};
    
