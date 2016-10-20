package chat

import grails.plugin.springsecurity.annotation.Secured

class TestController {
   
    @Secured('ROLE_CHAT_USER')
    def secret() {
        render 'You accessed secret information'
    }

    @Secured('isAnonymous()')
    def guest() {
        render 'You have guest information'
    }

}
