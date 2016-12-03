const axios = require('axios');
const math = require('mathjs');

const log = require('./log');
const config = require('./config');

const app = {
    token: null,
    alreadyRespondedMessageIds: []
};

const authConfig = token => ({
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const login = (username, password) =>
    axios.post(`${config.backendUrl}/api/login`, {username, password})
        .then(({data}) => {
            log.info(`Logged in successfully as ${username}`);
            app.token = data.access_token;
        });

const postMessage = text =>
    axios.post(`${config.backendUrl}/api/message/create`, {
        conversationId: config.conversationId,
        type: 'CHANNEL',
        text
    }, authConfig(app.token));

const formatResponse = text => `Result: ${text}`;

const respondTo = message => {
    app.alreadyRespondedMessageIds.push(message.id);
    let responseText;
    try {
        const result = math.eval(message.text.substr(config.magicWord.length + 1));
        responseText = formatResponse(result);
    } catch (e) {
        responseText = 'Error, invalid syntax';
    }
    return postMessage(responseText)
        .then(() => log.info(`Message "${responseText}" posted as a response to message ${message.id}`))
        .catch(err => log.error(err));
};

const wasAlreadyRespondedTo = message => app.alreadyRespondedMessageIds.indexOf(message.id) !== -1;
const isMessageToBot = message => message.text.startsWith(config.magicWord);
const shouldBeRespondedTo = message => !wasAlreadyRespondedTo(message) && isMessageToBot(message);

const filterAndRespond = messages => {
    const toProcess = messages.filter(shouldBeRespondedTo);
    log.info(`Messages to process: ${toProcess.length}`);
    toProcess.forEach(respondTo);
};

const fetchAndRespond = () => {
    log.info(`Fetching new messages on conversation ${config.conversationId}`);
    axios.get(
        `${config.backendUrl}/api/message/listAll?conversationId=${config.conversationId}&type=CHANNEL`,
        authConfig(app.token)
    )
        .then(({data}) => filterAndRespond(data));
};


log.info('Starting calculator bot, configuration:');
log.info(config);
login(config.username, config.password).then(() => setInterval(fetchAndRespond, config.pollingInterval));
