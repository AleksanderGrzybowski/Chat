package chat

class DirectMessage extends Message {

    User to

    Map getJson() {
        return super.json + [to: to.json]
    }
}
