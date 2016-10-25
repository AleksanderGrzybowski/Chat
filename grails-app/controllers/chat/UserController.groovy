package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class UserController {

    def userService

    @Secured('IS_AUTHENTICATED_FULLY')
    def auth() {
        User current = userService.currentUser()
        render([youAre: current.json] as JSON)
    }

    @Secured('isAnonymous()')
    def register(RegisterUserDto dto) {
        User created = userService.create(dto)
        render(created.json as JSON)
    }
    

    @Secured('ROLE_CHAT_USER')
    def listChatUsers() {
        render([chatUsers: userService.listChatUsers()*.json] as JSON)
    }

    @Secured('isAnonymous()')
    def guest() {
        render 'You have guest information'
    }
}

class RegisterUserDto {
    String username
    String password
}
