import chat.Role
import chat.User
import chat.UserRole

class BootStrap {

    def init = { servletContext ->
        sampleUsers()
    }

    static void sampleUsers() {
        Role chatUserRole = new Role(authority: 'ROLE_CHAT_USER').save()

        (0..9).each { int index ->
            createChatUser('u' + index, chatUserRole)
        }

        Role adminUserRole = new Role(authority: 'ROLE_ADMIN').save()
        User admin = new User(username: 'admin', password: 'p4ssw0rd').save()
        new UserRole(user: admin, role: adminUserRole).save()
    }

    static void createChatUser(String pattern, Role role) {
        User user = new User(username: pattern, password: pattern).save()
        new UserRole(user: user, role: role).save()
    }
}
