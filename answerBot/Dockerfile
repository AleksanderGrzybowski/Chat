FROM microsoft/dotnet:1.1.0-sdk-msbuild

ENV BACKEND_URL http://__changeme__.com
ENV BOT_USERNAME __changeme__
ENV BOT_PASSWORD __changeme__
ENV CHAT_CONVERSATION_ID 1

COPY . /answerBot
WORKDIR /answerBot

RUN dotnet restore
CMD dotnet run