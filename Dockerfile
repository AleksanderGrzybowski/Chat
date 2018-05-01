FROM openjdk:8-jdk

COPY . /Chat
WORKDIR /Chat

RUN ./gradlew clean test bootRepackage

FROM openjdk:8-jre-alpine

ENV PORT 8080

COPY --from=0 /Chat/build/libs/Chat-0.1.war /

WORKDIR /

CMD java -Xmx300m -Dserver.port=$PORT -jar Chat-0.1.war
