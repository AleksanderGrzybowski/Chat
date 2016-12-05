module.exports = {
    backendUrl: process.env.CHAT_BACKEND_URL || 'http://localhost:8080',
    username: process.env.CHAT_USERNAME || 'bob',
    password: process.env.CHAT_PASSWORD || 'bob',
    conversationId: process.env.CHAT_CONVERSATION_ID || 1,
    magicWord: 'calc',
    pollingInterval: 1000
};
