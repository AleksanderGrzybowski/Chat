package chat

class MessageService {

    def springSecurityService

    List<Message> listAll(ListAllMessagesDto dto) {
        List<Message> messages

        if (dto.type == MessageType.DIRECT) {
            if (dto.conversationId == springSecurityService.currentUser.id) {
                throw new RuntimeException('Cannot list messages for current user')
            }

            User otherUser = User.findById(dto.conversationId)

            List<Message> fromMe = DirectMessage.findAllByFromAndTo(springSecurityService.currentUser, otherUser)
            List<Message> toMe = DirectMessage.findAllByFromAndTo(otherUser, springSecurityService.currentUser)

            log.info("Listing messages for ${otherUser.username}")

            messages = fromMe + toMe
        } else if (dto.type == MessageType.CHANNEL) {
            Channel channel = Channel.findById(dto.conversationId)
            log.info("Listing messages for channel ${channel.name}")

            messages = ChannelMessage.findAllByTo(channel)
        } else {
            throw new AssertionError()
        }

        return messages.sort { it.dateSent }
    }

    Message create(PostNewMessageDto dto) {
        Message created

        if (dto.type == MessageType.DIRECT) {
            created = new DirectMessage(
                    from: springSecurityService.currentUser,
                    to: User.findById(dto.conversationId),
                    text: dto.text,
                    dateSent: new Date()
            ).save(failOnError: true)
        } else if (dto.type == MessageType.CHANNEL) {
            created = new ChannelMessage(
                    from: springSecurityService.currentUser,
                    to: Channel.findById(dto.conversationId),
                    text: dto.text,
                    dateSent: new Date()
            ).save(failOnError: true)
        } else {
            throw new AssertionError()
        }

        log.info("Created message ${created.json}")
        return created
    }
}