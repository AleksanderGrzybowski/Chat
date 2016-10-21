package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class TestController {
    
    def springSecurityService
   
    @Secured('IS_AUTHENTICATED_FULLY')
    def auth() {
        render ([youAre: springSecurityService.currentUser.json] as JSON)
    }

    @Secured('isAnonymous()')
    def guest() {
        render 'You have guest information'
    }

}
