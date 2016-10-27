package chat

class UserService {

    def springSecurityService

    User create(RegisterUserDto dto) {
        User created = new User(
                username: dto.username,
                password: dto.password,
                avatarColor: randomColor()
        ).save(failOnError: true)
        new UserRole(user: created, role: Role.findByAuthority('ROLE_CHAT_USER')).save(failOnError: true)
        return created
    }

    List<User> listChatUsers() {
        return UserRole.findAllByRole(Role.findByAuthority('ROLE_CHAT_USER'))*.user - springSecurityService.currentUser
    }

    private String randomColor() {
        '#' + (1..3).collect { Integer.toHexString((Math.random() * 255) as int) }.join('')
    }
}