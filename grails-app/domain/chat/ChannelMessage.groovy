package chat

class ChannelMessage extends Message {

    Channel to

    Map getJson() {
        return super.json + [to: to.json]
    }
}
