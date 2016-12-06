# Chat

This is a multi-user chat webapp for 'Organization and Development of Open Source Projects' course on university.

# How to create bot

You can find example code in `/calculatorBot` directory. It is a very simple bot written in Node.js, that 
connects to chat backend, periodically checks for new messages and responds to those starting with `calc`. You can freely ignore all the following and just hack around with example code.
POST parameters should be encoded in JSON body or sent as traditional form-data params, GET - in URL.

#### `POST /api/login username=$username password=$password`

Authentication is implemented using popular JWT token-based auth. Sounds complex, but in fact there is barely anything to do on the client side. Response from above request will contain field `access_token`, which should be appended in future requests' headers as header `Authorization: Bearer $access_token`.

#### `POST /api/message/create conversationId=$id type=$type text=$text`

To post new message to channel, you'll need an conversationId (this is hardcoded in calculator bot for simplicity, but just look to frontend source if you want to know how to list available channels). Type should be `CHANNEL`, and text is, well, text of a new message.

#### `GET /api/message/listAll conversationId=$id type=$type`

To list new messages, use this endpoint. For simplicity, all messages are listed. Type should be `CHANNEL`. A good way to make sensible request-response flow is to memorize, which messages had we already responded to (you can use `id`-s for this).
