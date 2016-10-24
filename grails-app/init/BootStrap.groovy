import chat.Message
import chat.Role
import chat.User
import chat.UserRole

class BootStrap {

    def init = { servletContext ->
        sampleUsersAndMessages()
    }
    
    static final String DEFAULT_AVATAR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAWlJREFUWIXNV8GNhDAMtKOFBvjlx5sO+KcxOqAJGkCiBn4UhITvwWUFrJPYbNCdpTx2Gc+EsR0AiYhAEYgYva6kAyMV9QsAwFoLRHRazjkWmwyKxLquBACUgLHh8/q+j+IwVAJ/B1pLtTxsCXKJHzlCJflwQCIeIpPkXDFGAvJRVVW0uRARxnGMbu4j/9pwksZKrRRH27bv3y+/kaIoohZO0xS8xjkR4iKikwtIRPRN3UMh7QcjScgdRy3RSfhkGKm1TziEiLsD1tqsxJLNbtu2b2LHpxNyNuGR8+97QArU9IAGq3JAQrwsi4Zy53XORY9PzXGsCQAg/E0U25brlczzGO18x/B3uP7PFGjn/Js4ahkAnXVlWYqIU+E13+8DXddFn+NSATUHN2La0QutYRhYntN/IbF5nm8LX1dd18GbY78LnmpIrjTsGGrn+a54cAM+oWmaR8UBmA8TFnSzJBInX0nEhSj35/kPUnxirP6hC4oAAAAASUVORK5CYII="

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
        User user = new User(username: pattern, password: pattern, avatar: DEFAULT_AVATAR).save(flush: true)
        new UserRole(user: user, role: role).save(flush: true)
    }
}
