package chat

class Message {
    
    String text
    Date dateSent
    
    User from

    Map getJson() {
        return [
                id: id,
                text: text,
                dateSent: dateSent,
                from: from.json
        ]
    }
}
