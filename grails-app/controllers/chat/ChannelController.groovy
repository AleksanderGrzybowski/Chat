package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured('ROLE_CHAT_USER')
class ChannelController {
    
    def channelService
    
    def list() {
        render (channelService.listAll()*.json as JSON)
    }
    
    def create(CreateChannelDto dto) {
        render (channelService.create(dto).json as JSON)
    }
}

class CreateChannelDto {
    String name
}