import chat.Message
import chat.Role
import chat.User
import chat.UserRole

class BootStrap {

    def init = { servletContext ->
        sampleUsersAndMessages()
    }

    static void sampleUsersAndMessages() {
        Role chatUserRole = new Role(authority: 'ROLE_CHAT_USER').save(flush: true)

        (1..9).each { int index ->
            createChatUser('u' + index, chatUserRole)
        }
        
        User u1 = User.findByUsername('u1')
        User u2 = User.findByUsername('u2')
        
        new Message(from: u1, to: u2, text: 'Hello, I am u1, how are you u2?', timestamp: 100).save(flush: true)
        new Message(from: u2, to: u1, text: 'Hey u2, I am fine. And you, u1?', timestamp: 200).save(flush: true)
        new Message(from: u1, to: u2, text: 'I am fine too, thanks for caring, u2!', timestamp: 300).save(flush: true)
        

        Role adminUserRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        User admin = new User(username: 'admin', password: 'p4ssw0rd').save(flush: true)
        new UserRole(user: admin, role: adminUserRole).save(flush: true)
    }

    static void createChatUser(String pattern, Role role) {
        User user = new User(username: pattern, password: pattern).save(flush: true)
        new UserRole(user: user, role: role).save(flush: true)
    }
}
