package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured('ROLE_CHAT_USER')
class MessageController {

    def springSecurityService

    def listAll(ListAllMessagesDto dto) {
        User otherUser = User.findById(dto.userId)
        // TODO: disallow itself
        List<Message> fromMe = Message.findAllByFromAndTo(springSecurityService.currentUser, otherUser)
        List<Message> toMe = Message.findAllByFromAndTo(otherUser, springSecurityService.currentUser)

        List<Message> combined = (fromMe + toMe).sort { it.timestamp }
        render(combined*.json as JSON)
    }

}

class ListAllMessagesDto {
    Long userId
}

