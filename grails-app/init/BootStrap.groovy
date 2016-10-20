import chat.Role
import chat.User

class BootStrap {

    def init = { servletContext ->
        sampleUsers()
    }

    static void sampleUsers() {
        new Role(authority: 'ROLE_CHAT_USER').save(flush: true)
        new User(username: 'u1', password: 'u1').save(flush: true)
        new User(username: 'u2', password: 'u2').save(flush: true)
    }
}
