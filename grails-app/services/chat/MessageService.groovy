package chat

class MessageService {

    def springSecurityService
    
    final int MESSAGES_PAGE_LIMIT = 7

    List<Message> listAllForUser(Long userId) {
        if (userId == springSecurityService.currentUser.id) {
            throw new RuntimeException('Cannot list messages for current user')
        }

        User otherUser = User.findById(userId)

        List<Message> fromMe = Message.findAllByFromAndTo(springSecurityService.currentUser, otherUser)
        List<Message> toMe = Message.findAllByFromAndTo(otherUser, springSecurityService.currentUser)
        
        log.info("Listing messages for ${otherUser.username}")

        return (fromMe + toMe).sort { it.dateSent }.takeRight(MESSAGES_PAGE_LIMIT)
    }

    Message create(PostNewMessageDto dto) {
        Message message = new Message(
                from: springSecurityService.currentUser,
                to: User.findById(dto.userId),
                text: dto.text,
                dateSent: new Date()
        ).save(failOnError: true)
        
        log.info("Created message ${message.json}")
        
        return message
    }
}