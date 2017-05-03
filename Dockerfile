FROM java:8

ENV PORT 8080

COPY build/libs/Chat-0.1.war /

WORKDIR /

CMD java -Dserver.port=$PORT -jar Chat-0.1.war
