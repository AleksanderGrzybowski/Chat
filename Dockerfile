# I am still not sure if one should build image
# inside or outside of container.
# This way it is at least somewhat repeatable.
FROM java:8

COPY . /Chat
WORKDIR /Chat
RUN sed -i s/localhost/vps275760.ovh.net/g frontend/src/backendUrl.js


EXPOSE 8080
CMD ./gradlew -Dgrails.env=prod bootRun