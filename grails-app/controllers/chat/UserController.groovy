package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class UserController {

    def userService

    @Secured('isAnonymous()')
    def register(RegisterUserDto dto) {
        User created = userService.create(dto)
        render(created.json as JSON)
    }

    @Secured('ROLE_CHAT_USER')
    def listChatUsers() {
        render([chatUsers: userService.listChatUsers()*.json] as JSON)
    }
}

class RegisterUserDto {
    String username
    String password
}
