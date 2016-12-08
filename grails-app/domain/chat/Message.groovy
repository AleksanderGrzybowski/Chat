package chat

class Message {
    
    String text
    Date dateSent
    
    User from
    
    static constraints = {
        text maxSize: 1000
    }

    Map getJson() {
        return [
                id: id,
                text: text,
                dateSent: dateSent,
                from: from.json
        ]
    }
}
