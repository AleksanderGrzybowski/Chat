import chat.Role
import chat.User
import chat.UserRole

class BootStrap {

    def init = { servletContext ->
        sampleUsers()
    }

    static void sampleUsers() {
        Role chatUserRole = new Role(authority: 'ROLE_CHAT_USER').save()

        User u1 = new User(username: 'u1', password: 'u1').save()
        new UserRole(user: u1, role: chatUserRole).save()

        User u2 = new User(username: 'u2', password: 'u2').save()
        new UserRole(user: u2, role: chatUserRole).save()

        Role adminUserRole = new Role(authority: 'ROLE_ADMIN').save()
        User admin = new User(username: 'admin', password: 'p4ssw0rd').save()
        new UserRole(user: admin, role: adminUserRole).save()
    }
}
