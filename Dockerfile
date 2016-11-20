FROM java:8

ENV PORT 8080

COPY . /Chat
WORKDIR /Chat

RUN ./gradlew bootRepackage && cp build/libs/Chat-0.1.war / && rm -rf /Chat

WORKDIR /

CMD java -Dserver.port=$PORT -jar Chat-0.1.war
