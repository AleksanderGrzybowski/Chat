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

    def create(PostNewMessageDto dto) {
        Message created = new Message(
                from: springSecurityService.currentUser,
                to: User.findById(dto.userId),
                text: dto.text,
                timestamp: 1337,
        ).save(failOnError: true)

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

