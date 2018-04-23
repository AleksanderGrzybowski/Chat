FROM node:8.4.0

COPY . /frontend
WORKDIR /frontend
RUN npm install && npm run build


FROM httpd:latest

COPY --from=0 /frontend/build/ /usr/local/apache2/htdocs/
