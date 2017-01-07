FROM microsoft/dotnet:1.1.0-sdk-msbuild

ENV CHAT_BACKEND_URL http://__changeme__.com
ENV CHAT_USERNAME __changeme__
ENV CHAT_PASSWORD __changeme__
ENV CHAT_CONVERSATION_ID 0

COPY . /answerBot
WORKDIR /answerBot

RUN dotnet restore
CMD dotnet run