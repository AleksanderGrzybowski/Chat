import chat.Channel
import chat.Role
import chat.User
import chat.UserRole

class BootStrap {

    def init = { servletContext ->
        sampleUsers()
        sampleChannels()
    }

    static final String DEFAULT_AVATAR_COLOR = "#abcdef";

    static void sampleUsers() {
        Role chatUserRole = new Role(authority: 'ROLE_CHAT_USER').save(flush: true)

        ['bob', 'alice', 'tom'].each {
            User user = new User(username: it, password: it, avatarColor: DEFAULT_AVATAR_COLOR).save(flush: true)
            new UserRole(user: user, role: chatUserRole).save(flush: true)
        }
    }

    static void sampleChannels() {
        ['general', 'random'].each { new Channel(name: it).save(flush: true) }
    }
}
