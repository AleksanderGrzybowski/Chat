FROM node:7.1.0

COPY . /calculatorBot
WORKDIR /calculatorBot
RUN sed -i s/localhost/vps275760.ovh.net/g config.js

RUN npm install
CMD npm start