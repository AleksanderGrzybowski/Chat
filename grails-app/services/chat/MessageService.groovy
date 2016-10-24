package chat

class MessageService {

    def springSecurityService

    List<Message> listAllForUser(Long userId) {
        if (userId == springSecurityService.currentUser.id) {
            throw new RuntimeException('Cannot list messages for current user')
        }

        User otherUser = User.findById(userId)

        List<Message> fromMe = Message.findAllByFromAndTo(springSecurityService.currentUser, otherUser)
        List<Message> toMe = Message.findAllByFromAndTo(otherUser, springSecurityService.currentUser)

        return (fromMe + toMe).sort { it.dateSent }
    }

    Message create(PostNewMessageDto dto) {
        return new Message(
                from: springSecurityService.currentUser,
                to: User.findById(dto.userId),
                text: dto.text,
                dateSent: new Date()
        ).save(failOnError: true)
    }
}