package chat

class UserService {
    
    def springSecurityService
    
    User currentUser() {
        User current = springSecurityService.currentUser
        if (!current) {
            throw new AssertionError('This method should be called only in authorized context')
        }
        return current
    }

    List<User> listChatUsers() {
        return UserRole.findAllByRole(Role.findByAuthority('ROLE_CHAT_USER'))*.user
    }
}