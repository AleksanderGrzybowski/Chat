package chat

class Message {
    
    String text
    Date dateSent
    
    User from
    User to

    static constraints = {
    }
    
    Map getJson() {
        return [
                id: id,
                text: text,
                dateSent: dateSent,
                from: from.json,
                to: to.json
        ]
    }
}
