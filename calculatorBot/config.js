module.exports = {
    backendUrl: process.env.BACKEND_URL || 'http://localhost:8080',
    username: process.env.BOT_USERNAME || 'bob',
    password: process.env.BOT_PASSWORD || 'bob',
    conversationId: process.env.CHAT_CONVERSATION_ID || 1,
    magicWord: 'calc',
    pollingInterval: 5000
};
