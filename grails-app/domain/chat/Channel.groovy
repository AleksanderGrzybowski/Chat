package chat

class Channel {
   
    String name

    static constraints = {
        name maxSize: 40
    }

    Map getJson() {
        [id: id, name: name]
    }
}