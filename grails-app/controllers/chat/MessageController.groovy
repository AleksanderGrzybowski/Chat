package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured('ROLE_CHAT_USER')
class MessageController {

    def messageService

    def listAll(ListAllMessagesDto dto) {
        render(messageService.listAll(dto)*.json as JSON)
    }

    def create(PostNewMessageDto dto) {
        Message created = messageService.create(dto)
        render(created.json as JSON)
    }
}


class MessageDto {
    MessageType type

    /** Means either message id or channel id */
    Long conversationId
}

class ListAllMessagesDto extends MessageDto {}

class PostNewMessageDto extends MessageDto {
    String text
}

