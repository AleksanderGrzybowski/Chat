package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class TestController {
    
    def springSecurityService
   
    @Secured('IS_AUTHENTICATED_FULLY')
    def auth() {
        render ([youAre: springSecurityService.currentUser.json] as JSON)
    }
    
    @Secured('ROLE_CHAT_USER')
    def listChatUsers() {
        List<User> chatUsers = UserRole.findAllByRole(Role.findByAuthority('ROLE_CHAT_USER'))*.user
        List x = chatUsers*.json
        x.eachWithIndex { entry, int i -> // for testing
            entry['active'] = (i % 2) as boolean
        } 
        render ([chatUsers: x] as JSON)
    }
    

    @Secured('isAnonymous()')
    def guest() {
        render 'You have guest information'
    }

}
