package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured('ROLE_CHAT_USER')
class MessageController {

    def messageService

    def listAll(ListAllMessagesDto dto) {
        render(messageService.listAllForUser(dto.userId)*.json as JSON)
    }

    def create(PostNewMessageDto dto) {
        Message created = messageService.create(dto)
        render(created.json as JSON)
    }
}

class PostNewMessageDto {
    Long userId
    String text
}

class ListAllMessagesDto {
    Long userId
}

