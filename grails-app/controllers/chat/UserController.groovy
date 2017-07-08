package chat

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import grails.plugin.springsecurity.rest.token.AccessToken
import org.springframework.security.core.userdetails.UserDetails

class UserController {

    def userService
    def tokenGenerator

    @Secured('isAnonymous()')
    def register(RegisterUserDto dto) {
        User created = userService.create(dto)
        render(created.json as JSON)
    }

    @Secured('isAnonymous()')
    def loginAsGuest() {
        UserDetails details = userService.createGuestUser()
        AccessToken token = tokenGenerator.generateAccessToken(details)
        
        render([username: details.username, access_token: token.accessToken] as JSON)
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
