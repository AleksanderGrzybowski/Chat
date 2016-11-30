package chat

class Channel {
    String name

    Map getJson() {
        [id: id, name: name]
    }
}