package chat

class Message {
    
    String text
    Long timestamp
    
    User from
    User to

    static constraints = {
    }
    
    Map getJson() {
        return [
                id: id,
                text: text,
                timestamp: timestamp,
                from: from.json,
                to: to.json
        ]
    }
}
