FROM node:7.1.0

ENV CHAT_BACKEND_URL http://__changeme__.com
ENV CHAT_USERNAME __changeme__
ENV CHAT_PASSWORD __changeme__
ENV CHAT_CONVERSATION_ID 0

COPY . /calculatorBot
WORKDIR /calculatorBot

RUN npm install
CMD npm start